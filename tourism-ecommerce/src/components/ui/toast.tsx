'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    setTimeout(() => {
      hideToast(id);
    }, newToast.duration);
  }, [hideToast]);

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-neutral-500" />;
    }
  };

  const getBackgroundColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-300 shadow-green-500/20';
      case 'error':
        return 'bg-red-50 border-red-300 shadow-red-500/20';
      case 'warning':
        return 'bg-amber-50 border-amber-300 shadow-amber-500/20';
      case 'info':
        return 'bg-blue-50 border-blue-300 shadow-blue-500/20';
      default:
        return 'bg-white border-neutral-300 shadow-neutral-500/20';
    }
  };

  const getTextColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-amber-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-neutral-800';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[10000] space-y-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              ${getBackgroundColor(toast.type)} 
              ${getTextColor(toast.type)}
              border-2 rounded-lg shadow-xl p-4 min-w-[320px]
              animate-in slide-in-from-top-2 duration-300
              backdrop-blur-sm bg-opacity-95
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(toast.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{toast.title}</h4>
                {toast.message && (
                  <p className="mt-1 text-sm opacity-90">{toast.message}</p>
                )}
              </div>
              
              <button
                onClick={() => hideToast(toast.id)}
                className="flex-shrink-0 ml-2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Helper hooks for common toast patterns
export const useErrorHandler = () => {
  const { showToast } = useToast();

  const handleError = useCallback((error: unknown, customMessage?: string) => {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    showToast({
      type: 'error',
      title: 'Error',
      message: customMessage || message,
    });
  }, [showToast]);

  const handleApiError = useCallback(async (response: Response, operation: string) => {
    let errorMessage = `Failed to ${operation}`;
    
    try {
      const errorData = await response.text();
      if (errorData) {
        try {
          const parsed = JSON.parse(errorData);
          errorMessage = parsed.message || parsed.error || errorMessage;
        } catch {
          errorMessage = errorData;
        }
      }
    } catch {
      // Use default message
    }

    showToast({
      type: 'error',
      title: 'Operation Failed',
      message: errorMessage,
    });
  }, [showToast]);

  return { handleError, handleApiError };
};

export const useSuccessHandler = () => {
  const { showToast } = useToast();

  const showSuccess = useCallback((title: string, message?: string) => {
    showToast({
      type: 'success',
      title,
      message,
    });
  }, [showToast]);

  return { showSuccess };
};
