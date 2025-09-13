'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModalActions } from '@/components/ui/modal-actions';
import { ApiMedia } from '@/services/api';
import { useErrorHandler, useSuccessHandler } from '@/components/ui/toast';

interface EditMediaModalProps {
  media: ApiMedia;
  onClose: () => void;
  onUpdate: () => void;
}

export const EditMediaModal: React.FC<EditMediaModalProps> = ({
  media,
  onClose,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    ownerType: '',
    ownerId: '',
    url: '',
    altText: '',
    mimeType: '',
    position: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleApiError } = useErrorHandler();
  const { showSuccess } = useSuccessHandler();

  useEffect(() => {
    if (media) {
      setFormData({
        ownerType: media.ownerType || '',
        ownerId: media.ownerId || '',
        url: media.url || '',
        altText: media.altText || '',
        mimeType: media.mimeType || '',
        position: media.position?.toString() || ''
      });
    }
  }, [media]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.ownerType.trim() || !formData.ownerId.trim() || !formData.url.trim()) {
      handleApiError(new Response(), 'save media: Owner type, owner ID, and URL are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        position: formData.position ? parseInt(formData.position) : undefined
      };

      const response = await fetch(`/api/media/${media.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        await handleApiError(response, 'update media');
        return;
      }

      showSuccess('Media Updated', 'Media has been successfully updated.');
      onUpdate();
      onClose();
    } catch {
      handleApiError(new Response(), 'update media');
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
              Edit Media
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
            <Label htmlFor="ownerType" className="text-neutral-700 font-medium">
              Owner Type *
            </Label>
            <Input
              id="ownerType"
              name="ownerType"
              value={formData.ownerType}
              onChange={handleChange}
              placeholder="e.g., service, category"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerId" className="text-neutral-700 font-medium">
              Owner ID *
            </Label>
            <Input
              id="ownerId"
              name="ownerId"
              value={formData.ownerId}
              onChange={handleChange}
              placeholder="Enter owner ID"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-neutral-700 font-medium">
              URL *
            </Label>
            <Input
              id="url"
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full"
            />
            
            {/* Image Preview */}
            {formData.url && formData.mimeType?.startsWith('image/') && (
              <div className="mt-3">
                <Label className="text-neutral-700 font-medium">Preview</Label>
                <div className="mt-2 border rounded-lg p-3 bg-gray-50">
                  <Image
                    src={formData.url}
                    alt={formData.altText || 'Media preview'}
                    width={300}
                    height={200}
                    className="max-w-full h-auto rounded-lg shadow-sm"
                    unoptimized={true}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex items-center justify-center h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                            <div class="text-center">
                              <svg class="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <p class="text-sm text-gray-500">Unable to load image</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="altText" className="text-neutral-700 font-medium">
              Alt Text
            </Label>
            <Input
              id="altText"
              name="altText"
              value={formData.altText}
              onChange={handleChange}
              placeholder="Description of the image"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mimeType" className="text-neutral-700 font-medium">
              MIME Type
            </Label>
            <Input
              id="mimeType"
              name="mimeType"
              value={formData.mimeType}
              onChange={handleChange}
              placeholder="e.g., image/jpeg, image/png"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="text-neutral-700 font-medium">
              Position
            </Label>
            <Input
              id="position"
              name="position"
              type="number"
              value={formData.position}
              onChange={handleChange}
              placeholder="Display order position"
              className="w-full"
            />
          </div>

          <ModalActions
            isSubmitting={isSubmitting}
            onCancel={onClose}
            submitLabel={isSubmitting ? 'Updating...' : 'Update Media'}
          />
        </form>
      </div>
    </div>
  );
};
