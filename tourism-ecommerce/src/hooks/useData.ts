import { useState, useEffect, useCallback } from 'react';
import { TourismService, ServiceCategory, City } from '@/types/tourism';
import { dataService } from '@/services/dataService';

// Simplified data hook
const useSimpleData = <T>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refetch: loadData };
};

// Hook for categories
export const useCategories = () => {
  return useSimpleData(() => dataService.getCategories());
};

// Hook for cities
export const useCities = () => {
  return useSimpleData(() => dataService.getCities());
};

// Hook for all services
export const useServices = () => {
  return useSimpleData(() => dataService.getAllServices());
};

// Hook for featured services
export const useFeaturedServices = () => {
  return useSimpleData(() => dataService.getFeaturedServices());
};

// Hook for popular destinations
export const usePopularDestinations = () => {
  return useSimpleData(() => dataService.getPopularDestinations());
};

// Hook for services by category
export const useServicesByCategory = (categoryId: string | null) => {
  const [data, setData] = useState<TourismService[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = categoryId ? await dataService.getServicesByCategory(categoryId) : [];
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refetch: loadData };
};

// Hook for search results
export const useSearchServices = (query: string) => {
  const [data, setData] = useState<TourismService[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = query.length > 0 ? await dataService.searchServices(query) : [];
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refetch: loadData };
};

// Combined hook for homepage data
export const useHomepageData = () => {
  const [data, setData] = useState<{
    featuredServices: TourismService[];
    categories: ServiceCategory[];
    popularDestinations: City[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadHomepageData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [featuredServices, categories, popularDestinations] = await Promise.all([
          dataService.getFeaturedServices(),
          dataService.getCategories(),
          dataService.getPopularDestinations(),
        ]);

        if (isMounted) {
          setData({
            featuredServices,
            categories,
            popularDestinations,
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHomepageData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};

// Combined hook for services page data
export const useServicesPageData = () => {
  const [data, setData] = useState<{
    services: TourismService[];
    categories: ServiceCategory[];
    cities: City[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadServicesPageData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [services, categories, cities] = await Promise.all([
          dataService.getAllServices(),
          dataService.getCategories(),
          dataService.getCities(),
        ]);

        if (isMounted) {
          setData({
            services,
            categories,
            cities,
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadServicesPageData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};
