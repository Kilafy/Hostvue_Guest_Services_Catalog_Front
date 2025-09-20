'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { locationsApi } from '@/services/api';

interface LocationFormData {
  city: string;
  region: string;
  country: string;
  lat: string;
  lon: string;
  slug: string;
}

export default function LocationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const initialFormData: LocationFormData = {
    city: '',
    region: '',
    country: 'Colombia',
    lat: '',
    lon: '',
    slug: ''
  };

  const [formData, setFormData] = useState<LocationFormData>(initialFormData);

  const handleInputChange = (field: keyof LocationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const locationData = {
        city: formData.city,
        region: formData.region,
        country: formData.country,
        lat: parseFloat(formData.lat) || undefined,
        lon: parseFloat(formData.lon) || undefined,
        slug: formData.slug || undefined,
      };

      await locationsApi.createLocation(locationData);

      setMessage({ type: 'success', text: 'Location created successfully! Reloading page...' });
      
      // Wait a moment to show the success message, then reload
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error submitting location:', error);
      setMessage({ type: 'error', text: 'Failed to create location. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
            <Input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('city', e.target.value)}
              required
              className="mt-1"
              placeholder="Enter city"
            />
          </div>

          <div>
            <Label htmlFor="region" className="text-sm font-medium text-gray-700">Region/Department</Label>
            <Input
              id="region"
              type="text"
              value={formData.region}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('region', e.target.value)}
              required
              className="mt-1"
              placeholder="Enter region or department"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country</Label>
          <Input
            id="country"
            type="text"
            value={formData.country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('country', e.target.value)}
            required
            className="mt-1"
            placeholder="Enter country"
          />
        </div>

        <div>
          <Label htmlFor="slug" className="text-sm font-medium text-gray-700">Slug (optional)</Label>
          <Input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('slug', e.target.value)}
            className="mt-1"
            placeholder="location-slug"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="lat" className="text-sm font-medium text-gray-700">Latitude</Label>
            <Input
              id="lat"
              type="number"
              step="any"
              value={formData.lat}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('lat', e.target.value)}
              className="mt-1"
              placeholder="e.g., 4.7110"
            />
          </div>

          <div>
            <Label htmlFor="lon" className="text-sm font-medium text-gray-700">Longitude</Label>
            <Input
              id="lon"
              type="number"
              step="any"
              value={formData.lon}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('lon', e.target.value)}
              className="mt-1"
              placeholder="e.g., -74.0721"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full text-white hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#D87441' }}
        >
          {isLoading ? 'Creating...' : 'Create Location'}
        </Button>
      </form>
    </div>
  );
}
