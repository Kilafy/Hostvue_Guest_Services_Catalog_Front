'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModalActions } from '@/components/ui/modal-actions';
import { ApiLocation } from '@/services/api';
import { useErrorHandler, useSuccessHandler } from '@/components/ui/toast';

interface EditLocationModalProps {
  location: ApiLocation;
  onClose: () => void;
  onUpdate: () => void;
}

export const EditLocationModal: React.FC<EditLocationModalProps> = ({
  location,
  onClose,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    country: '',
    region: '',
    city: '',
    lat: '',
    lon: '',
    slug: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleApiError } = useErrorHandler();
  const { showSuccess } = useSuccessHandler();

  useEffect(() => {
    if (location) {
      setFormData({
        country: location.country || '',
        region: location.region || '',
        city: location.city || '',
        lat: location.lat?.toString() || '',
        lon: location.lon?.toString() || '',
        slug: location.slug || ''
      });
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.country.trim() || !formData.region.trim() || !formData.city.trim()) {
      handleApiError(new Response(), 'save location: Country, region, and city are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        lat: formData.lat ? parseFloat(formData.lat) : undefined,
        lon: formData.lon ? parseFloat(formData.lon) : undefined
      };

      const response = await fetch(`/api/locations/${location.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        await handleApiError(response, 'update location');
        return;
      }

      showSuccess('Location Updated', 'Location has been successfully updated.');
      onUpdate();
      onClose();
    } catch {
      handleApiError(new Response(), 'update location');
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
              Edit Location
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="country" className="text-neutral-700 font-medium">
              Country *
            </Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region" className="text-neutral-700 font-medium">
              Region *
            </Label>
            <Input
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Enter region"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-neutral-700 font-medium">
              City *
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lat" className="text-neutral-700 font-medium">
                Latitude
              </Label>
              <Input
                id="lat"
                name="lat"
                type="number"
                step="any"
                value={formData.lat}
                onChange={handleChange}
                placeholder="0.0"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lon" className="text-neutral-700 font-medium">
                Longitude
              </Label>
              <Input
                id="lon"
                name="lon"
                type="number"
                step="any"
                value={formData.lon}
                onChange={handleChange}
                placeholder="0.0"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-neutral-700 font-medium">
              Slug
            </Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Enter location slug"
              className="w-full"
            />
          </div>

          <ModalActions
            isSubmitting={isSubmitting}
            onCancel={onClose}
            submitLabel={isSubmitting ? 'Updating...' : 'Update Location'}
          />
        </form>
      </div>
    </div>
  );
};
