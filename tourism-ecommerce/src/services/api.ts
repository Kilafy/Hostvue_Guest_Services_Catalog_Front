// API Base Configuration
const API_BASE_URL = 'https://guests-services.munnity.app/api';

// API Response Types based on the updated Swagger documentation
export interface ApiService {
  id: string;
  providerId: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  durationMinutes?: number;
  languageOffered?: string[];
  maxCapacity?: number;
  minCapacity?: number;
  status?: string;
  imageUrl?: string; // Image URL is now included directly in the service
  createdAt: number[]; // [year, month, day, hour, minute, second, nanoseconds]
  updatedAt?: number[];
}

export interface ApiCategory {
  id: string;
  name: string;
  parentId?: string;
  slug?: string;
  createdAt: number[];
}

export interface ApiLocation {
  id: string;
  country: string;
  region: string;
  city: string;
  lat?: number;
  lon?: number;
  slug?: string;
  imageUrl?: string; // Image URL is now included directly in the location
  createdAt: number[];
}

export interface ApiMedia {
  id: string;
  ownerType: string;
  ownerId: string;
  url: string;
  altText?: string;
  mimeType?: string;
  position?: number;
  createdAt: number[];
}

export interface ApiProvider {
  id: string;
  userId: string;
  companyName?: string;
  legalName?: string;
  vatNumber?: string;
  description?: string;
  verified?: boolean;
  createdAt: number[];
  updatedAt?: number[];
}

// HTTP Client with error handling
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage += ` - ${errorData.message}`;
          }
        } catch {
          // If we can't parse error response, use the status text
        }
        
        console.warn(`API request failed for ${endpoint}:`, errorMessage);
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.warn(`API request failed for ${endpoint}:`, error.message);
      } else {
        console.warn(`API request failed for ${endpoint}:`, error);
      }
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string): Promise<void> {
    await this.request<void>(endpoint, { method: 'DELETE' });
  }
}

// Initialize API client
const apiClient = new ApiClient(API_BASE_URL);

// Service API functions
export const servicesApi = {
  // Get all services
  getAllServices: (): Promise<ApiService[]> =>
    apiClient.get<ApiService[]>('/services'),

  // Get service by ID
  getServiceById: (id: string): Promise<ApiService> =>
    apiClient.get<ApiService>(`/services/${id}`),

  // Get services by provider
  getServicesByProvider: (providerId: string): Promise<ApiService[]> =>
    apiClient.get<ApiService[]>(`/services/provider/${providerId}`),

  // Get services by status
  getServicesByStatus: (status: string): Promise<ApiService[]> =>
    apiClient.get<ApiService[]>(`/services/status/${status}`),

  // Search services by title
  searchServices: (title: string): Promise<ApiService[]> =>
    apiClient.get<ApiService[]>(`/services/search?title=${encodeURIComponent(title)}`),

  // Create new service
  createService: (service: Omit<ApiService, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiService> =>
    apiClient.post<ApiService>('/services', service),

  // Update service
  updateService: (id: string, service: Partial<ApiService>): Promise<ApiService> =>
    apiClient.put<ApiService>(`/services/${id}`, service),

  // Delete service
  deleteService: (id: string): Promise<void> =>
    apiClient.delete(`/services/${id}`),
};

// Categories API functions
export const categoriesApi = {
  // Get all categories
  getAllCategories: (): Promise<ApiCategory[]> =>
    apiClient.get<ApiCategory[]>('/categories'),

  // Get category by ID
  getCategoryById: (id: string): Promise<ApiCategory> =>
    apiClient.get<ApiCategory>(`/categories/${id}`),

  // Get category by slug
  getCategoryBySlug: (slug: string): Promise<ApiCategory> =>
    apiClient.get<ApiCategory>(`/categories/slug/${slug}`),

  // Search categories by name
  searchCategories: (name: string): Promise<ApiCategory[]> =>
    apiClient.get<ApiCategory[]>(`/categories/search?name=${encodeURIComponent(name)}`),

  // Create new category
  createCategory: (category: Omit<ApiCategory, 'id' | 'createdAt'>): Promise<ApiCategory> =>
    apiClient.post<ApiCategory>('/categories', category),

  // Update category
  updateCategory: (id: string, category: Partial<ApiCategory>): Promise<ApiCategory> =>
    apiClient.put<ApiCategory>(`/categories/${id}`, category),

  // Delete category
  deleteCategory: (id: string): Promise<void> =>
    apiClient.delete(`/categories/${id}`),
};

// Locations API functions
export const locationsApi = {
  // Get all locations
  getAllLocations: (): Promise<ApiLocation[]> =>
    apiClient.get<ApiLocation[]>('/locations'),

  // Get location by ID
  getLocationById: (id: string): Promise<ApiLocation> =>
    apiClient.get<ApiLocation>(`/locations/${id}`),

  // Get location by slug
  getLocationBySlug: (slug: string): Promise<ApiLocation> =>
    apiClient.get<ApiLocation>(`/locations/slug/${slug}`),

  // Get locations by region
  getLocationsByRegion: (region: string): Promise<ApiLocation[]> =>
    apiClient.get<ApiLocation[]>(`/locations/region/${region}`),

  // Search locations
  searchLocations: (country: string, region: string, city: string): Promise<ApiLocation[]> =>
    apiClient.get<ApiLocation[]>(`/locations/search?country=${country}&region=${region}&city=${city}`),

  // Create new location
  createLocation: (location: Omit<ApiLocation, 'id' | 'createdAt'>): Promise<ApiLocation> =>
    apiClient.post<ApiLocation>('/locations', location),

  // Update location
  updateLocation: (id: string, location: Partial<ApiLocation>): Promise<ApiLocation> =>
    apiClient.put<ApiLocation>(`/locations/${id}`, location),

  // Delete location
  deleteLocation: (id: string): Promise<void> =>
    apiClient.delete(`/locations/${id}`),
};

// Providers API functions
export const providersApi = {
  // Get all providers
  getAllProviders: (): Promise<ApiProvider[]> =>
    apiClient.get<ApiProvider[]>('/providers'),

  // Get provider by ID
  getProviderById: (id: string): Promise<ApiProvider> =>
    apiClient.get<ApiProvider>(`/providers/${id}`),

  // Get providers by user ID
  getProvidersByUserId: (userId: string): Promise<ApiProvider[]> =>
    apiClient.get<ApiProvider[]>(`/providers/user/${userId}`),

  // Get providers by verification status
  getProvidersByVerified: (verified: boolean): Promise<ApiProvider[]> =>
    apiClient.get<ApiProvider[]>(`/providers/verified/${verified}`),

  // Search providers by company name
  searchProviders: (companyName: string): Promise<ApiProvider[]> =>
    apiClient.get<ApiProvider[]>(`/providers/search?companyName=${encodeURIComponent(companyName)}`),

  // Create new provider
  createProvider: (provider: Omit<ApiProvider, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiProvider> =>
    apiClient.post<ApiProvider>('/providers', provider),

  // Update provider
  updateProvider: (id: string, provider: Partial<ApiProvider>): Promise<ApiProvider> =>
    apiClient.put<ApiProvider>(`/providers/${id}`, provider),

  // Delete provider
  deleteProvider: (id: string): Promise<void> =>
    apiClient.delete(`/providers/${id}`),
};

// Helper function to parse API date arrays to Date objects
export const parseApiDate = (dateArray: number[]): Date => {
  const [year, month, day, hour = 0, minute = 0, second = 0, nano = 0] = dateArray;
  return new Date(year, month - 1, day, hour, minute, second, Math.floor(nano / 1000000));
};

// Helper function to format duration from minutes
export const formatDuration = (minutes?: number): string => {
  if (!minutes) return '1 hour';
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return `${hours}h ${remainingMinutes}m`;
};
