export interface TourismService {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  duration: string;
  rating: number;
  reviewCount: number;
  category: ServiceCategory;
  city: string;
  country: string;
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
}

export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  serviceCount: number;
  popularServices: string[];
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
