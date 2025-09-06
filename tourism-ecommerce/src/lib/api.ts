// API configuration utility
export const API_CONFIG = {
  // Use internal API routes in production (Vercel), direct backend in development
  BASE_URL: process.env.NODE_ENV === 'production' ? '' : 'http://kilafy-backed.us-east-1.elasticbeanstalk.com',
  
  // API endpoints
  ENDPOINTS: {
    SERVICES: '/api/services',
    LOCATIONS: '/api/locations', 
    CATEGORIES: '/api/categories',
    PROVIDERS: '/api/providers',
    MEDIA: '/api/media',
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
