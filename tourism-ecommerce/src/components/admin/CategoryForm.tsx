'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface CategoryFormData {
  name: string;
  description: string;
}

export default function CategoryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const initialFormData: CategoryFormData = {
    name: '',
    description: ''
  };

  const [formData, setFormData] = useState<CategoryFormData>(initialFormData);

  const handleInputChange = (field: keyof CategoryFormData, value: string) => {
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
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      setMessage({ type: 'success', text: 'Category created successfully!' });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting category:', error);
      setMessage({ type: 'error', text: 'Failed to create category. Please try again.' });
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
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">Category Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
            required
            className="mt-1"
            placeholder="e.g., Adventure Tours, Cultural Experiences"
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
            placeholder="Describe what this category includes..."
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full text-white hover:opacity-90 transition-colors"
          style={{ backgroundColor: '#D87441' }}
        >
          {isLoading ? 'Creating...' : 'Create Category'}
        </Button>
      </form>
    </div>
  );
}
