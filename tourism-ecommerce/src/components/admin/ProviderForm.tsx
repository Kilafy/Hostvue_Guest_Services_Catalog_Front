'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { providersApi } from '@/services/api';

interface ProviderFormData {
  userId: string;
  companyName: string;
  legalName: string;
  vatNumber: string;
  description: string;
  verified: boolean;
}

export default function ProviderForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const initialFormData: ProviderFormData = {
    userId: '',
    companyName: '',
    legalName: '',
    vatNumber: '',
    description: '',
    verified: false
  };

  const [formData, setFormData] = useState<ProviderFormData>(initialFormData);

  const handleInputChange = (field: keyof ProviderFormData, value: string | boolean) => {
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
      await providersApi.createProvider({
        userId: formData.userId,
        companyName: formData.companyName,
        legalName: formData.legalName,
        vatNumber: formData.vatNumber,
        description: formData.description,
        verified: formData.verified
      });

      setMessage({ type: 'success', text: 'Provider created successfully!' });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting provider:', error);
      setMessage({ type: 'error', text: 'Failed to create provider. Please try again.' });
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
          <Label htmlFor="userId" className="text-sm font-medium text-gray-700">User ID</Label>
          <Input
            id="userId"
            type="text"
            value={formData.userId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('userId', e.target.value)}
            required
            className="mt-1"
            placeholder="Enter user ID"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('companyName', e.target.value)}
              className="mt-1"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <Label htmlFor="legalName" className="text-sm font-medium text-gray-700">Legal Name</Label>
            <Input
              id="legalName"
              type="text"
              value={formData.legalName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('legalName', e.target.value)}
              className="mt-1"
              placeholder="Enter legal name"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="vatNumber" className="text-sm font-medium text-gray-700">VAT Number</Label>
          <Input
            id="vatNumber"
            type="text"
            value={formData.vatNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('vatNumber', e.target.value)}
            className="mt-1"
            placeholder="Enter VAT number"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
            rows={4}
            className="mt-1"
            placeholder="Describe the provider..."
          />
        </div>

        <div>
          <Label htmlFor="verified" className="text-sm font-medium text-gray-700">Verification Status</Label>
          <Select value={formData.verified.toString()} onValueChange={(value: string) => handleInputChange('verified', value === 'true')}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select verification status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">Not Verified</SelectItem>
              <SelectItem value="true">Verified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full text-white hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#D87441' }}
        >
          {isLoading ? 'Creating...' : 'Create Provider'}
        </Button>
      </form>
    </div>
  );
}
