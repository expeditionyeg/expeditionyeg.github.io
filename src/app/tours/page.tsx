import Link from "next/link";
import { Clock, Navigation, Banknote, Calendar, ArrowRight, Map } from "lucide-react";
import { tours } from "@/data/tours";

export default function ToursPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Our Bike Tours</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Experience Edmonton without the sweat. Most of our tours feature premium electric bikes, making the city&apos;s beautiful river valley and historic streets accessible to everyone (check individual tour details for BYO options).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.filter(t => t.enabled).map((tour) => (
          <div key={tour.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${tour.image})` }}
            />
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tour.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{tour.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Clock className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Map className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
                  <span>{tour.distance}</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Navigation className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
                  <span>{tour.difficulty}</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Banknote className="h-5 w-5 mr-3 text-blue-500 dark:text-blue-400" />
                  <span>${tour.price} per person</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href={`/tours/${tour.id}`}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-center font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href={`/book?tour=${tour.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="h-5 w-5" />
                  Book
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-blue-900 rounded-3xl p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Planning a Special Event?</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          From romantic **date nights** to large-scale **corporate team building**, we can customize any tour to fit your group&apos;s needs. Let us handle the details while you enjoy the ride.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link 
            href="/contact?subject=Corporate"
            className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
          >
            Corporate Events
          </Link>
          <Link 
            href="/contact?subject=DateNight"
            className="bg-blue-600 hover:bg-blue-500 text-white border border-blue-400 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
          >
            Private Date Nights
          </Link>
        </div>
      </div>
    </div>
  );
}