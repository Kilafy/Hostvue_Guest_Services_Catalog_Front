'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LocationFormData {
  name: string;
  city: string;
  region: string;
  country: string;
  lat: string;
  lon: string;
}

export default function LocationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const initialFormData: LocationFormData = {
    name: '',
    city: '',
    region: '',
    country: 'Colombia',
    lat: '',
    lon: ''
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
      const response = await fetch('http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          city: formData.city,
          region: formData.region,
          country: formData.country,
          lat: parseFloat(formData.lat) || undefined,
          lon: parseFloat(formData.lon) || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create location');
      }

      setMessage({ type: 'success', text: 'Location created successfully!' });
      setFormData(initialFormData);
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
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">Location Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
            required
            className="mt-1"
            placeholder="Enter location name"
          />
        </div>

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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? 'Creating...' : 'Create Location'}
        </Button>
      </form>
    </div>
  );
}
