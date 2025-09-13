/**
 * Design System - Tourism E-commerce Platform
 * Consistent colors, spacing, and design tokens
 */

export const designTokens = {
  // Primary Brand Colors
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main brand blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Secondary Colors for Categories
    secondary: {
      emerald: {
        50: '#ecfdf5',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
      },
      amber: {
        50: '#fffbeb',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
      },
      purple: {
        50: '#faf5ff',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
      },
      rose: {
        50: '#fff1f2',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
      },
      indigo: {
        50: '#eef2ff',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
      },
      orange: {
        50: '#fff7ed',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
      }
    },

    // Neutral/Gray Scale
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },

    // Status Colors
    status: {
      success: {
        50: '#f0fdf4',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
      },
      warning: {
        50: '#fffbeb',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
      },
      error: {
        50: '#fef2f2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
      },
      info: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  },

  // Spacing Scale (Tailwind-compatible)
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  // Border Radius
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },

  // Typography Scale
  typography: {
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  // Animation Durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  }
};

// Helper function to get color values
export const getColor = (colorPath: string): string => {
  const paths = colorPath.split('.');
  let current: Record<string, unknown> = designTokens.colors;
  
  for (const path of paths) {
    if (typeof current === 'object' && current !== null && path in current) {
      current = current[path] as Record<string, unknown>;
    } else {
      return '#000000';
    }
  }
  
  return typeof current === 'string' ? current : '#000000';
};

// Category color mappings for consistent UI
export const categoryColors = {
  'restaurant-services': 'rose',
  'restaurants-dining': 'rose',
  'spa-services': 'emerald', 
  'direct-test': 'primary',
  'test-provider-category': 'purple',
  'adventure-tours': 'orange',
  'cultural-experiences': 'indigo',
  'accommodation': 'amber',
  'transportation': 'neutral',
  default: 'primary'
};

// Status color mappings
export const statusColors = {
  active: 'success',
  inactive: 'neutral',
  draft: 'warning',
  pending: 'warning',
  verified: 'success',
  rejected: 'error',
  default: 'neutral'
};
