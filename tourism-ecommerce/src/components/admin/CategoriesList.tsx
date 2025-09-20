'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Tags } from 'lucide-react';
import Link from 'next/link';
import { ApiCategory, categoriesApi } from '@/services/api';
import { EditCategoryModal } from './EditCategoryModal';
import { useSuccessHandler } from '@/components/ui/toast';

export default function CategoriesList() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<ApiCategory | null>(null);
  const { showSuccess } = useSuccessHandler();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoriesApi.getAllCategories();
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
      await categoriesApi.deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
      showSuccess('Category Deleted', 'Category has been successfully deleted.');
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category');
    }
  };

  const handleEdit = (category: ApiCategory) => {
    setEditingCategory(category);
  };

  const handleCloseEdit = () => {
    setEditingCategory(null);
  };

  const handleUpdateSuccess = () => {
    fetchCategories(); // Refresh the list
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
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-orange-50 rounded-full">
              <Tags className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <p className="text-gray-500 mb-2 text-lg font-medium">No categories found</p>
          <p className="text-sm text-gray-400">Create your first category to organize your services!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow border-gray-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    {category.slug && (
                      <p className="text-sm text-gray-600 mb-3">Slug: {category.slug}</p>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Created:</span> {category.createdAt && category.createdAt.length >= 3 
                        ? new Date(category.createdAt[0], category.createdAt[1] - 1, category.createdAt[2]).toLocaleDateString()
                        : 'Unknown'
                      }
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Link href={`/category?id=${category.id}`}>
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleEdit(category)}
                    >
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
      
      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={handleCloseEdit}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
