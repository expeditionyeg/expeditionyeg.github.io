export const siteConfig = {
  name: "Expedition YEG",
  description: "Guided bike tours through Edmonton's River Valley and historic neighborhoods.",
  email: "expeditionyeg@gmail.com",
  phone: "(780) 966-2257",
  links: [
    { name: "Home", href: "/" },
    { name: "Tours", href: "/tours" },
    { name: "Preparation", href: "/preparation" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  pricing: {
    basePrice: 150, // Default for unscheduled/custom tours
    discountThreshold: 4, // Number of people to trigger discount
    discountRate: 0.15, // 15% discount
  },
  booking: {
    minDaysInAdvance: 10, // Minimum notice for custom bookings
  },
  api: {
    appsScriptUrl: "https://script.google.com/macros/s/AKfycbyRIwZ3-i-0s-w-o1xl0mAo-B-3Na3utOSvmUso_vFLBh_9CCIVoLSB6Wo9rQwfRb1HRA/exec",
  }
};

export type SiteConfig = typeof siteConfig;
