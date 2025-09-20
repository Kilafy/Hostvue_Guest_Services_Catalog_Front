import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { servicesApi, providersApi } from '@/services/api';
import Image from 'next/image';

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

export default function ServiceForm() {
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

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [providers, setProviders] = useState<ApiProvider[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const providersData = await providersApi.getAllProviders();
      setProviders(providersData);
    } catch (error) {
      console.error('Failed to load providers:', error);
    }
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
      const serviceData = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        longDescription: formData.longDescription,
        durationMinutes: formData.durationMinutes ? parseInt(formData.durationMinutes) : undefined,
        maxCapacity: formData.maxCapacity ? parseInt(formData.maxCapacity) : undefined,
        minCapacity: formData.minCapacity ? parseInt(formData.minCapacity) : undefined,
        status: formData.status,
        providerId: formData.providerId,
        languageOffered: formData.languageOffered.split(',').map(lang => lang.trim()).filter(Boolean)
      };

      await servicesApi.createServiceWithImage(serviceData, selectedImage || undefined);
      
      setMessage({ type: 'success', text: 'Service created successfully! Reloading page...' });
      
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error('Error submitting service:', error);
      setMessage({ type: 'error', text: 'Failed to create service. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className={`p-3 rounded-md text-sm ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

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

      {/* Image Upload Section */}
      <div>
        <Label htmlFor="image">Service Image</Label>
        <div className="mt-2">
          {imagePreview ? (
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
              <Image
                src={imagePreview}
                alt="Service preview"
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
                Click to upload service image<br />
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
            <SelectContent>
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
          <SelectContent>
            {providers.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.companyName || provider.legalName || 'Unknown Provider'}
              </SelectItem>
            ))}
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

      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full text-white hover:opacity-90 transition-colors"
        style={{ backgroundColor: '#D87441' }}
      >
        {isLoading ? 'Creating...' : 'Create Service'}
      </Button>
    </form>
  );
}
