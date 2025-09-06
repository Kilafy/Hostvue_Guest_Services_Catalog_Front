import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { servicesApi, providersApi } from '@/services/api';
import { ApiProvider } from '@/services/api';

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

      await servicesApi.createService(serviceData);
      
      setMessage({ type: 'success', text: 'Service created successfully!' });
      
      // Reset form
      setFormData({
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

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Creating...' : 'Create Service'}
      </Button>
    </form>
  );
}
