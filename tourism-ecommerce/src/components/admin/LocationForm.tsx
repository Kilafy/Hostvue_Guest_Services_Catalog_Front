'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
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
          <Label className="text-sm font-medium text-gray-700">Location Image (Optional)</Label>
          <div className="mt-1 space-y-4">
            {/* File Input */}
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Choose Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              {selectedImage && (
                <span className="text-sm text-gray-600">
                  {selectedImage.name}
                </span>
              )}
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative inline-block">
                <Image
                  src={imagePreview}
                  alt="Location preview"
                  width={192}
                  height={128}
                  className="object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={removeImage}
                  className="absolute top-2 right-2 h-6 w-6 p-0 bg-white/80 hover:bg-white"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            {/* No Image State */}
            {!imagePreview && (
              <div className="h-32 w-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-500">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No image selected</p>
                </div>
              </div>
            )}
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
