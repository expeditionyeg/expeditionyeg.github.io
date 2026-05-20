import { CloudRain, Sun, Calendar, Clock, MapPin, Mail, ShieldCheck } from "lucide-react";

export default function PreparationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Tour Preparation</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Everything you need to know about weather policies and what to expect leading up to your Edmonton adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Weather Section */}
        <div className="space-y-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-600 rounded-xl">
                <CloudRain className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weather Policy</h2>
            </div>
            
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <section>
                <h3 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-400">Rain or Shine</h3>
                <p>
                  Most tours proceed in light rain. We recommend checking the forecast and dressing accordingly. 
                  Edmonton weather can change quickly!
                </p>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-400">Cancellations</h3>
                <p>
                  We prioritize your safety. Tours may be cancelled or rescheduled in the event of:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Heavy rain or persistent downpours</li>
                  <li>Lightning or severe thunderstorms</li>
                  <li>High winds (exceeding 40km/h)</li>
                  <li>Extreme temperatures (Predicted above 32°C or below 5°C during tour time)</li>
                  <li>Poor air quality (AQI above 7 due to wildfire smoke)</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-400">Refunds & Rescheduling</h3>
                <p>
                  If we cancel a tour due to weather, you will be offered a full refund or the option to 
                  reschedule to a later date at no additional cost.
                </p>
              </section>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-8 rounded-3xl border border-orange-100 dark:border-orange-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-600 rounded-xl">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What to Bring</h2>
            </div>
            <p className="mb-6 text-gray-700 dark:text-gray-300 italic font-medium">
              For all paid tours, we provide a premium electric bike and safety helmet. If you are joining a Free Trial, please remember it is a &quot;Bring Your Own Bike&quot; event. For all rides, you should bring:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-orange-600" /> Active and weather appropriate clothing
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-orange-600" /> Water bottle
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-orange-600" /> Sunscreen
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-orange-600" /> Closed-toe shoes
              </li>
            </ul>
          </div>

          <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-xl">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Safety & Waiver</h2>
            </div>
            <p className="mb-6 opacity-90">
              Your safety is our top priority. To ensure a smooth start to your tour, all participants are required to sign our digital liability waiver.
            </p>
            <a 
              href="https://forms.gle/cB3kpdbVWUZfvQgM6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-4 px-6 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Sign Digital Waiver
            </a>
            <p className="mt-4 text-xs opacity-75 text-center italic">
              Takes less than 2 minutes to complete.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-green-600 rounded-xl shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tour Timeline</h2>
          </div>

          <div className="space-y-12 ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[41px] bg-white dark:bg-gray-900 border-2 border-green-600 rounded-full p-1">
                <div className="bg-green-600 rounded-full w-2 h-2" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">10+ Days Before</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Book your tour online. Custom tours require at least 10 days notice to ensure guide availability 
                and route planning.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[41px] bg-white dark:bg-gray-900 border-2 border-green-600 rounded-full p-1">
                <div className="bg-green-600 rounded-full w-2 h-2" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">48 Hours Before</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Receive your final confirmation email. This includes the specific meeting location, 
                your guide&apos;s contact information, and any last-minute route updates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[41px] bg-white dark:bg-gray-900 border-2 border-green-600 rounded-full p-1">
                <div className="bg-green-600 rounded-full w-2 h-2" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Day of Tour</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Arrive at the meeting point 15 minutes early. This gives us time for bike fitting, 
                safety briefings, and signing waivers before we hit the trails.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-[41px] bg-white dark:bg-gray-900 border-2 border-green-600 rounded-full p-1">
                <div className="bg-green-600 rounded-full w-2 h-2" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Post-Tour</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                We&apos;ll send a follow-up email with any photos taken during the ride and a link to 
                share your experience. We love hearing your feedback!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
