// Utility for API route configuration
export const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://guests-services.munnity.app/api';

// Common headers for API requests
export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Common CORS headers for responses
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Utility function to create API URL
export function createApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}

// Utility function to handle API errors
export function handleApiError(error: unknown, context: string) {
  console.error(`${context}:`, error);
  return new Response(
    JSON.stringify({ error: 'Internal server error' }),
    { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
    }
  );
}
