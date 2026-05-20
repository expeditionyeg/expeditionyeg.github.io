// --- GOOGLE APPS SCRIPT CODE ---
// This script acts as the backend for the Expedition YEG website.
// It reads available tours, accepts new bookings, updates inventory, 
// creates Google Calendar events, and sends confirmation emails.

const SHEET_NAME_INVENTORY = 'Inventory';
const SHEET_NAME_BOOKINGS = 'Bookings';
const SHEET_NAME_REQUESTS = 'Requests';
const SHEET_NAME_CONTACT = 'ContactMessages';
const NOTIFICATION_EMAIL = 'expeditionyeg@gmail.com';

const FEEDBACK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScpeBYI-OJ0fnZKCD5QDWES3sDjrd0W3CDOYvtLD6YkEGjcnw/viewform';
const FEEDBACK_ENTRY_TOUR = 'entry.1513234018';
const FEEDBACK_ENTRY_DATE = 'entry.1310754765';

// --- CUSTOM MENU ---
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Expedition YEG')
      .addItem('Send Feedback Emails', 'sendFeedbackEmails')
      .addToUi();
}

/**
 * Sends feedback request emails to customers of completed tours.
 */
function sendFeedbackEmails() {
  // 1. SECURITY: Only the authorized owner can trigger mass emails
  const userEmail = Session.getActiveUser().getEmail();
  if (userEmail.toLowerCase() !== NOTIFICATION_EMAIL.toLowerCase()) {
    SpreadsheetApp.getUi().alert('Unauthorized: Only Matt can send feedback blasts.');
    return;
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME_BOOKINGS);
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  const today = new Date();
  let count = 0;

  for (let i = 1; i < data.length; i++) {
    const status = data[i][9]; // Column J: Status
    const tourDate = new Date(data[i][4]); // Column E: Tour Date
    const feedbackSent = data[i][12]; // Column M: Feedback Status

    // Send if tour is in the past, confirmed, and we haven't sent feedback yet
    if (status === 'Confirmed' && tourDate < today && !feedbackSent) {
      const customerName = data[i][5]; // Column F
      const customerEmail = data[i][6]; // Column G
      const tourName = data[i][3]; // Column D
      const tourDateStr = tourDate.toLocaleDateString();

      // Generate pre-filled URL
      const prefilledUrl = `${FEEDBACK_FORM_URL}?${FEEDBACK_ENTRY_TOUR}=${encodeURIComponent(tourName)}&${FEEDBACK_ENTRY_DATE}=${encodeURIComponent(tourDateStr)}`;

      const template = HtmlService.createTemplateFromFile('email-customer-feedback');
      template.customerName = customerName;
      template.tourName = tourName;
      template.tourDate = tourDateStr;
      template.feedbackUrl = prefilledUrl;

      const htmlBody = template.evaluate().getContent();
      const plainTextBody = `Hi ${customerName},\n\nThank you for joining us for the ${tourName} on ${tourDateStr}! We'd love to hear your feedback.\n\nPlease share your thoughts here: ${prefilledUrl}\n\nBest regards,\nThe Expedition YEG Team`;

      sendEmail({
        to: customerEmail,
        subject: `How was your ride with Expedition YEG?`,
        htmlBody: htmlBody,
        plainTextBody: plainTextBody
      });

      // Mark as sent in Column M
      sheet.getRange(i + 1, 13).setValue('Sent on ' + new Date().toLocaleDateString());
      count++;
    }
  }

  SpreadsheetApp.getUi().alert(`Success: Sent ${count} feedback request emails.`);
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

// --- RESTRICTED APPROVAL CONFIG ---
// 1. Deploy the 'apps-script-approval-backend.js' as a separate Web App.
// 2. Paste its 'Web App URL' here:
const APPROVAL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxr-d4f84LaOU-c1A2RMfDGIJ8j7Guc_oSPpI30_-AUEE2l33QWMiNQYOwUSoACrDm8uA/exec'; 

const COL_INV_TOTAL = 5; // Column E
const COL_INV_BOOKED = 6; // Column F
const COL_INV_PRIVATE = 7; // Column G
const COL_INV_PENDING = 8; // Column H

// Helper function to combine Date and Time columns into a single Date object
function getCombinedDateTime(dateVal, timeVal) {
  // If both are true Date objects (which Google Sheets often returns)
  if (dateVal instanceof Date && timeVal instanceof Date) {
    return new Date(
      dateVal.getFullYear(),
      dateVal.getMonth(),
      dateVal.getDate(),
      timeVal.getHours(),
      timeVal.getMinutes()
    );
  }
  // Fallback: Try to parse them as strings if they were formatted as plain text
  return new Date(dateVal + ' ' + timeVal);
}

// Generate a unique ID for each booking
function generateId() {
  return Utilities.getUuid();
}

// --- GET REQUEST: Fetch Available Tours ---
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_INVENTORY);
    if (!sheet) throw new Error(`Sheet '${SHEET_NAME_INVENTORY}' not found.`);

    const data = sheet.getDataRange().getValues();
    const availableTours = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const totalSpots = parseInt(row[COL_INV_TOTAL - 1]) || 0; 
      const bookedSpots = parseInt(row[COL_INV_BOOKED - 1]) || 0; 
      const pendingSpots = parseInt(row[COL_INV_PENDING - 1]) || 0;
      const remainingSpots = totalSpots - bookedSpots - pendingSpots;
      const isPrivate = row[COL_INV_PRIVATE - 1] === true || row[COL_INV_PRIVATE - 1] === "Yes" || String(row[COL_INV_PRIVATE - 1]).toLowerCase() === "private";

      const tourDate = getCombinedDateTime(row[1], row[2]);

      // Only return tours in the future with available spots AND not marked private
      if (remainingSpots > 0 && tourDate > new Date() && !isPrivate) {
        availableTours.push({
          id: row[0] + "_" + i, // Unique ID: Type_RowIndex
          date: tourDate.toISOString(), 
          tourName: row[3],
          totalSpots: totalSpots,
          remainingSpots: remainingSpots
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: availableTours
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOwnerEmail() {
  if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.trim() !== "") {
    return NOTIFICATION_EMAIL.trim();
  }
  return "";
}

// --- POST REQUEST: Handle New Bookings ---
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); 

  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // --- HANDLE CONTACT FORM ---
    if (payload.type === 'contact') {
      const contactSheet = ss.getSheetByName(SHEET_NAME_CONTACT) || ss.insertSheet(SHEET_NAME_CONTACT);
      const { name, email, message } = payload;
      
      contactSheet.appendRow([
        new Date(),
        name,
        email,
        message
      ]);
      
      const ownerEmail = getOwnerEmail();
      if (ownerEmail) {
        const contactTemplate = HtmlService.createTemplateFromFile('email-contact-notification');
        contactTemplate.name = name;
        contactTemplate.email = email;
        contactTemplate.message = message;

        const htmlBody = contactTemplate.evaluate().getContent();
        const plainTextBody = `New Contact Message\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

        sendEmail({
          to: ownerEmail,
          subject: `New Contact Message from ${name}`,
          htmlBody: htmlBody,
          plainTextBody: plainTextBody
        });
      }

      // 2. Send Confirmation Email to CUSTOMER
      const customerReceiptTemplate = HtmlService.createTemplateFromFile('email-customer-contact-receipt');
      customerReceiptTemplate.name = name;
      customerReceiptTemplate.message = message;

      const customerHtmlBody = customerReceiptTemplate.evaluate().getContent();
      const customerPlainTextBody = `Hi ${name},\n\nWe've received your message and will get back to you shortly.\n\nYour Message:\n${message}\n\nBest regards,\nThe Expedition YEG Team`;

      sendEmail({
        to: email,
        subject: `We've received your message - Expedition YEG`,
        htmlBody: customerHtmlBody,
        plainTextBody: customerPlainTextBody
      });
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Message sent successfully!'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // --- HANDLE BOOKINGS ---
    const tourId = payload.tourId;
    const customerName = payload.name;
    const customerEmail = payload.email;
    const partySize = parseInt(payload.partySize) || 1;
    const phone = payload.phone || "N/A";
    const isUnscheduled = payload.unscheduled === true;
    const isPrivateRequest = payload.private === true;
    const totalCost = payload.totalCost || 0;
    const desiredDate = payload.desiredDate;
    const preferredTime = payload.preferredTime;
    
    const inventorySheet = ss.getSheetByName(SHEET_NAME_INVENTORY);
    const bookingsSheet = ss.getSheetByName(SHEET_NAME_BOOKINGS);
    const requestsSheet = ss.getSheetByName(SHEET_NAME_REQUESTS) || ss.insertSheet(SHEET_NAME_REQUESTS);

    let tourDetails = null;

    if (isUnscheduled) {
      // For unscheduled/custom requests, the ID is "REQUEST:tour-type-id"
      const typeId = tourId.replace("REQUEST:", "");
      const tourName = typeId.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      
      tourDetails = {
        date: desiredDate ? new Date(desiredDate + "T12:00:00") : null, 
        name: tourName + (isPrivateRequest ? " (Private Request)" : " (Custom Request)")
      };
      
      // OPTIONAL: You could also add a row to Inventory here to track these bikes, 
      // but for now they just stay in the Requests sheet.
    } else {
      const invData = inventorySheet.getDataRange().getValues();
      let tourFound = false;

      // Extract original ID and row index from composite ID (e.g., "type_5")
      let searchId = tourId;
      let rowIndexHint = -1;
      if (typeof tourId === 'string' && tourId.includes('_')) {
        const parts = tourId.split('_');
        rowIndexHint = parseInt(parts.pop());
        searchId = parts.join('_');
      }

      for (let i = 1; i < invData.length; i++) {
        // Match either the direct ID or the row-index-hinted ID
        if (invData[i][0] == tourId || (i === rowIndexHint && invData[i][0] == searchId)) {
          tourFound = true;
          const totalSpots = parseInt(invData[i][COL_INV_TOTAL - 1]); 
          const currentBooked = parseInt(invData[i][COL_INV_BOOKED - 1]); 
          const currentPending = parseInt(invData[i][COL_INV_PENDING - 1] || 0);
          
          if ((totalSpots - currentBooked - currentPending) < partySize) {
             throw new Error("Not enough spaces available for this party size.");
          }
          
          // Update the PENDING count in the inventory sheet immediately
          inventorySheet.getRange(i + 1, COL_INV_PENDING).setValue(currentPending + partySize); 
          
          tourDetails = {
            date: getCombinedDateTime(invData[i][1], invData[i][2]),
            name: invData[i][3] 
          };
          break;
        }
      }

      if (!tourFound) throw new Error("Tour ID '" + tourId + "' not found in Inventory.");
    }

    const bookingId = generateId();

    if (isUnscheduled) {
      // Log to Requests Sheet
      requestsSheet.appendRow([
        new Date(),              // A: Timestamp
        bookingId,               // B: Request ID
        tourId,                  // C: Tour ID
        tourDetails.name,        // D: Tour Type
        desiredDate,             // E: Desired Date
        preferredTime,           // F: Preferred Time
        customerName,            // G: Customer Name
        customerEmail,           // H: Customer Email
        phone,                   // I: Phone
        partySize,               // J: Party Size
        isPrivateRequest ? "Yes" : "No", // K: Private?
        `$${totalCost.toFixed(2)}`, // L: Estimated Cost
        JSON.stringify(payload.meetingLocation || {}), // M: Meeting Location
        payload.duration || "2 hours" // N: Duration
      ]);
    } else {
      // Log to Bookings Sheet
      bookingsSheet.appendRow([
        new Date(),              // A: Timestamp
        bookingId,               // B: Booking ID
        tourId,                  // C: Tour ID
        tourDetails.name,        // D: Tour Name
        tourDetails.date ? tourDetails.date.toISOString() : "TBD", // E: Tour Date
        customerName,            // F: Customer Name
        customerEmail,           // G: Customer Email
        phone,                   // H: Phone
        partySize,               // I: Party Size
        "Pending",               // J: Status
        isPrivateRequest ? "Yes" : "No", // K: Private?
        `$${totalCost.toFixed(2)}`, // L: Total Cost
        JSON.stringify(payload.meetingLocation || {}), // M: Meeting Location
        payload.duration || "2 hours" // N: Duration
      ]);
    }

    // 1. Send Notification Email to OWNER
    const ownerEmail = getOwnerEmail(); 
    if (ownerEmail) {
      const ownerTemplate = HtmlService.createTemplateFromFile('email-owner-notification');
      ownerTemplate.bookingId = bookingId;
      ownerTemplate.isUnscheduled = isUnscheduled;
      ownerTemplate.tourName = tourDetails.name;
      ownerTemplate.tourDate = tourDetails.date ? tourDetails.date.toLocaleString() : "TBD";
      ownerTemplate.desiredDate = desiredDate || "Not specified";
      ownerTemplate.preferredTime = preferredTime || "Not specified";
      ownerTemplate.customerName = customerName;
      ownerTemplate.customerEmail = customerEmail;
      ownerTemplate.phone = phone;
      ownerTemplate.partySize = partySize;
      ownerTemplate.isPrivateRequest = isPrivateRequest;
      ownerTemplate.totalCost = `$${totalCost.toFixed(2)}`;
      ownerTemplate.approvalLink = `${APPROVAL_SCRIPT_URL}?action=approve&bookingId=${bookingId}`;

      const htmlBody = ownerTemplate.evaluate().getContent();
      const plainTextBody = `New Booking Request\n\nID: ${bookingId}\nTour: ${tourDetails.name}\nCustomer: ${customerName}\nEmail: ${customerEmail}\nPhone: ${phone}\nParty Size: ${partySize}\nTotal Cost: $${totalCost.toFixed(2)}\n\nApprove here: ${APPROVAL_SCRIPT_URL}?action=approve&bookingId=${bookingId}`;

      sendEmail({
        to: ownerEmail,
        subject: isUnscheduled ? `New Private Request - ${tourDetails.name}` : `New Booking - ${tourDetails.name}`,
        htmlBody: htmlBody,
        plainTextBody: plainTextBody
      });
    }

    // 2. Send Confirmation Email to CUSTOMER
    const customerTemplate = HtmlService.createTemplateFromFile('email-customer-confirmation');
    customerTemplate.bookingId = bookingId;
    customerTemplate.isUnscheduled = isUnscheduled;
    customerTemplate.tourName = tourDetails.name;
    customerTemplate.tourDate = tourDetails.date ? tourDetails.date.toLocaleString() : "TBD";
    customerTemplate.desiredDate = desiredDate || "Not specified";
    customerTemplate.preferredTime = preferredTime || "Not specified";
    customerTemplate.customerName = customerName;
    customerTemplate.customerEmail = customerEmail;
    customerTemplate.phone = phone;
    customerTemplate.partySize = partySize;
    customerTemplate.totalCost = `$${totalCost.toFixed(2)}`;

    const customerHtmlBody = customerTemplate.evaluate().getContent();
    const customerPlainTextBody = `Hi ${customerName},\n\nWe've received your booking request for ${tourDetails.name}. Our team is reviewing it and will follow up shortly.\n\nSummary:\nTour: ${tourDetails.name}\nParty Size: ${partySize}\nTotal Cost: $${totalCost.toFixed(2)}\n\nBest regards,\nThe Expedition YEG Team`;

    sendEmail({
      to: customerEmail,
      subject: `Booking Request Received: ${tourDetails.name}`,
      htmlBody: customerHtmlBody,
      plainTextBody: customerPlainTextBody
    });

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Booking request submitted!'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}