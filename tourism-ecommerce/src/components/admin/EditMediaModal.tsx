'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ModalActions } from '@/components/ui/modal-actions';
import { ApiMedia, servicesApi, locationsApi, providersApi, ApiService, ApiLocation, ApiProvider } from '@/services/api';
import { useErrorHandler, useSuccessHandler } from '@/components/ui/toast';

interface OptionData {
  services: ApiService[];
  locations: ApiLocation[];
  providers: ApiProvider[];
}

interface EditMediaModalProps {
  media: ApiMedia & { ownerTitle?: string };
  onClose: () => void;
  onUpdate: () => void;
}

export const EditMediaModal: React.FC<EditMediaModalProps> = ({
  media,
  onClose,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    ownerType: '',
    ownerId: '',
    url: '',
    altText: '',
    mimeType: '',
    position: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [optionsData, setOptionsData] = useState<OptionData>({
    services: [],
    locations: [],
    providers: []
  });
  const { handleApiError } = useErrorHandler();
  const { showSuccess } = useSuccessHandler();

  // Fetch data for dropdowns
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
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (media) {
      const newFormData = {
        ownerType: media.ownerType || '',
        ownerId: media.ownerId || '',
        url: media.url || '',
        altText: media.altText || '',
        mimeType: media.mimeType || '',
        position: media.position?.toString() || ''
      };
      setFormData(newFormData);
    }
  }, [media]);

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
    
    if (!formData.ownerType.trim() || !formData.ownerId.trim() || !formData.url.trim()) {
      handleApiError(new Response(), 'save media: Owner type, owner ID, and URL are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        position: formData.position ? parseInt(formData.position) : undefined
      };

      const response = await fetch(`/api/media/${media.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        await handleApiError(response, 'update media');
        return;
      }

      showSuccess('Media Updated', 'Media has been successfully updated.');
      onUpdate();
      onClose();
    } catch {
      handleApiError(new Response(), 'update media');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
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

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-900">
              Edit Media
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Only render form when media data is loaded and form data is initialized */}
        {formData.ownerType || formData.url ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ownerType" className="text-neutral-700 font-medium">
              Owner Type *
            </Label>
            <Select 
              key={`ownerType-${media.id}`}
              value={formData.ownerType || undefined} 
              onValueChange={(value: string) => handleSelectChange('ownerType', value)}
            >
              <SelectTrigger className="w-full">
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

          <div className="space-y-2">
            <Label htmlFor="ownerId" className="text-neutral-700 font-medium">
              {formData.ownerType === 'service' && 'Service *'}
              {formData.ownerType === 'provider' && 'Provider *'}
              {formData.ownerType === 'location' && 'Location *'}
              {formData.ownerType === 'category' && 'Category ID *'}
            </Label>
            
            {formData.ownerType === 'category' ? (
              <Input
                id="ownerId"
                name="ownerId"
                value={formData.ownerId}
                onChange={handleChange}
                placeholder="Enter category ID"
                required
                className="w-full"
              />
            ) : (
              <Select 
                key={`ownerId-${media.id}-${formData.ownerType}`}
                value={formData.ownerId || undefined} 
                onValueChange={(value: string) => handleSelectChange('ownerId', value)}
                disabled={isDataLoading}
              >
                <SelectTrigger className="w-full">
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

          <div className="space-y-2">
            <Label htmlFor="url" className="text-neutral-700 font-medium">
              URL *
            </Label>
            <Input
              id="url"
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full"
            />
            
            {/* Image Preview */}
            {formData.url && formData.mimeType?.startsWith('image/') && (
              <div className="mt-4">
                <Label className="text-neutral-700 font-medium">Preview</Label>
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

          <div className="space-y-2">
            <Label htmlFor="altText" className="text-neutral-700 font-medium">
              Alt Text
            </Label>
            <Input
              id="altText"
              name="altText"
              value={formData.altText}
              onChange={handleChange}
              placeholder="Description of the image"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mimeType" className="text-neutral-700 font-medium">
              MIME Type
            </Label>
            <Select 
              key={`mimeType-${media.id}`}
              value={formData.mimeType || undefined} 
              onValueChange={(value: string) => handleSelectChange('mimeType', value)}
            >
              <SelectTrigger className="w-full">
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

          <div className="space-y-2">
            <Label htmlFor="position" className="text-neutral-700 font-medium">
              Position
            </Label>
            <Input
              id="position"
              name="position"
              type="number"
              value={formData.position}
              onChange={handleChange}
              placeholder="Display order position"
              className="w-full"
            />
          </div>

          <ModalActions
            isSubmitting={isSubmitting}
            onCancel={onClose}
            submitLabel={isSubmitting ? 'Updating...' : 'Update Media'}
          />
        </form>
        ) : (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-2"></div>
            <p className="text-gray-500">Loading form data...</p>
          </div>
        )}
      </div>
    </div>
  );
};
