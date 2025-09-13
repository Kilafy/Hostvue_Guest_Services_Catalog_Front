'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ModalActions } from '@/components/ui/modal-actions';
import { ApiProvider } from '@/services/api';
import { useErrorHandler, useSuccessHandler } from '@/components/ui/toast';

interface EditProviderModalProps {
  provider: ApiProvider;
  onClose: () => void;
  onUpdate: () => void;
}

export const EditProviderModal: React.FC<EditProviderModalProps> = ({
  provider,
  onClose,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    userId: '',
    companyName: '',
    legalName: '',
    vatNumber: '',
    description: '',
    verified: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleApiError } = useErrorHandler();
  const { showSuccess } = useSuccessHandler();

  useEffect(() => {
    if (provider) {
      setFormData({
        userId: provider.userId || '',
        companyName: provider.companyName || '',
        legalName: provider.legalName || '',
        vatNumber: provider.vatNumber || '',
        description: provider.description || '',
        verified: provider.verified || false
      });
    }
  }, [provider]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userId.trim()) {
      handleApiError(new Response(), 'save provider: User ID is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/providers/${provider.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        await handleApiError(response, 'update provider');
        return;
      }

      showSuccess('Provider Updated', 'Provider has been successfully updated.');
      onUpdate();
      onClose();
    } catch {
      handleApiError(new Response(), 'update provider');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
              Edit Provider
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
            <Label htmlFor="userId" className="text-neutral-700 font-medium">
              User ID *
            </Label>
            <Input
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Enter user ID"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-neutral-700 font-medium">
              Company Name
            </Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="legalName" className="text-neutral-700 font-medium">
              Legal Name
            </Label>
            <Input
              id="legalName"
              name="legalName"
              value={formData.legalName}
              onChange={handleChange}
              placeholder="Enter legal name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vatNumber" className="text-neutral-700 font-medium">
              VAT Number
            </Label>
            <Input
              id="vatNumber"
              name="vatNumber"
              value={formData.vatNumber}
              onChange={handleChange}
              placeholder="Enter VAT number"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-neutral-700 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter provider description"
              rows={3}
              className="w-full resize-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="verified"
              name="verified"
              checked={formData.verified}
              onChange={handleChange}
              className="h-4 w-4 text-hostvue-primary focus:ring-hostvue-primary border-neutral-300 rounded"
            />
            <Label htmlFor="verified" className="text-neutral-700 font-medium">
              Verified Provider
            </Label>
          </div>

          <ModalActions
            isSubmitting={isSubmitting}
            onCancel={onClose}
            submitLabel={isSubmitting ? 'Updating...' : 'Update Provider'}
          />
        </form>
      </div>
    </div>
  );
};
