'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface ModalActionsProps {
  isSubmitting?: boolean;
  onCancel: () => void;
  onDelete?: () => void;
  submitLabel?: string;
  showDelete?: boolean;
  deleteLabel?: string;
  cancelLabel?: string;
}

export const ModalActions: React.FC<ModalActionsProps> = ({
  isSubmitting = false,
  onCancel,
  onDelete,
  submitLabel = 'Save',
  showDelete = false,
  deleteLabel = 'Delete',
  cancelLabel = 'Cancel'
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
      {/* Delete button on the left */}
      <div>
        {showDelete && onDelete && (
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isSubmitting}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {deleteLabel}
          </Button>
        )}
      </div>

      {/* Cancel and Submit buttons on the right */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-medium rounded-lg transition-colors"
        >
          {cancelLabel}
        </Button>
        {submitLabel && (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 hover:opacity-90"
            style={{ backgroundColor: '#D87441' }}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
