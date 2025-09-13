'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ModalActions } from '@/components/ui/modal-actions';
import { useErrorHandler, useSuccessHandler } from '@/components/ui/toast';

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  durationMinutes: number;
  status: string;
  minCapacity: number;
  maxCapacity: number;
  languageOffered: string;
  providerId: string;
}

interface ApiProvider {
  id: string;
  userId: string;
  companyName?: string;
  legalName?: string;
  vatNumber?: string;
  description?: string;
  verified?: boolean;
  createdAt: number[];
  updatedAt?: number[];
}

interface EditServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedService: Service) => void;
}

export default function EditServiceModal({ service, isOpen, onClose, onUpdate }: EditServiceModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    durationMinutes: '',
    maxCapacity: '',
    minCapacity: '',
    status: 'active',
    providerId: '',
    languageOffered: ''
  });

  const [providers, setProviders] = useState<ApiProvider[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const { handleApiError } = useErrorHandler();
  const { showSuccess } = useSuccessHandler();

  useEffect(() => {
    if (service && isOpen) {
      setFormData({
        title: service.title,
        shortDescription: service.shortDescription || '',
        longDescription: service.longDescription || '',
        durationMinutes: service.durationMinutes?.toString() || '',
        maxCapacity: service.maxCapacity?.toString() || '',
        minCapacity: service.minCapacity?.toString() || '',
        status: service.status,
        providerId: service.providerId,
        languageOffered: Array.isArray(service.languageOffered) 
          ? service.languageOffered.join(', ') 
          : service.languageOffered || ''
      });
      loadProviders();
    }
  }, [service, isOpen]);

  const loadProviders = async () => {
    try {
      const response = await fetch('/api/providers');
      if (!response.ok) {
        throw new Error('Failed to fetch providers');
      }
      const providersData = await response.json();
      setProviders(providersData);
    } catch (error) {
      console.error('Failed to load providers:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const serviceData = {
        ...formData,
        durationMinutes: formData.durationMinutes ? parseInt(formData.durationMinutes) : undefined,
        maxCapacity: formData.maxCapacity ? parseInt(formData.maxCapacity) : undefined,
        minCapacity: formData.minCapacity ? parseInt(formData.minCapacity) : undefined,
        languageOffered: formData.languageOffered.split(',').map(lang => lang.trim()).filter(Boolean)
      };

      const response = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        await handleApiError(response, 'update service');
        return;
      }

      const updatedService = await response.json();
      showSuccess('Service Updated', 'Service has been successfully updated!');
      onUpdate(updatedService);
      
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1000);
    } catch {
      handleApiError(new Response(), 'update service');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Helper function to truncate text for better display
  const truncateText = (text: string, maxLength: number = 50): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Get display name for provider
  const getProviderDisplayName = (provider: ApiProvider): string => {
    return provider.companyName || provider.legalName || 'Unknown Provider';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-neutral-200 relative">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Service</h2>
            <Button variant="outline" onClick={onClose} className="p-2">
              ✕
            </Button>
          </div>

          {message && (
            <div className={`p-3 rounded-md text-sm mb-4 ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Service Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', e.target.value)}
                placeholder="Enter service title"
                required
              />
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('shortDescription', e.target.value)}
                placeholder="Brief description of the service"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="longDescription">Long Description</Label>
              <Textarea
                id="longDescription"
                value={formData.longDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('longDescription', e.target.value)}
                placeholder="Detailed description of the service"
                rows={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                <Input
                  id="durationMinutes"
                  type="number"
                  value={formData.durationMinutes}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('durationMinutes', e.target.value)}
                  placeholder="120"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: string) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg border">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minCapacity">Min Capacity</Label>
                <Input
                  id="minCapacity"
                  type="number"
                  value={formData.minCapacity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('minCapacity', e.target.value)}
                  placeholder="1"
                  min="1"
                />
              </div>

              <div>
                <Label htmlFor="maxCapacity">Max Capacity</Label>
                <Input
                  id="maxCapacity"
                  type="number"
                  value={formData.maxCapacity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('maxCapacity', e.target.value)}
                  placeholder="10"
                  min="1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="providerId">Provider</Label>
              <Select value={formData.providerId} onValueChange={(value: string) => handleInputChange('providerId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg border">
                  {providers.length > 0 ? (
                    providers.map((provider) => {
                      const displayName = getProviderDisplayName(provider);
                      const truncatedName = truncateText(displayName, 50);
                      
                      return (
                        <SelectItem 
                          key={provider.id} 
                          value={provider.id}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <span title={displayName} className="block">
                            {truncatedName}
                          </span>
                        </SelectItem>
                      );
                    })
                  ) : (
                    <div className="px-2 py-1.5 text-sm text-gray-500">
                      No providers available
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="languageOffered">Languages Offered</Label>
              <Input
                id="languageOffered"
                value={formData.languageOffered}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('languageOffered', e.target.value)}
                placeholder="English, Spanish, French (comma separated)"
              />
            </div>

            <ModalActions
              isSubmitting={isLoading}
              onCancel={onClose}
              submitLabel={isLoading ? 'Updating...' : 'Update Service'}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
