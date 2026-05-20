/**
 * --- EXPEDITION YEG: SECURE APPROVAL BACKEND ---
 * This script is a separate, restricted backend for Matt to approve bookings.
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Create a NEW Google Apps Script project.
 * 2. Copy this code into 'Code.gs'.
 * 3. Add the 'email-customer-finalized.html' file to the project.
 * 4. Deploy as a Web App:
 *    - Execute as: "Me" (your account)
 *    - Who has access: "Anyone with Google Account" <-- CRITICAL for email verification
 * 5. Update the APPROVAL_SCRIPT_URL in your main backend or use it in your templates.
 */

const AUTHORIZED_APPROVER = 'expeditionyeg@gmail.com'; 
// Retrieve SPREADSHEET_ID dynamically from Google Apps Script project properties:
const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
const CALENDAR_ID = 'primary';

const SHEET_NAME_BOOKINGS = 'Bookings';
const SHEET_NAME_INVENTORY = 'Inventory';

const COL_INV_BOOKED = 6; // Column F
const COL_INV_PENDING = 8; // Column H

/**
 * Main entry point for the approval link.
 */
function doGet(e) {
  // 1. SECURITY CHECK: Verify the person clicking is Matt
  const userEmail = Session.getActiveUser().getEmail();
  
  if (userEmail.toLowerCase() !== AUTHORIZED_APPROVER.toLowerCase()) {
    Logger.log(`Unauthorized access attempt by: ${userEmail}`);
    return HtmlService.createHtmlOutput(`
      <div style="font-family: sans-serif; padding: 40px; text-align: center; border: 2px solid red; border-radius: 10px; max-width: 500px; margin: 50px auto;">
        <h2 style="color: red;">Access Denied</h2>
        <p>This approval system is locked to <strong>${AUTHORIZED_APPROVER}</strong>.</p>
        <p>You are currently logged in as: <strong>${userEmail || 'Unknown'}</strong></p>
        <p>Please switch to the correct Google account and try again.</p>
      </div>
    `);
  }

  // 2. PARAMS CHECK
  const bookingId = e.parameter.bookingId;
  const action = e.parameter.action;

  if (!bookingId || action !== 'approve') {
    return HtmlService.createHtmlOutput("<h3>Invalid Request: Missing parameters.</h3>");
  }

  return handleApproval(bookingId);
}

/**
 * Core approval logic.
 */
function handleApproval(bookingId) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000); // Wait up to 15 seconds

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const bookingsSheet = ss.getSheetByName(SHEET_NAME_BOOKINGS);
    const inventorySheet = ss.getSheetByName(SHEET_NAME_INVENTORY);
    
    const data = bookingsSheet.getDataRange().getValues();
    let rowToUpdate = -1;
    let bookingData = null;

    // Search for the booking ID
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === bookingId) {
        rowToUpdate = i + 1;
        bookingData = {
          tourId: data[i][2],
          tourName: data[i][3],
          tourDateStr: data[i][4],
          customerName: data[i][5],
          customerEmail: data[i][6],
          phone: data[i][7],
          partySize: data[i][8],
          status: data[i][9],
          meetingLocation: JSON.parse(data[i][12] || "{}"),
          duration: data[i][13] || "2 hours"
        };
        break;
      }
    }

    if (rowToUpdate === -1) {
      return createMessageHtml("Error", "Booking ID not found in the database.", "red");
    }

    if (bookingData.status === "Confirmed") {
      return createMessageHtml("Already Confirmed", "This booking was already approved and scheduled.", "orange");
    }

    // 1. Update Inventory
    updateInventory(inventorySheet, bookingData);

    // 2. Update Status
    bookingsSheet.getRange(rowToUpdate, 10).setValue("Confirmed");

    // 3. Handle Calendar
    const startTime = new Date(bookingData.tourDateStr);
    if (isNaN(startTime.getTime())) {
      return createManualCoordinationHtml(bookingData);
    }

    // Calculate dynamic endTime
    const durationHours = parseInt(bookingData.duration.split(" ")[0]) || 2;
    const endTime = new Date(startTime.getTime() + (durationHours * 60 * 60 * 1000));

    createCalendarEvent(bookingData, startTime, endTime);

    // 4. Notify Customer
    sendFinalizedEmail(bookingData, startTime, endTime, bookingId);

    return createMessageHtml("Success!", `Booking for <strong>${bookingData.customerName}</strong> has been approved and scheduled.`, "green");

  } catch (error) {
    return createMessageHtml("System Error", error.toString(), "red");
  } finally {
    lock.releaseLock();
  }
}

function updateInventory(inventorySheet, bookingData) {
  const invData = inventorySheet.getDataRange().getValues();
  let searchId = bookingData.tourId;
  let rowIndexHint = -1;
  
  if (typeof bookingData.tourId === 'string' && bookingData.tourId.includes('_')) {
    const parts = bookingData.tourId.split('_');
    rowIndexHint = parseInt(parts.pop());
    searchId = parts.join('_');
  }

  for (let j = 1; j < invData.length; j++) {
    if (invData[j][0] == bookingData.tourId || (j === rowIndexHint && invData[j][0] == searchId)) {
      const currentBooked = parseInt(invData[j][COL_INV_BOOKED - 1] || 0);
      const currentPending = parseInt(invData[j][COL_INV_PENDING - 1] || 0);
      const partySize = parseInt(bookingData.partySize);

      inventorySheet.getRange(j + 1, COL_INV_PENDING).setValue(Math.max(0, currentPending - partySize));
      inventorySheet.getRange(j + 1, COL_INV_BOOKED).setValue(currentBooked + partySize);
      return;
    }
  }
}

function createCalendarEvent(bookingData, startTime, endTime) {
  const eventTitle = `YEG Tour: ${bookingData.tourName} (${bookingData.customerName})`;
  const eventDesc = `Contact: ${bookingData.phone}\nEmail: ${bookingData.customerEmail}\nParty Size: ${bookingData.partySize}\nDuration: ${bookingData.duration}`;
  
  CalendarApp.getCalendarById(CALENDAR_ID).createEvent(eventTitle, startTime, endTime, {
    description: eventDesc,
    location: bookingData.meetingLocation?.address || ""
  });
}

function sendFinalizedEmail(bookingData, startTime, endTime, bookingId) {
  const template = HtmlService.createTemplateFromFile('email-customer-finalized');
  const location = bookingData.meetingLocation || {};
  
  template.bookingId = bookingId;
  template.customerName = bookingData.customerName;
  template.tourName = bookingData.tourName;
  template.tourDate = startTime.toLocaleString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit' 
  });
  template.partySize = bookingData.partySize;
  
  // Simplified Location parameters
  template.locationName = location.name || "TBD";
  template.locationAddress = location.address || "TBD";
  template.locationFull = `${location.name || "TBD"} (${location.address || "TBD"})`;
  
  // For JSON-LD
  template.isoStartTime = startTime.toISOString();
  template.isoEndTime = endTime.toISOString();

  const htmlBody = template.evaluate().getContent();
  const plainTextBody = `Hi ${bookingData.customerName},\n\nYour expedition for ${bookingData.tourName} on ${startTime.toLocaleString()} is officially scheduled!\n\nReference ID: ${bookingId}\nParty Size: ${bookingData.partySize}\n\nMeeting Location: ${template.locationFull}\n\nWe look forward to riding with you!\n\nBest regards,\nThe Expedition YEG Team`;

  sendEmail({
    to: bookingData.customerEmail,
    subject: `Confirmed: Your Expedition is Scheduled! - ${bookingData.tourName}`,
    htmlBody: htmlBody,
    plainTextBody: plainTextBody
  });
}

/**
 * Helper to send email with both HTML and Text parts using GmailApp for better deliverability.
 */
function sendEmail({ to, subject, htmlBody, plainTextBody }) {
  try {
    const options = {
      name: "Expedition YEG",
      htmlBody: htmlBody
    };
    
    // Use GmailApp instead of MailApp for better trust/deliverability
    // body (3rd param) is the plain text version
    GmailApp.sendEmail(to, subject, plainTextBody || "Please enable HTML to view this email.", options);
  } catch (err) {
    console.error("Failed to send email:", err);
    // Fallback to MailApp if GmailApp fails (e.g. scope issues)
    MailApp.sendEmail({
      to: to,
      subject: subject,
      body: plainTextBody || "Please enable HTML to view this email.",
      htmlBody: htmlBody
    });
  }
}

function createMessageHtml(title, message, color) {
  return HtmlService.createHtmlOutput(`
    <div style="font-family: sans-serif; padding: 40px; text-align: center;">
      <h2 style="color: ${color};">${title}</h2>
      <p>${message}</p>
    </div>
  `);
}

function createManualCoordinationHtml(bookingData) {
  return HtmlService.createHtmlOutput(`
    <div style="font-family: sans-serif; padding: 40px; text-align: center;">
      <h2 style="color: orange;">Manual Coordination Required</h2>
      <p>This is a custom request with no fixed date.</p>
      <p>Please contact <strong>${bookingData.customerName}</strong> at <strong>${bookingData.customerEmail}</strong> to finalize.</p>
    </div>
  `);
}
