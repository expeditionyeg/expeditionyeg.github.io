import { Shield, Lock, Camera, FileText, Database, HeartPulse, UserCheck, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Last updated: May 20, 2026. How we collect, use, store, and protect your personal information at Expedition YEG.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Nav (Desktop only) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              Policy sections
            </h3>
            <a href="#overview" className="block text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              1. Overview & Scope
            </a>
            <a href="#collection" className="block text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              2. Information We Collect
            </a>
            <a href="#health-safety" className="block text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              3. Health & Safety Data
            </a>
            <a href="#media-photos" className="block text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              4. Photos & Media Release
            </a>
            <a href="#storage" className="block text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              5. Storage & Security
            </a>
            <a href="#retention" className="block text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              6. Data Retention
            </a>
            <a href="#sharing" className="block text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              7. Information Sharing
            </a>
            <a href="#contact" className="block text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              8. Contact & Rights
            </a>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-3 space-y-12">
          {/* Overview */}
          <section id="overview" className="scroll-mt-24">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Overview & Scope</h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    Expedition YEG is committed to protecting the privacy and safety of our participants. 
                    This Privacy Policy outlines how we collect, handle, store, and safeguard personal information 
                    in compliance with the Alberta *Personal Information Protection Act* (PIPA) and the federal 
                    *Personal Information Protection and Electronic Documents Act* (PIPEDA).
                  </p>
                  <p>
                    We value transparency: **we do not track you with marketing cookies or sell your personal data.** 
                    We collect only the information necessary to organize, run, and legally protect our tours.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Information We Collect */}
          <section id="collection" className="scroll-mt-24">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400 shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    When you book a tour, complete our contact form, or sign our liability waiver, we collect details including:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>**Identity Details:** First and last name, age, and signature.</li>
                    <li>**Contact Information:** Email address and phone number.</li>
                    <li>**Logistical Details:** Bike size requirements (such as height) to prepare your equipment.</li>
                    <li>**Safety Information:** Emergency contact names, phone numbers, and relationship to you.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Health and Safety Data */}
          <section id="health-safety" className="scroll-mt-24">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400 shrink-0">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Health & Safety Data</h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    Guided cycling tours carry inherent physical demands and risks. As stated in our liability waiver:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>We require participants to declare they are in good health and possess a sufficient level of physical fitness to participate.</li>
                    <li>We ask that you notify your tour guide of any pre-existing medical conditions, allergies, or issues that may affect your safety during the excursion.</li>
                    <li>We do not record or archive permanent medical records. Any medical details shared with guides are used purely for immediate safety coordination during the tour.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Photo & Media Release */}
          <section id="media-photos" className="scroll-mt-24">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400 shrink-0">
                <Camera className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Photos & Media Release</h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    By signing our liability waiver, you grant Expedition YEG permission to use photographs or video recordings 
                    taken during our tours for marketing and promotional purposes (such as our website or social media channels).
                  </p>
                  <div className="bg-yellow-50 dark:bg-yellow-950/45 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                    <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                      How to Opt-Out:
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Your comfort is our priority. You may opt-out of photo and media recording at any time by simply 
                      notifying your guide before the start of the tour. We will respect your request immediately and ensure 
                      you are not included in promotional photos or video capture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Storage and Security */}
          <section id="storage" className="scroll-mt-24">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0">
                <Database className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Storage & Security</h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    We protect your personal data with standard administrative and digital safeguards:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Your details (including booking entries, contact receipts, and waiver logs) are stored digitally in a secure Google Workspace (Google Drive and Google Sheets) environment.</li>
                    <li>Access to this secure environment is strictly limited to authorized personnel (our owners and lead coordinators) who require it to run business operations.</li>
                    <li>We protect our administrator accounts using multi-factor authentication (MFA) to prevent unauthorized access.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Data Retention */}
          <section id="retention" className="scroll-mt-24">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400 shrink-0">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Data Retention</h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    As outlined in our liability waiver, signed agreements and their associated personal data are archived 
                    and retained securely for as long as legally required to satisfy legal liability, insurance, and records 
                    retention requirements. 
                  </p>
                  <p>
                    Once these retention periods expire, archives containing personal data are securely deleted or anonymized.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Information Sharing */}
          <section id="sharing" className="scroll-mt-24">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-pink-50 dark:bg-pink-900/30 rounded-xl text-pink-600 dark:text-pink-400 shrink-0">
                <UserCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Information Sharing</h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    We maintain a strict stance on data distribution. **We will never sell, trade, rent, or lease your personal information to third parties.**
                  </p>
                  <p>
                    We will only disclose your information to outside parties in the following exceptional situations:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>**Medical Emergencies:** In the event of an accident, health issue, or injury during a tour, we may share your contact info, medical declarations, and emergency contact details with medical responders or healthcare providers.</li>
                    <li>**Legal Compliance:** If required by law, court order, or government regulation.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Contact and Rights */}
          <section id="contact" className="scroll-mt-24">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-xl text-teal-600 dark:text-teal-400 shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Contact & Rights</h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    You have the right to request access to the personal data we hold about you, request corrections 
                    to inaccurate information, or ask questions about our storage and privacy operations.
                  </p>
                  <p>
                    For any questions, requests, or privacy concerns, please contact our team directly:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2 max-w-md">
                    <p className="font-bold text-gray-900 dark:text-white">Expedition YEG</p>
                    <p className="text-sm">**Email:** expeditionyeg@gmail.com</p>
                    <p className="text-sm">**Phone:** (780) 966-2257</p>
                    <p className="text-sm text-gray-500">Edmonton, Alberta, Canada</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
