'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await fetch(`http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/categories/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      
      setCategories(categories.filter(category => category.id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
      alert('Failed to delete category');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {categories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">No categories found.</p>
          <p className="text-sm text-gray-400">Create your first category using the form!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow border-gray-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Created:</span> {new Date(category.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Link href={`/category?id=${category.id}`}>
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="h-8 px-2">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
