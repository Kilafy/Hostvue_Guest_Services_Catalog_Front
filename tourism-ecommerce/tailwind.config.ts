import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Design System Colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        
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
        },

        // Legacy Hostvue Brand Colors (maintained for compatibility)
        hostvue: {
          primary: "#D87441", // Main orange/coral from images
          secondary: "#C86635", // Darker orange variation
          accent: "#E89A6B", // Lighter orange/peach
          tertiary: "#F4A876", // Light orange
          dark: "#2C2C2C", // Dark gray from text
          gray: "#6B7280", // Medium gray
          light: "#F7F7F7", // Light background
          cream: "#FAF8F5", // Warm cream background
        },
        
        // Tourism themed colors
        tourism: {
          ocean: "#0EA5E9", // Blue for beach/water activities
          mountain: "#059669", // Green for nature/mountains
          culture: "#7C3AED", // Purple for cultural activities
          adventure: "#DC2626", // Red for adventure activities
          food: "#F59E0B", // Amber for food tours
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
export default config;
