'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MediaFormData {
  ownerType: string;
  ownerId: string;
  url: string;
  altText: string;
  mimeType: string;
  position: string;
}

export default function MediaForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const initialFormData: MediaFormData = {
    ownerType: 'service',
    ownerId: '',
    url: '',
    altText: '',
    mimeType: 'image/jpeg',
    position: '0'
  };

  const [formData, setFormData] = useState<MediaFormData>(initialFormData);

  const handleInputChange = (field: keyof MediaFormData, value: string) => {
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
              <SelectContent>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="provider">Provider</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ownerId" className="text-sm font-medium text-gray-700">Owner ID</Label>
            <Input
              id="ownerId"
              type="text"
              value={formData.ownerId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('ownerId', e.target.value)}
              required
              className="mt-1"
              placeholder="Enter owner ID"
            />
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
              <SelectContent>
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
