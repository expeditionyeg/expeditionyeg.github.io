import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Navigation, Banknote, Calendar, ChevronLeft, MapPin, Camera, Info, Map } from "lucide-react";
import { tours } from "@/data/tours";

export async function generateStaticParams() {
  return tours.filter(t => t.enabled).map((tour) => ({
    slug: tour.id,
  }));
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = tours.find((t) => t.id === slug && t.enabled);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* Hero Section */}
      <div 
        className="relative h-[50vh] min-h-[400px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
            <Link 
              href="/tours" 
              className="inline-flex items-center text-white hover:text-blue-200 mb-6 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Tours
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">{tour.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center">
                <Map className="h-5 w-5 mr-2 text-blue-400" />
                <span>{tour.distance}</span>
              </div>
              <div className="flex items-center">
                <Navigation className="h-5 w-5 mr-2 text-blue-400" />
                <span>{tour.difficulty}</span>
              </div>
              <div className="flex items-center">
                <Banknote className="h-5 w-5 mr-2 text-blue-400" />
                <span>${tour.price} per person</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Info className="h-7 w-7 mr-3 text-blue-600 dark:text-blue-400" />
                About this tour
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {tour.longDescription}
              </p>
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <MapPin className="h-7 w-7 mr-3 text-blue-600 dark:text-blue-400" />
                The Route
              </h2>
              <div className="space-y-8">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                        {index + 1}
                      </div>
                      {index !== tour.itinerary.length - 1 && (
                        <div className="w-0.5 h-full bg-blue-200 dark:bg-blue-800 my-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Photo Gallery */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <Camera className="h-7 w-7 mr-3 text-blue-600 dark:text-blue-400" />
                Photo Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tour.gallery.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="h-64 rounded-xl bg-cover bg-center shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Map Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Route Map</h3>
                </div>
                <div className="aspect-square w-full bg-gray-100 dark:bg-gray-700">
                  <iframe
                    src={tour.routeMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Booking Card */}
              <div className="bg-blue-600 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to ride?</h3>
                <p className="mb-8 text-blue-100 text-lg">
                  Book your spot today and join us for an unforgettable adventure.
                </p>
                <Link 
                  href={`/book?tour=${tour.id}`}
                  className="block w-full bg-white text-blue-600 text-center font-bold py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="h-6 w-6" />
                  Book Now - ${tour.price}
                </Link>
                <p className="mt-4 text-center text-sm text-blue-200">
                  Instant confirmation • Secure booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
