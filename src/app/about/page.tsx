import Image from "next/image";
import { Bike, Map, History, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Our Edmonton Story</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Hi, I&apos;m Matt. For over 15 years, I&apos;ve been exploring every trail, alleyway, and river valley path in this city. Expedition YEG is my way of sharing those hidden gems with you.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Born to Ride</h2>
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
            <p>
              My passion for cycling started before I could even walk properly. 
              As you can see, I&apos;ve always taken safety seriously even if the helmet was a bit oversized!
            </p>
            <p>
              Cycling isn&apos;t just a business for us at Expedition YEG, it&apos;s a lifelong obsession. 
              That same sense of wonder is what I strive to share with every person who joins us 
              on a tour today.
            </p>
          </div>
        </div>

        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/matt.png"
            alt="Founder Matt as a child on a tricycle"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 md:order-1 relative h-96 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1601867818212-d3d8c4bcf7d9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Biking in Edmonton"
            fill
            className="object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">15+ Years in the Saddle</h2>
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
            <p>
              Expedition YEG started with a simple passion: showing friends the hidden gems of Edmonton that you can only see on two wheels. 
              Since the late 2000s, our team has been navigating the ever-changing landscape of our city.
            </p>
            <p>
              From the pioneering days of the river valley trail system to the modern bike lanes that now connect our vibrant neighborhoods, 
              we&apos;ve seen Edmonton grow and evolve.
            </p>
          </div>
        </div>
      </div>

      {/* Stats/Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl mb-4">
            <History className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">15+</h3>
          <p className="text-gray-600 dark:text-gray-400">Years of Experience</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/50 rounded-xl mb-4">
            <Map className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Unique Vistas</h3>
          <p className="text-gray-600 dark:text-gray-400">The best city views</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl mb-4">
            <Bike className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Thousands</h3>
          <p className="text-gray-600 dark:text-gray-400">of Kilometers Pedaled</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/50 rounded-xl mb-4">
            <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Countless</h3>
          <p className="text-gray-600 dark:text-gray-400">Happy Riders</p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="mt-20 bg-blue-600 rounded-3xl p-8 md:p-16 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
        <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed mb-12">
          We believe Edmonton is best experienced at a human pace. Our tours aren&apos;t just about getting from point A to B; 
          they&apos;re about the stories in between, the fresh air of the river valley, and the unique community spirit 
          that makes YEG special.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold mb-4">Unforgettable Date Nights</h3>
            <p className="text-lg opacity-90">
              We love helping couples create special memories. Whether it&apos;s an anniversary or a first date, our scenic routes and sunset views provide the perfect romantic backdrop.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold mb-4">Premier Corporate Events</h3>
            <p className="text-lg opacity-90">
              Transform your next team-building activity. We offer customized corporate tours that encourage collaboration, communication, and fun in Edmonton&apos;s beautiful outdoors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}