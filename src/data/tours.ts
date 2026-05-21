export interface Tour {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  distance: string;
  difficulty: string;
  price: number;
  image: string;
  gallery: string[];
  routeMapUrl: string;
  wikipediaUrl?: string;
  enabled: boolean;
  meetingLocation: {
    name: string;
    address: string;
  };
  itinerary: {
    title: string;
    description: string;
  }[];
}

export const tours: Tour[] = [
  {
    id: "river-valley-cruise",
    title: "River Valley Cruise",
    description: "Our signature loop from Pedego through the lush Mill Creek Ravine, iconic Muttart pyramids, and historic Old Strathcona.",
    longDescription: "Experience the ultimate Edmonton loop starting from our partners at Pedego Electric Bikes. This tour is a local favorite, blending nature, history, and modern architecture. Rather than just riding from point A to point B, we'll dive deep into the stories behind the landmarks that shape our city's landscape, from the 'Famous Five' parks to the vibrant energy of Whyte Avenue.\n\nLooking for a unique outing? This cruise is a local favorite for **date nights**, offering romantic skyline views and scenic sunset spots. It's also an excellent choice for **corporate events** and team building, providing a low-stress way for colleagues to connect while exploring the heart of the city.",
    duration: "2 hours",
    distance: "10 km",
    difficulty: "Easy",
    price: 110,
    image: "https://images.unsplash.com/photo-1600867010843-ef255269d43d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    enabled: false,
    meetingLocation: {
      name: "Pedego Electric Bikes",
      address: "9918 82 Ave NW, Edmonton, AB T6E 1Y9"
    },
    gallery: [
      "/mill-creek-sign.jpg",
      "/mill-creek-trail.jpg",
      "/mill-creek-trail-sign.jpg",
      "https://images.unsplash.com/photo-1596048546977-800cfcaa56bc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "/river-valley-cruise-1.jpg",
      "/river-valley-cruise-2.jpg",
      "/river-valley-cruise-3.jpg",
      "/river-valley-cruise-4.jpg",
      "/river-valley-cruise-5.jpg",
      "/river-valley-cruise-6.jpg",
      "/river-valley-cruise-7.jpg",
      "/river-valley-cruise-8.jpg"
    ],
    routeMapUrl: "https://www.google.com/maps/d/embed?mid=1SKRWOIS3PULgFoHS0j5sefIdeknOE8k&ehbc=2E312F",
    itinerary: [
      { title: "Meet at Pedego Electric Bikes", description: "Get fitted with your bike and meet your guide at the heart of the community." },
      { title: "Mill Creek Ravine", description: "Pedal over century-old wooden trestle bridges in this tranquil, shaded urban escape that hints at the area's industrial past." },
      { title: "Henrietta Muir Edwards Park", description: "Explore this scenic park named after a journalist and legal expert who was one of Canada's 'Famous Five' women's rights pioneers." },
      { title: "Snack Break at Muttart Conservatory", description: "A refreshing break at the base of Edmonton's iconic glass pyramids, home to four distinct climate biomes." },
      { title: "Nellie McClung Park", description: "Enjoy unparalleled views and photo ops of the downtown skyline from this park named after the legendary suffragist." },
      { title: "Historic Old Strathcona", description: "Cruise through the vibrant Whyte Avenue district, known for its historic architecture, street art, and local boutiques." },
      { title: "Return to Pedego", description: "Wrap up our loop with a smooth ride back to our starting point." }
    ]
  },
  {
    id: "river-valley-cruise-trial",
    title: "River Valley Cruise (Free Trial)",
    description: "A free trial run of our signature loop. BYO(Bike) required! Help us refine the experience with your feedback.",
    longDescription: "Join us for a special trial run of our River Valley Cruise! This is a free, 'Bring Your Own Bike' edition of our signature loop. We're looking for enthusiastic riders to help us test the route, timing, and stories. In exchange for your feedback, you get a guided tour through Mill Creek, the Muttart pyramids, and Old Strathcona at no cost.",
    duration: "2 hours",
    distance: "10 km",
    difficulty: "Easy",
    price: 0,
    image: "https://images.unsplash.com/photo-1600867010843-ef255269d43d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    enabled: true,
    meetingLocation: {
      name: "Pedego Electric Bikes",
      address: "9918 82 Ave NW, Edmonton, AB T6E 1Y9"
    },
    gallery: [
      "/mill-creek-sign.jpg",
      "/mill-creek-trail.jpg",
      "/mill-creek-path.jpg",
      "/mill-creek-trail-sign.jpg",
      "https://images.unsplash.com/photo-1596048546977-800cfcaa56bc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "/river-valley-cruise-1.jpg",
      "/river-valley-cruise-2.jpg",
      "/river-valley-cruise-3.jpg",
      "/river-valley-cruise-4.jpg",
      "/river-valley-cruise-5.jpg",
      "/river-valley-cruise-6.jpg",
      "/river-valley-cruise-7.jpg",
      "/river-valley-cruise-8.jpg"
    ],
    routeMapUrl: "https://www.google.com/maps/d/embed?mid=1SKRWOIS3PULgFoHS0j5sefIdeknOE8k&ehbc=2E312F",
    itinerary: [
      { title: "Meet at Pedego Electric Bikes", description: "Bring your own bike and meet the team. We'll do a quick check-in before heading out." },
      { title: "Mill Creek Ravine", description: "Pedal over century-old wooden trestle bridges in this tranquil, shaded urban escape." },
      { title: "Henrietta Muir Edwards Park", description: "Learn about the legacy of the 'Famous Five' while enjoying the riverside trails." },
      { title: "Snack Break at Muttart Conservatory", description: "A quick regroup and refreshment stop by the pyramids." },
      { title: "Nellie McClung Park", description: "Stop for the iconic skyline photo op." },
      { title: "Historic Old Strathcona", description: "Ride through the heart of the arts district." },
      { title: "Return to Pedego", description: "Wrap up back at our starting point." }
    ]
  },
  {
    id: "downtown-highlights",
    title: "Downtown Highlights",
    description: "Explore the bustling heart of Edmonton, featuring the Ice District, Legislature grounds, and historic landmarks.",
    longDescription: "Discover the vibrant energy of Edmonton's downtown core. This tour takes you through the architectural wonders of the Alberta Legislature Grounds, the modern excitement of the Ice District, and the historic charm of the 104th Street Promenade. You'll learn about the city's transformation and see how urban life blends with beautiful public spaces.",
    duration: "2 hours",
    distance: "12 km",
    difficulty: "Easy",
    price: 99,
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    enabled: false,
    meetingLocation: {
      name: "Pedego Electric Bikes",
      address: "9918 82 Ave NW, Edmonton, AB T6E 1Y9"
    },
    gallery: [
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    routeMapUrl: "https://www.google.com/maps/d/embed?mid=1SKRWOIS3PULgFoHS0j5sefIdeknOE8k&ehbc=2E312F",
    itinerary: [
      { title: "Leg Grounds", description: "Explore the historic fountains and architecture of the Alberta Legislature." },
      { title: "High Level Bridge", description: "Ride across the top of the High Level Bridge for the best view in the city." },
      { title: "Ice District", description: "See Rogers Place and the hub of Edmonton's sports and entertainment." },
      { title: "Historical 104 St", description: "Finish at the historic warehouse district for a quick coffee stop." }
    ]
  },
  {
    id: "strathcona-brewery",
    title: "Strathcona Brewery Tour",
    description: "A fun-filled ride through historic Old Strathcona with stops at three local craft breweries. Must be 18+.",
    longDescription: "Combine your love for cycling and craft beer! Old Strathcona is home to some of the best micro-breweries in Alberta. On this tour, we'll navigate the bike-friendly streets of the south side, stopping at three distinct breweries to sample local favorites. Between stops, you'll see the murals, historic buildings, and the lively atmosphere of whyte Avenue.\n\nPerfect for **stagettes**, **birthday parties**, or **corporate team building**, this tour offers a fun and social way to experience Edmonton's legendary craft beer scene. It's also a fantastic choice for a more casual **date night** with a twist!",
    duration: "4 hours",
    distance: "10 km",
    difficulty: "Easy",
    price: 149,
    image: "https://images.unsplash.com/photo-1584225065152-4a1454aa3d4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    enabled: false,
    meetingLocation: {
      name: "Pedego Electric Bikes",
      address: "9918 82 Ave NW, Edmonton, AB T6E 1Y9"
    },
    gallery: [
      "https://images.unsplash.com/photo-1584225065152-4a1454aa3d4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571767491022-a2099247c19a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532634896-26909d0d4b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    routeMapUrl: "https://www.google.com/maps/d/embed?mid=1SKRWOIS3PULgFoHS0j5sefIdeknOE8k&ehbc=2E312F",
    itinerary: [
      { title: "Safety & Gear", description: "Quick briefing before we head into the brewery district." },
      { title: "First Pour", description: "Stop 1: A pioneer of the local craft scene with a flight of 4 tasters." },
      { title: "Mural Ride", description: "Check out the street art and murals between stops." },
      { title: "The Grand Finale", description: "Stop 3: A cozy taproom to wrap up the tour with a full pint of your choice." }
    ]
  }
];
