// API configuration utility
export const API_CONFIG = {
  // Use environment variable for API base URL, with fallback
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://guests-services.munnity.app/api',
  
  // API endpoints (relative paths)
  ENDPOINTS: {
    SERVICES: '/services',
    LOCATIONS: '/locations', 
    CATEGORIES: '/categories',
    PROVIDERS: '/providers',
    // Note: Media endpoints have been removed from the backend API
  }
};

// Utility function to get full API URL
export function getApiUrl(endpoint: string, id?: string): string {
  const baseUrl = API_CONFIG.BASE_URL;
  const fullEndpoint = id ? `${endpoint}/${id}` : endpoint;
  return `${baseUrl}${fullEndpoint}`;
}

// API fetch wrapper with error handling
export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(endpoint, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}
