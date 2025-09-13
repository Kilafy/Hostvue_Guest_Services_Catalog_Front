'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { servicesApi, locationsApi, providersApi, ApiService, ApiLocation, ApiProvider } from '@/services/api';

interface MediaFormData {
  ownerType: string;
  ownerId: string;
  url: string;
  altText: string;
  mimeType: string;
  position: string;
}

interface OptionData {
  services: ApiService[];
  locations: ApiLocation[];
  providers: ApiProvider[];
}

export default function MediaForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [optionsData, setOptionsData] = useState<OptionData>({
    services: [],
    locations: [],
    providers: []
  });

  const initialFormData: MediaFormData = {
    ownerType: 'service',
    ownerId: '',
    url: '',
    altText: '',
    mimeType: 'image/jpeg',
    position: '0'
  };

  const [formData, setFormData] = useState<MediaFormData>(initialFormData);

  // Fetch data when owner type changes
  useEffect(() => {
    const fetchData = async () => {
      setIsDataLoading(true);
      try {
        const [services, locations, providers] = await Promise.all([
          servicesApi.getAllServices(),
          locationsApi.getAllLocations(),
          providersApi.getAllProviders()
        ]);
        
        setOptionsData({
          services,
          locations,
          providers
        });
      } catch (error) {
        console.error('Error fetching options data:', error);
        setMessage({ type: 'error', text: 'Failed to load data. Please refresh the page.' });
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: keyof MediaFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Reset ownerId when owner type changes
    if (field === 'ownerType') {
      setFormData(prev => ({
        ...prev,
        ownerId: ''
      }));
    }
  };

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 50): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Get display title for different owner types
  const getDisplayTitle = (item: ApiService | ApiLocation | ApiProvider): string => {
    if ('title' in item) {
      // Service
      return item.title;
    } else if ('city' in item) {
      // Location
      return `${item.city}, ${item.region}, ${item.country}`;
    } else {
      // Provider
      return item.companyName || item.legalName || `Provider ${item.id}`;
    }
  };

  // Get current options based on owner type
  const getCurrentOptions = () => {
    switch (formData.ownerType) {
      case 'service':
        return optionsData.services;
      case 'location':
        return optionsData.locations;
      case 'provider':
        return optionsData.providers;
      default:
        return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          position: parseInt(formData.position) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create media');
      }

      setMessage({ type: 'success', text: 'Media created successfully!' });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting media:', error);
      setMessage({ type: 'error', text: 'Failed to create media. Please try again.' });
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
            <Label htmlFor="ownerType" className="text-sm font-medium text-gray-700">Owner Type</Label>
            <Select value={formData.ownerType} onValueChange={(value: string) => handleInputChange('ownerType', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select owner type" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg border">
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="provider">Provider</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ownerId" className="text-sm font-medium text-gray-700">
              {formData.ownerType === 'service' && 'Service'}
              {formData.ownerType === 'provider' && 'Provider'}
              {formData.ownerType === 'location' && 'Location'}
              {formData.ownerType === 'category' && 'Category ID'}
            </Label>
            
            {formData.ownerType === 'category' ? (
              <Input
                id="ownerId"
                type="text"
                value={formData.ownerId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('ownerId', e.target.value)}
                required
                className="mt-1"
                placeholder="Enter category ID"
              />
            ) : (
              <Select 
                value={formData.ownerId} 
                onValueChange={(value: string) => handleInputChange('ownerId', value)}
                disabled={isDataLoading}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue 
                    placeholder={
                      isDataLoading 
                        ? "Loading..." 
                        : `Select ${formData.ownerType}`
                    } 
                  />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg border">
                  {getCurrentOptions().map((item) => {
                    const displayTitle = getDisplayTitle(item);
                    const truncatedTitle = truncateText(displayTitle, 50);
                    
                    return (
                      <SelectItem 
                        key={item.id} 
                        value={item.id}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        <span title={displayTitle} className="block">
                          {truncatedTitle}
                        </span>
                      </SelectItem>
                    );
                  })}
                  {getCurrentOptions().length === 0 && !isDataLoading && (
                    <div className="px-2 py-1.5 text-sm text-gray-500">
                      No {formData.ownerType}s available
                    </div>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="url" className="text-sm font-medium text-gray-700">Media URL</Label>
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('url', e.target.value)}
            required
            className="mt-1"
            placeholder="https://example.com/image.jpg"
          />
          
          {/* Image Preview */}
          {formData.url && formData.mimeType?.startsWith('image/') && (
            <div className="mt-4">
              <Label className="text-sm font-medium text-gray-700">Preview</Label>
              <div className="mt-2 flex justify-center">
                <div className="border rounded-lg p-4 bg-gray-50 max-w-md w-full">
                  <Image
                    src={formData.url}
                    alt={formData.altText || 'Media preview'}
                    width={400}
                    height={300}
                    className="max-w-full h-auto rounded-lg shadow-sm mx-auto object-cover"
                    style={{ maxHeight: '300px' }}
                    unoptimized={true}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex items-center justify-center h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                            <div class="text-center">
                              <svg class="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <p class="text-sm text-gray-500">Unable to load image</p>
                              <p class="text-xs text-gray-400 mt-1">Please check the URL</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="altText" className="text-sm font-medium text-gray-700">Alt Text</Label>
          <Textarea
            id="altText"
            value={formData.altText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('altText', e.target.value)}
            rows={3}
            className="mt-1"
            placeholder="Description of the image for accessibility"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mimeType" className="text-sm font-medium text-gray-700">MIME Type</Label>
            <Select value={formData.mimeType} onValueChange={(value: string) => handleInputChange('mimeType', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select MIME type" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg border">
                <SelectItem value="image/jpeg">JPEG Image</SelectItem>
                <SelectItem value="image/png">PNG Image</SelectItem>
                <SelectItem value="image/webp">WebP Image</SelectItem>
                <SelectItem value="image/gif">GIF Image</SelectItem>
                <SelectItem value="video/mp4">MP4 Video</SelectItem>
                <SelectItem value="video/webm">WebM Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="position" className="text-sm font-medium text-gray-700">Position</Label>
            <Input
              id="position"
              type="number"
              value={formData.position}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('position', e.target.value)}
              className="mt-1"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full text-white hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#D87441' }}
        >
          {isLoading ? 'Creating...' : 'Create Media'}
        </Button>
      </form>
    </div>
  );
}
