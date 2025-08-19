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
        // Hostvue Brand Colors (extracted from images)
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
