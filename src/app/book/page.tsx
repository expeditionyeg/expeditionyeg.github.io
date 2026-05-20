"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Users, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { tours as allTours } from "@/data/tours";
import { siteConfig } from "@/config/site";

const APPS_SCRIPT_URL = siteConfig.api.appsScriptUrl;

interface Tour {
  id: string;
  date: string;
  tourName: string;
  totalSpots: number;
  remainingSpots: number;
}

function BookingContent() {
  const searchParams = useSearchParams();
  const initialTourId = searchParams.get('tour');

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refs
  const groupDetailsRef = useRef<HTMLHeadingElement>(null);

  // Form State
  const [selectedTourId, setSelectedTourId] = useState(initialTourId || "");
  const [isUnscheduled, setIsUnscheduled] = useState(() => 
    !!(initialTourId && allTours.find(t => t.id === initialTourId))
  );
  const [isPrivateTour, setIsPrivateTour] = useState(false);
  const [isAdultOnly, setIsAdultOnly] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [desiredDate, setDesiredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning");

  // Helper to scroll to group details
  const scrollToGroupDetails = () => {
    // Small delay to ensure the form has rendered if it was previously hidden
    setTimeout(() => {
      groupDetailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus for accessibility
      groupDetailsRef.current?.focus();
    }, 100);
  };

  // Calculate minimum date
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + siteConfig.booking.minDaysInAdvance);
    return date.toISOString().split('T')[0];
  };

  
  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Pricing Logic
  const { discountThreshold, discountRate, basePrice } = siteConfig.pricing;

  const getBasePrice = () => {
    if (isUnscheduled) {
      // For unscheduled, try to match the base price of that tour type if possible
      const tourType = allTours.find(t => t.id === selectedTourId);
      return tourType ? tourType.price : basePrice;
    }
    const tour = tours.find(t => t.id === selectedTourId);
    if (tour) {
      // Handle composite IDs like "type_row"
      const baseId = tour.id.includes('_') ? tour.id.split('_')[0] : tour.id;
      const tourType = allTours.find(t => t.id === baseId || t.title === tour.tourName);
      return tourType ? tourType.price : basePrice;
    }
    return basePrice;
  };

  const calculateTotal = () => {
    const currentBasePrice = getBasePrice();
    let pricePerPerson = currentBasePrice;
    if (partySize >= discountThreshold) {
      pricePerPerson = currentBasePrice * (1 - discountRate);
    }
    return pricePerPerson * partySize;
  };

  useEffect(() => {
    // Fetch available tours from Apps Script
    fetch(APPS_SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTours(data.data);
          // If we have a scheduled tour ID that matches, unset unscheduled
          if (initialTourId && data.data.find((t: Tour) => t.id === initialTourId)) {
            setIsUnscheduled(false);
          }
        } else {
          setError(data.message || "Failed to load tours.");
        }
      })
      .catch((err) => {
        console.error("Error fetching tours:", err);
        setError("Could not connect to the booking system.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [initialTourId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUnscheduled && !desiredDate) {
      setError("Please select a desired date.");
      return;
    }

    if (isUnscheduled && desiredDate < getMinDate()) {
      setError("Custom requests must be booked at least 10 days in advance.");
      return;
    }

    const tourData = allTours.find(t => t.id === (isUnscheduled ? selectedTourId : (selectedTourId.includes('_') ? selectedTourId.split('_')[0] : selectedTourId)));

    const payload = {
      tourId: isUnscheduled ? `REQUEST:${selectedTourId}` : selectedTourId,
      name,
      email,
      phone,
      partySize,
      unscheduled: isUnscheduled,
      private: isPrivateTour,
      isAdultOnly,
      totalCost: calculateTotal(),
      desiredDate: isUnscheduled ? desiredDate : null,
      preferredTime: isUnscheduled ? preferredTime : null,
      meetingLocation: tourData?.meetingLocation || null,
      duration: tourData?.duration || "2 hours"
    };

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (result.status === "success") {
        setSuccess(true);
      } else {
        setError(result.message || "An error occurred during booking.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to submit booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedTour = isUnscheduled 
    ? { tourName: allTours.find(t => t.id === selectedTourId)?.title || "Custom Tour" }
    : tours.find(t => t.id === selectedTourId);

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-20 w-20 text-green-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Request Submitted!</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Thank you, {name}. Your booking request for {isUnscheduled ? "a " : "the "}{selectedTour?.tourName} has been received. Our team will review it and follow up with you shortly.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setSelectedTourId("");
            setIsUnscheduled(false);
            setIsPrivateTour(false);
            setIsAdultOnly(false);
            setPartySize(1);
            setDesiredDate("");
            setPreferredTime("Morning");
          }}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Book a Tour</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          View real-time availability or request a custom date for any of our tour types.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Availability List */}
        <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">1. Select a Tour</h2>
          
          <div className="mt-6 flex-grow space-y-8">
            {/* Scheduled Tours Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Scheduled Rides</h3>
              <div className="space-y-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400">
                    <Loader2 className="h-8 w-8 animate-spin mb-4 text-blue-500" />
                    <p>Loading available tours...</p>
                  </div>
                ) : error && !selectedTourId ? (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                ) : tours.length === 0 ? (
                  <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">No tours are currently scheduled.</p>
                  </div>
                ) : (
                  tours.map((tour) => (
                    <button
                      key={tour.id}
                      type="button"
                      onClick={() => {
                        setSelectedTourId(tour.id);
                        setIsUnscheduled(false);
                        setIsPrivateTour(false);
                        scrollToGroupDetails();
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedTourId === tour.id && !isUnscheduled
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">{tour.tourName}</h4>
                        <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${
                          tour.remainingSpots > 3 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {tour.remainingSpots} spots left
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(tour.date).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Unscheduled Options Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Planning a Special Occasion?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Our custom bookings are perfect for <strong className="font-semibold text-gray-900 dark:text-white">corporate team building</strong>, <strong className="font-semibold text-gray-900 dark:text-white">private date nights</strong>, or <strong className="font-semibold text-gray-900 dark:text-white">birthday parties</strong>. Request a custom date below:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {allTours.filter(t => t.enabled).map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setSelectedTourId(type.id);
                      setIsUnscheduled(true);
                      setIsPrivateTour(false);
                      scrollToGroupDetails();
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedTourId === type.id && isUnscheduled
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">{type.title}</span>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">Custom Booking</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-6 flex flex-col">
          <h2 
            ref={groupDetailsRef}
            tabIndex={-1}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2 focus:outline-none"
          >
            2. Group Details
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {isUnscheduled 
              ? "Tell us about your group and preferred timing."
              : "Fill out your information to secure your booking."}
          </p>
          
          <form onSubmit={handleSubmit} className="flex-grow space-y-6">
            {!selectedTourId ? (
              <div className="h-full flex items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Please select a tour or request option from the list first.</p>
              </div>
            ) : (
              <>
                {error && (
                   <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-start">
                     <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                     <p>{error}</p>
                   </div>
                )}

                {isUnscheduled && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
                    <p className="font-semibold mb-1">Custom Booking Request</p>
                    <p>You are requesting a custom date for <strong>{selectedTour?.tourName}</strong>. Our team will contact you to coordinate a time.</p>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                    />
                  </div>
                </div>

                {isUnscheduled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="desiredDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Desired Date</label>
                      <input
                        type="date"
                        id="desiredDate"
                        required={isUnscheduled}
                        min={getMinDate()}
                        value={desiredDate}
                        onChange={(e) => setDesiredDate(e.target.value)}
                        className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Time</label>
                      <select
                        id="preferredTime"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                      >
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <div>
                    <label htmlFor="partySize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Party Size (Number of Bikes)</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <select
                        id="partySize"
                        value={partySize}
                        onChange={(e) => setPartySize(parseInt(e.target.value))}
                        className="w-full pl-10 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border appearance-none"
                      >
                        {[...Array(isUnscheduled ? 15 : (tours.find(t => t.id === selectedTourId)?.remainingSpots || 1))].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1} Participant{i > 0 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {isUnscheduled && (
                    <div className="flex items-center space-x-3 mb-3 p-1">
                      <input
                        type="checkbox"
                        id="privateTour"
                        checked={isPrivateTour}
                        onChange={(e) => setIsPrivateTour(e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex flex-col">
                        <label htmlFor="privateTour" className="text-sm font-medium text-gray-700 dark:text-gray-300">Request as Private Tour</label>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 italic">Surcharge may apply for private groups</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3 p-1">
                    <input
                      type="checkbox"
                      id="isAdultOnly"
                      required
                      checked={isAdultOnly}
                      onChange={(e) => setIsAdultOnly(e.target.checked)}
                      className="h-5 w-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex flex-col">
                      <label htmlFor="isAdultOnly" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Everyone in the group is 18+
                      </label>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 italic">
                        We currently only accept adult participants (18+) for our tours.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Price per person:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {partySize >= discountThreshold ? (
                        <>
                          <span className="line-through text-gray-400 mr-2">${getBasePrice()}</span>
                          <span className="text-green-600 dark:text-green-400">${getBasePrice() * (1 - discountRate)}</span>
                        </>
                      ) : (
                        `$${getBasePrice()}`
                      )}
                    </span>
                  </div>
                  {partySize >= discountThreshold && (
                    <div className="text-xs text-green-600 dark:text-green-400 mb-3 flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      15% Group Discount Applied (4+ participants)
                    </div>
                  )}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Estimated Total:</span>
                    <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">${calculateTotal()}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      isUnscheduled ? 'Send Request' : 'Submit Request'
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}