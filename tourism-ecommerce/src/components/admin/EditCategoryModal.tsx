'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModalActions } from '@/components/ui/modal-actions';
import { ApiCategory } from '@/services/api';
import { useErrorHandler, useSuccessHandler } from '@/components/ui/toast';

interface EditCategoryModalProps {
  category: ApiCategory;
  onClose: () => void;
  onUpdate: () => void;
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
  onClose,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parentId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleApiError } = useErrorHandler();
  const { showSuccess } = useSuccessHandler();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        parentId: category.parentId || ''
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      handleApiError(new Response(), 'save category: Name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        await handleApiError(response, 'update category');
        return;
      }

      showSuccess('Category Updated', 'Category has been successfully updated.');
      onUpdate();
      onClose();
    } catch {
      handleApiError(new Response(), 'update category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
              Edit Category
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
            <Label htmlFor="name" className="text-neutral-700 font-medium">
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              required
              className="w-full"
            />
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
              placeholder="Enter category slug"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentId" className="text-neutral-700 font-medium">
              Parent Category ID
            </Label>
            <Input
              id="parentId"
              name="parentId"
              value={formData.parentId}
              onChange={handleChange}
              placeholder="Enter parent category ID (optional)"
              className="w-full"
            />
          </div>

          <ModalActions
            isSubmitting={isSubmitting}
            onCancel={onClose}
            submitLabel={isSubmitting ? 'Updating...' : 'Update Category'}
          />
        </form>
      </div>
    </div>
  );
};
