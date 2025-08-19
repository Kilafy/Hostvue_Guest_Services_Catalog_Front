import { TourismService, ServiceCategory, City } from '@/types/tourism';

export const categories: ServiceCategory[] = [
  {
    id: 'cultural',
    name: 'Cultural Tours',
    slug: 'cultural',
    description: 'Explore history, museums, and local culture',
    icon: '🏛️',
    color: '#7C3AED'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    slug: 'adventure',
    description: 'Thrilling outdoor activities and sports',
    icon: '🏔️',
    color: '#DC2626'
  },
  {
    id: 'food',
    name: 'Food & Drink',
    slug: 'food',
    description: 'Culinary experiences and tastings',
    icon: '🍷',
    color: '#F59E0B'
  },
  {
    id: 'nature',
    name: 'Nature & Wildlife',
    slug: 'nature',
    description: 'Natural parks, wildlife, and landscapes',
    icon: '🌿',
    color: '#059669'
  },
  {
    id: 'water',
    name: 'Water Activities',
    slug: 'water',
    description: 'Beach, sailing, diving, and water sports',
    icon: '🌊',
    color: '#0EA5E9'
  },
  {
    id: 'transport',
    name: 'Transportation',
    slug: 'transport',
    description: 'Transfers, day trips, and transportation',
    icon: '🚌',
    color: '#6B7280'
  }
];

export const cities: City[] = [
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    description: 'The Eternal City with ancient history and culture',
    imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
    serviceCount: 112,
    popularServices: ['colosseum-tour', 'vatican-tour', 'food-tour-rome']
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light with art, culture, and romance',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    serviceCount: 122,
    popularServices: ['eiffel-tower-tour', 'louvre-tour', 'seine-cruise']
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Vibrant city with unique architecture and beaches',
    imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
    serviceCount: 153,
    popularServices: ['sagrada-familia-tour', 'park-guell-tour', 'flamenco-show']
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    description: 'Charming canals, museums, and cycling culture',
    imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
    serviceCount: 89,
    popularServices: ['canal-cruise', 'bike-tour', 'anne-frank-house']
  }
];

export const tourismServices: TourismService[] = [
  {
    id: 'colosseum-tour',
    title: 'Guided Tour of Colosseum, Roman Forum & Palatine Hill',
    description: 'Discover the glory of the Roman Empire on this guided tour of the Colosseum, Roman Forum, and Palatine Hill. Walk through 2000 years of history with skip-the-line access and expert commentary in Spanish.',
    shortDescription: 'Skip-the-line guided tour of ancient Rome\'s most iconic sites',
    price: 69.92,
    originalPrice: 84.25,
    currency: 'USD',
    duration: '3 hours',
    rating: 9.2,
    reviewCount: 39406,
    category: categories[0], // Cultural
    city: 'Rome',
    country: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=800&q=80',
      'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&q=80'
    ],
    features: ['Skip-the-line access', 'Expert guide', 'Small groups', 'Audio headsets'],
    includes: ['Professional guide', 'Skip-the-line tickets', 'Audio headsets', 'Group size max 25 people'],
    excludes: ['Hotel pickup', 'Food and drinks', 'Gratuities'],
    meetingPoint: 'Metro Colosseo exit - Via del Colosseo',
    availability: ['Daily', '9:00 AM', '2:00 PM', '4:00 PM'],
    difficulty: 'moderate',
    groupSize: { min: 1, max: 25 },
    languages: ['English', 'Spanish', 'Italian'],
    cancellationPolicy: 'Free cancellation up to 24 hours before',
    tags: ['History', 'Architecture', 'Ancient Rome', 'Skip-the-line']
  },
  {
    id: 'sagrada-familia-tour',
    title: 'Sagrada Familia Guided Tour with Tower Access',
    description: 'Explore Gaudí\'s masterpiece with a guided tour of the Sagrada Familia. Learn about its unique architecture and symbolism while enjoying panoramic views from one of its towers.',
    shortDescription: 'Guided tour of Gaudí\'s architectural masterpiece with tower access',
    price: 45.00,
    currency: 'USD',
    duration: '1.5 hours',
    rating: 9.4,
    reviewCount: 28543,
    category: categories[0], // Cultural
    city: 'Barcelona',
    country: 'Spain',
    imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
      'https://images.unsplash.com/photo-1589737830634-2f4b2fb67bb3?w=800&q=80'
    ],
    features: ['Tower access', 'Fast-track entry', 'Audio guide', 'Expert guide'],
    includes: ['Entrance ticket', 'Tower access', 'Professional guide', 'Audio guide system'],
    excludes: ['Hotel pickup', 'Food and drinks'],
    meetingPoint: 'Carrer de Mallorca, 401 - Sagrada Familia main entrance',
    availability: ['Daily', '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
    difficulty: 'easy',
    groupSize: { min: 1, max: 20 },
    languages: ['English', 'Spanish', 'French', 'German'],
    cancellationPolicy: 'Free cancellation up to 24 hours before',
    tags: ['Architecture', 'Gaudí', 'Religion', 'Barcelona']
  },
  {
    id: 'seine-cruise',
    title: 'Seine River Panoramic Cruise',
    description: 'See Paris from a unique perspective on this panoramic boat cruise along the Seine River. Admire iconic landmarks like Notre-Dame, the Louvre, and the Eiffel Tower from the water.',
    shortDescription: 'Scenic boat cruise along the Seine with panoramic views',
    price: 19.89,
    originalPrice: 22.23,
    currency: 'USD',
    duration: '1 hour',
    rating: 8.4,
    reviewCount: 11607,
    category: categories[4], // Water
    city: 'Paris',
    country: 'France',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80'
    ],
    features: ['Panoramic boat', 'Audio commentary', 'Indoor/outdoor decks', 'Photo opportunities'],
    includes: ['1-hour cruise', 'Audio commentary in 14 languages', 'Indoor and outdoor decks'],
    excludes: ['Hotel pickup', 'Food and drinks', 'Gratuities'],
    meetingPoint: 'Port de la Bourdonnais - Near Eiffel Tower',
    availability: ['Daily', 'Every 30 minutes', '10:00 AM - 10:30 PM'],
    difficulty: 'easy',
    groupSize: { min: 1, max: 200 },
    languages: ['English', 'French', 'Spanish', 'German', 'Italian', 'Portuguese'],
    cancellationPolicy: 'Free cancellation up to 1 hour before',
    tags: ['Sightseeing', 'River cruise', 'Paris landmarks', 'Photography']
  },
  {
    id: 'canal-cruise',
    title: 'Amsterdam Canal Cruise with Audio Guide',
    description: 'Discover Amsterdam\'s famous canals on this relaxing boat tour. Learn about the city\'s Golden Age history while gliding past historic merchants\' houses and iconic bridges.',
    shortDescription: 'Relaxing canal cruise through Amsterdam\'s historic waterways',
    price: 18.50,
    currency: 'USD',
    duration: '1 hour',
    rating: 8.7,
    reviewCount: 15432,
    category: categories[4], // Water
    city: 'Amsterdam',
    country: 'Netherlands',
    imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
      'https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?w=800&q=80'
    ],
    features: ['Glass-topped boat', 'Audio guide', 'Historic route', 'Photo stops'],
    includes: ['1-hour canal cruise', 'Audio guide in 19 languages', 'Onboard commentary'],
    excludes: ['Hotel pickup', 'Food and drinks'],
    meetingPoint: 'Prins Hendrikkade 25 - Central Station area',
    availability: ['Daily', 'Every 15 minutes', '9:00 AM - 10:00 PM'],
    difficulty: 'easy',
    groupSize: { min: 1, max: 100 },
    languages: ['English', 'Dutch', 'French', 'German', 'Spanish', 'Italian'],
    cancellationPolicy: 'Free cancellation up to 24 hours before',
    tags: ['Canal cruise', 'Golden Age', 'Architecture', 'History']
  },
  {
    id: 'tuscany-wine-tour',
    title: 'Tuscany Wine Tasting Tour from Florence',
    description: 'Escape to the Tuscan countryside for a full-day wine tasting experience. Visit traditional wineries, enjoy local cuisine, and learn about wine production in the heart of Chianti.',
    shortDescription: 'Full-day wine tasting tour in the Tuscan countryside',
    price: 89.00,
    currency: 'USD',
    duration: '8 hours',
    rating: 9.1,
    reviewCount: 5234,
    category: categories[2], // Food
    city: 'Florence',
    country: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=800&q=80',
      'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'
    ],
    features: ['Small group tour', 'Wine tastings', 'Local lunch', 'Scenic drive'],
    includes: ['Transportation from Florence', '3 winery visits', 'Wine tastings', 'Traditional lunch', 'Professional guide'],
    excludes: ['Hotel pickup', 'Additional drinks', 'Gratuities'],
    meetingPoint: 'Piazzale Montelungo - Near Santa Maria Novella Station',
    availability: ['Tuesday', 'Thursday', 'Saturday', '8:30 AM'],
    difficulty: 'easy',
    groupSize: { min: 4, max: 16 },
    languages: ['English', 'Italian'],
    cancellationPolicy: 'Free cancellation up to 48 hours before',
    tags: ['Wine tasting', 'Countryside', 'Food tour', 'Chianti']
  },
  {
    id: 'hiking-montserrat',
    title: 'Montserrat Hiking & Monastery Tour',
    description: 'Combine spirituality and adventure on this hiking tour to Montserrat. Explore the monastery, hike scenic trails with breathtaking views, and learn about Catalan culture.',
    shortDescription: 'Hiking adventure to Montserrat monastery with scenic trails',
    price: 65.00,
    currency: 'USD',
    duration: '6 hours',
    rating: 8.9,
    reviewCount: 3421,
    category: categories[1], // Adventure
    city: 'Barcelona',
    country: 'Spain',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800&q=80',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80'
    ],
    features: ['Hiking trails', 'Monastery visit', 'Scenic views', 'Small groups'],
    includes: ['Round-trip transportation', 'Professional hiking guide', 'Monastery entrance', 'Hiking equipment'],
    excludes: ['Lunch', 'Drinks', 'Cable car (optional)'],
    meetingPoint: 'Plaça Catalunya - Tourist Bus stop',
    availability: ['Wednesday', 'Friday', 'Sunday', '8:00 AM'],
    difficulty: 'moderate',
    groupSize: { min: 6, max: 12 },
    languages: ['English', 'Spanish', 'Catalan'],
    cancellationPolicy: 'Free cancellation up to 48 hours before',
    tags: ['Hiking', 'Nature', 'Monastery', 'Adventure']
  }
];

export const featuredServices = tourismServices.slice(0, 3);
export const popularDestinations = cities.slice(0, 4);
