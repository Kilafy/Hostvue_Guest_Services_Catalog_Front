export interface TourismService {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  fullDescription?: string; // Added for dataService compatibility
  featured?: boolean; // Added for dataService compatibility
  price: number;
  originalPrice?: number;
  currency: string;
  duration: string;
  rating: number;
  reviewCount: number;
  category: ServiceCategory | null; // Category can be null if not found
  city: string;
  country: string;
  location?: {
    latitude: number;
    longitude: number;
  }; // Added for dataService compatibility
  imageUrl: string;
  imageGallery: string[];
  features: string[];
  includes: string[];
  excludes: string[];
  meetingPoint: string;
  availability: string[];
  difficulty?: 'easy' | 'moderate' | 'challenging';
  groupSize: {
    min: number;
    max: number;
  };
  maxGuests?: number; // Added for dataService compatibility
  minGuests?: number; // Added for dataService compatibility
  languages: string[];
  cancellationPolicy: string;
  tags: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  serviceCount?: number; // Added for dataService compatibility
}

export interface City {
  id: string;
  name: string;
  country: string;
  region?: string; // Added for dataService compatibility
  description: string;
  imageUrl: string;
  serviceCount: number;
  popularServices: string[];
  latitude?: number; // Added for dataService compatibility
  longitude?: number; // Added for dataService compatibility
}

export interface Review {
  id: string;
  serviceId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface BookingRequest {
  serviceId: string;
  date: string;
  participants: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
}

export interface SearchFilters {
  category?: string;
  city?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  duration?: string;
  rating?: number;
  difficulty?: string;
  features?: string[];
}
