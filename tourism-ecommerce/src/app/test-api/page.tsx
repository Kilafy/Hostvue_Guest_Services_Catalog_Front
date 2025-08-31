"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { servicesApi, categoriesApi, locationsApi, mediaApi } from '@/services/api';

export default function TestApiPage() {
  const [apiStatus, setApiStatus] = useState<{
    services: string;
    categories: string;
    locations: string;
    media: string;
  }>({
    services: 'Loading...',
    categories: 'Loading...',
    locations: 'Loading...',
    media: 'Loading...'
  });

  useEffect(() => {
    const testEndpoints = async () => {
      // Test services endpoint
      try {
        const services = await servicesApi.getAllServices();
        setApiStatus(prev => ({ 
          ...prev, 
          services: `✅ Success: ${services.length} services loaded` 
        }));
      } catch (error) {
        setApiStatus(prev => ({ 
          ...prev, 
          services: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }));
      }

      // Test categories endpoint
      try {
        const categories = await categoriesApi.getAllCategories();
        setApiStatus(prev => ({ 
          ...prev, 
          categories: `✅ Success: ${categories.length} categories loaded` 
        }));
      } catch (error) {
        setApiStatus(prev => ({ 
          ...prev, 
          categories: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }));
      }

      // Test locations endpoint
      try {
        const locations = await locationsApi.getAllLocations();
        setApiStatus(prev => ({ 
          ...prev, 
          locations: `✅ Success: ${locations.length} locations loaded` 
        }));
      } catch (error) {
        setApiStatus(prev => ({ 
          ...prev, 
          locations: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }));
      }

      // Test media endpoint
      try {
        const media = await mediaApi.getAllMedia();
        setApiStatus(prev => ({ 
          ...prev, 
          media: `✅ Success: ${media.length} media items loaded` 
        }));
      } catch (error) {
        setApiStatus(prev => ({ 
          ...prev, 
          media: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }));
      }
    };

    testEndpoints();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Integration Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Endpoint Status</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium">Services Endpoint</h3>
              <p className="text-gray-600">{apiStatus.services}</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium">Categories Endpoint</h3>
              <p className="text-gray-600">{apiStatus.categories}</p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-medium">Locations Endpoint</h3>
              <p className="text-gray-600">{apiStatus.locations}</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-medium">Media Endpoint</h3>
              <p className="text-gray-600">{apiStatus.media}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">API Integration Summary</h2>
          <div className="prose max-w-none">
            <p>This page tests the integration with the Kilafy backend API. The frontend now:</p>
            <ul>
              <li>✅ Connects to the real API endpoints</li>
              <li>✅ Combines API data with existing mock data structure</li>
              <li>✅ Handles loading states and errors gracefully</li>
              <li>✅ Maintains the existing UI and user experience</li>
              <li>✅ Uses TypeScript for type safety</li>
            </ul>
            
            <p className="mt-4">
              <strong>API Base URL:</strong> http://kilafy-backed.us-east-1.elasticbeanstalk.com
            </p>
            
            <p>
              Navigate to the <Link href="/" className="text-blue-600 hover:underline">Homepage</Link> or{' '}
              <Link href="/services" className="text-blue-600 hover:underline">Services page</Link> to see the integration in action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
