import Link from "next/link";
import Image from "next/image";
import { Map, Clock, ShieldCheck, ArrowRight, Zap, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Placeholder for background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1655056027368-958dabb91cca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-6 text-white drop-shadow-xl">
            Explore Edmonton <br/> <span className="text-blue-400">on Two Wheels</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-10 drop-shadow font-medium">
            Experience the breathtaking River Valley and vibrant neighborhoods with our guided bike tours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tours" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-flex justify-center items-center gap-2 w-full sm:w-auto">
              View Tours <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/book" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors text-center w-full sm:w-auto">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Ride With Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <Map className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Authentic Local Guides</h3>
              <p className="text-gray-600 dark:text-gray-300">We are proud Edmontonians who love our city. Discover hidden gems and learn about Edmonton&apos;s rich history through the eyes of the people who live here.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Safety First</h3>
              <p className="text-gray-600 dark:text-gray-300">Ride with confidence. Our routes prioritize Edmonton&apos;s separated bike lanes and scenic multi-use paths for a low-stress, enjoyable experience.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Flexible Options</h3>
              <p className="text-gray-600 dark:text-gray-300">From leisurely 2-hour cruises to full-day adventures, we have tours that fit your schedule and pace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* E-Bike Accessibility Section */}
      <section className="py-24 bg-blue-50 dark:bg-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6">
                <Zap className="h-4 w-4" />
                <span>The E-Bike Advantage</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Making Edmonton Accessible <br className="hidden md:block" /> for Everyone
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Edmonton&apos;s River Valley is the largest urban parkland in North America, but its rolling hills can be intimidating. 
                Electric bikes remove the barriers, making the city&apos;s best views accessible to everyone, 
                regardless of fitness level or cycling experience.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1 h-6 w-6 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Level the Playing Field</h4>
                    <p className="text-gray-600 dark:text-gray-400">E-bikes make it easy for groups of different ages and abilities to ride together at the same comfortable pace.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1 h-6 w-6 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Conquer Hills with Ease</h4>
                    <p className="text-gray-600 dark:text-gray-400">Flatten the river valley&apos;s toughest inclines with a gentle boost. You&apos;ll arrive at the summit with a smile, not a sweat.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 bg-blue-600 rounded-full p-1 h-6 w-6 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Focus on the Story</h4>
                    <p className="text-gray-600 dark:text-gray-400">Spend less energy pedaling and more time enjoying the hidden gems and local history shared by our guides.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link href="/tours" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  Explore our tours <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://plus.unsplash.com/premium_photo-1672116453014-58e0b56aa14c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="A person enjoying a ride on an electric bike through a scenic park"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Perfect for Any Occasion</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Whether you&apos;re looking for a romantic evening or a unique team-building activity, our tours provide the perfect backdrop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 h-[400px]">
              <Image 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop" 
                alt="A couple enjoying a sunset bike ride"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Date Nights</h3>
                <p className="text-gray-200 text-lg mb-4">
                  Surprise your partner with a scenic sunset cruise through the River Valley. Perfect for anniversaries, first dates, or just a special evening out.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">
                  Inquire Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 h-[400px]">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="A group of colleagues on a team building bike tour"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Corporate Events</h3>
                <p className="text-gray-200 text-lg mb-4">
                  Boost team morale with a unique outdoor experience. Our custom corporate tours are designed for team building and networking in the fresh air.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">
                  Plan Your Event <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}