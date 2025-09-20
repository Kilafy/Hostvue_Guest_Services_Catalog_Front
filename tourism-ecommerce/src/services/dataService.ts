import { TourismService, ServiceCategory, City } from '@/types/tourism';
import { 
  servicesApi, 
  categoriesApi, 
  locationsApi, 
  providersApi,
  ApiService,
  ApiCategory,
  ApiLocation,
  ApiProvider,
  formatDuration
} from './api';

// Default images for different categories
const DEFAULT_IMAGES = {
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
  tour: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
  activity: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
  default: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
};

// Category icons mapping
const CATEGORY_ICONS = {
  'restaurant-services': '🍽️',
  'restaurants-dining': '🍽️', 
  'spa-services': '🧘‍♀️',
  'direct-test': '🔧',
  'test-provider-category': '🧪',
  default: '🌟'
};

// Category colors mapping
const CATEGORY_COLORS = {
  'restaurant-services': '#FF6B6B',
  'restaurants-dining': '#FF6B6B',
  'spa-services': '#4ECDC4', 
  'direct-test': '#45B7D1',
  'test-provider-category': '#96CEB4',
  default: '#DDA0DD'
};

// Mapping functions to convert API data to frontend types
const mapApiCategoryToServiceCategory = (apiCategory: ApiCategory): ServiceCategory => {
  const slug = apiCategory.slug || apiCategory.name.toLowerCase().replace(/\s+/g, '-');
  return {
    id: apiCategory.id,
    name: apiCategory.name,
    slug,
    icon: CATEGORY_ICONS[slug as keyof typeof CATEGORY_ICONS] || CATEGORY_ICONS.default,
    color: CATEGORY_COLORS[slug as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.default,
    description: `Explore ${apiCategory.name.toLowerCase()}`,
    serviceCount: 0 // Will be updated when we have services
  };
};

const mapApiLocationToCity = (apiLocation: ApiLocation): City => ({
  id: apiLocation.id,
  name: apiLocation.city,
  country: apiLocation.country,
  region: apiLocation.region,
  latitude: apiLocation.lat || 0,
  longitude: apiLocation.lon || 0,
  imageUrl: apiLocation.imageUrl || DEFAULT_IMAGES.tour, // Use location's imageUrl or default
  serviceCount: 0, // Will be populated when counting services
  description: `Discover ${apiLocation.city} in ${apiLocation.country}`,
  popularServices: [] // Will be populated when getting services
});

// Helper function to get default image for service
const getDefaultImageForService = (): string => {
  // Return a default image
  return DEFAULT_IMAGES.tour;
};

const mapApiServiceToTourismService = (
  apiService: ApiService
): TourismService => {
  // Use the imageUrl from the service directly, or fallback to default
  const imageUrl = apiService.imageUrl || getDefaultImageForService();
  const imageGallery = apiService.imageUrl ? [apiService.imageUrl] : [];

  // Create a mock category if we can't find one
  const category: ServiceCategory = {
    id: 'unknown',
    name: 'General Services',
    slug: 'general-services',
    icon: '🌟',
    color: '#DDA0DD',
    description: 'Various services',
    serviceCount: 0
  };

  return {
    id: apiService.id,
    title: apiService.title,
    description: apiService.shortDescription || apiService.longDescription || 'No description available',
    shortDescription: apiService.shortDescription || 'No short description available',
    fullDescription: apiService.longDescription || apiService.shortDescription || 'No detailed description available',
    price: Math.floor(Math.random() * 200) + 50, // Random price since not in API
    currency: 'USD',
    duration: formatDuration(apiService.durationMinutes),
    maxGuests: apiService.maxCapacity || 8,
    minGuests: apiService.minCapacity || 1,
    rating: 8.5 + Math.random() * 1.5, // Random rating since not in API
    reviewCount: Math.floor(Math.random() * 500) + 50, // Random review count
    imageUrl,
    imageGallery,
    category,
    location: {
      latitude: 0, // Default since service doesn't have location in current API
      longitude: 0
    },
    city: 'General', // Default since service doesn't have city in current API
    country: 'Various',
    languages: apiService.languageOffered || ['English'],
    groupSize: {
      min: apiService.minCapacity || 1,
      max: apiService.maxCapacity || 8
    },
    features: [
      'Professional service',
      'Quality guaranteed',
      'Customer support'
    ],
    includes: [
      'Service as described',
      'Professional guidance'
    ],
    excludes: [
      'Personal expenses',
      'Tips and gratuities'
    ],
    availability: ['09:00', '14:00', '18:00'],
    meetingPoint: 'To be confirmed',
    cancellationPolicy: 'Free cancellation up to 24 hours before the activity',
    tags: [apiService.status || 'active'],
    featured: Math.random() > 0.7 // Random featured status
  };
};

// DataService class - handles all data operations with API only
class DataService {
  // Cache for frequently accessed data
  private categoriesCache: ServiceCategory[] | null = null;
  private locationsCache: City[] | null = null;
  private providersCache: ApiProvider[] | null = null;

  async getCategories(): Promise<ServiceCategory[]> {
    if (this.categoriesCache) {
      return this.categoriesCache;
    }

    try {
      const apiCategories = await categoriesApi.getAllCategories();
      this.categoriesCache = apiCategories.map(mapApiCategoryToServiceCategory);
      return this.categoriesCache;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw new Error('Unable to load categories');
    }
  }

  async getCategoryById(id: string): Promise<ServiceCategory | undefined> {
    try {
      const apiCategory = await categoriesApi.getCategoryById(id);
      return mapApiCategoryToServiceCategory(apiCategory);
    } catch (error) {
      console.error('Failed to fetch category by ID:', error);
      return undefined;
    }
  }

  async getCategoryBySlug(slug: string): Promise<ServiceCategory | undefined> {
    try {
      const apiCategory = await categoriesApi.getCategoryBySlug(slug);
      return mapApiCategoryToServiceCategory(apiCategory);
    } catch (error) {
      console.error('Failed to fetch category by slug:', error);
      return undefined;
    }
  }

  async getCities(): Promise<City[]> {
    if (this.locationsCache) {
      return this.locationsCache;
    }

    try {
      const apiLocations = await locationsApi.getAllLocations();
      this.locationsCache = apiLocations.map(mapApiLocationToCity);
      return this.locationsCache;
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      throw new Error('Unable to load cities');
    }
  }

  private async getProviders(): Promise<ApiProvider[]> {
    if (this.providersCache) {
      return this.providersCache;
    }

    try {
      this.providersCache = await providersApi.getAllProviders();
      return this.providersCache;
    } catch (error) {
      console.error('Failed to fetch providers:', error);
      return [];
    }
  }

  async getAllServices(): Promise<TourismService[]> {
    try {
      const apiServices = await servicesApi.getAllServices();

      const services = apiServices.map(service => 
        mapApiServiceToTourismService(service)
      );

      return services;
    } catch (error) {
      console.error('Failed to fetch services:', error);
      throw new Error('Unable to load services');
    }
  }

  async getServicesByProvider(providerId: string): Promise<TourismService[]> {
    try {
      const apiServices = await servicesApi.getServicesByProvider(providerId);

      return apiServices.map(service => 
        mapApiServiceToTourismService(service)
      );
    } catch (error) {
      console.error('Failed to fetch services by provider:', error);
      return [];
    }
  }

  async searchServices(query: string): Promise<TourismService[]> {
    try {
      const apiServices = await servicesApi.searchServices(query);

      return apiServices.map(service => 
        mapApiServiceToTourismService(service)
      );
    } catch (error) {
      console.error('Failed to search services:', error);
      return [];
    }
  }

  async getFeaturedServices(): Promise<TourismService[]> {
    try {
      const allServices = await this.getAllServices();
      // Return featured services or first 6 if none are specifically featured
      const featuredServices = allServices.filter(service => service.featured);
      return featuredServices.length > 0 ? featuredServices.slice(0, 6) : allServices.slice(0, 6);
    } catch (error) {
      console.error('Failed to fetch featured services:', error);
      throw new Error('Unable to load featured services');
    }
  }

  async getPopularDestinations(): Promise<City[]> {
    try {
      const cities = await this.getCities();
      // Return first 4 cities as popular destinations
      return cities.slice(0, 4);
    } catch (error) {
      console.error('Failed to fetch popular destinations:', error);
      throw new Error('Unable to load popular destinations');
    }
  }

  // Helper method to update service counts
  private updateServiceCounts(services: TourismService[], categories: ServiceCategory[], cities: City[]) {
    // Update category service counts
    categories.forEach(category => {
      category.serviceCount = services.filter(service => service.category.id === category.id).length;
    });

    // Update city service counts
    cities.forEach(city => {
      city.serviceCount = services.filter(service => service.city === city.name).length;
    });
  }

  // Combined data methods for pages
  async getHomepageData() {
    try {
      const [featuredServices, categories, popularDestinations] = await Promise.all([
        this.getFeaturedServices(),
        this.getCategories(),
        this.getPopularDestinations(),
      ]);

      return {
        featuredServices,
        categories,
        popularDestinations,
      };
    } catch (error) {
      console.error('Failed to fetch homepage data:', error);
      throw new Error('Unable to load homepage data');
    }
  }

  async getServicesPageData() {
    try {
      const [services, categories, cities] = await Promise.all([
        this.getAllServices(),
        this.getCategories(),
        this.getCities(),
      ]);

      return {
        services,
        categories,
        cities,
      };
    } catch (error) {
      console.error('Failed to fetch services page data:', error);
      throw new Error('Unable to load services page data');
    }
  }

  async getServicesByCategory(categoryId: string): Promise<TourismService[]> {
    try {
      // Since the API doesn't have category filtering, get all services and filter client-side
      const allServices = await this.getAllServices();
      return allServices.filter(service => service.category.id === categoryId);
    } catch (error) {
      console.error('Failed to fetch services by category:', error);
      return [];
    }
  }
}

// Export singleton instance
export const dataService = new DataService();
