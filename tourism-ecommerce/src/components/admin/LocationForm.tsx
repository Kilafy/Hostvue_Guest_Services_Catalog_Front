'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

      await locationsApi.createLocationWithImage(locationData, selectedImage || undefined);

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

        {/* Image Upload Section */}
        <div>
          <Label htmlFor="image">Location Image</Label>
          <div className="mt-2">
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={imagePreview}
                  alt="Location preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">
                  Click to upload location image<br />
                  <span className="text-xs text-gray-400">PNG, JPG up to 10MB</span>
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
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
