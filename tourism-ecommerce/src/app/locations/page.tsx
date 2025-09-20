'use client';

import { useState, useEffect } from 'react';
import { Filter, Grid, List, MapPin, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationCard from '@/components/LocationCard';
import { LocationCardSkeleton } from '@/components/ui/skeleton';
import { locationsApi, ApiLocation } from '@/services/api';

export default function LocationsPage() {
  const [locations, setLocations] = useState<ApiLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    country: '',
    region: '',
    search: '',
    sortBy: 'name'
  });

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const data = await locationsApi.getAllLocations();
      setLocations(data);
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Get unique countries and regions for filters
  const countries = Array.from(new Set(locations.map(location => location.country))).sort();
  const regions = Array.from(new Set(locations.map(location => location.region).filter(Boolean))).sort();

  const filteredLocations = locations.filter(location => {
    if (filters.country && location.country !== filters.country) return false;
    if (filters.region && location.region !== filters.region) return false;
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        location.city.toLowerCase().includes(searchTerm) ||
        location.region?.toLowerCase().includes(searchTerm) ||
        location.country.toLowerCase().includes(searchTerm) ||
        location.slug?.toLowerCase().includes(searchTerm)
      );
    }
    return true;
  });

  const sortedLocations = [...filteredLocations].sort((a, b) => {
    switch (filters.sortBy) {
      case 'country':
        return a.country.localeCompare(b.country);
      case 'region':
        return (a.region || '').localeCompare(b.region || '');
      default: // name (city)
        return a.city.localeCompare(b.city);
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-hostvue-light" style={{ backgroundColor: '#F7F7F7' }}>
        <Header />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-hostvue-primary to-hostvue-secondary text-white py-16" style={{ background: 'linear-gradient(135deg, #D87441 0%, #C86635 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: '#FFFFFF' }}>
                Discover Amazing Destinations
              </h1>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
                Explore stunning locations around the world and plan your next adventure.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section Skeleton */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="text-hostvue-gray" style={{ color: '#6B7280' }}>
                Loading destinations...
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-16 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Grid Skeleton */}
        <section className="py-12 min-h-[600px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, index) => (
                <LocationCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-hostvue-light" style={{ backgroundColor: '#F7F7F7' }}>
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hostvue-light" style={{ backgroundColor: '#F7F7F7' }}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-hostvue-primary to-hostvue-secondary text-white py-16" style={{ background: 'linear-gradient(135deg, #D87441 0%, #C86635 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: '#FFFFFF' }}>
              Discover Amazing Destinations
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
              Explore beautiful locations around the world. Find your perfect destination 
              for your next adventure or getaway.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Results Count */}
            <div className="text-hostvue-gray" style={{ color: '#6B7280' }}>
              Showing {sortedLocations.length} of {locations.length} destinations
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-hostvue-primary w-64"
                />
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Sort */}
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-hostvue-primary"
              >
                <option value="name">Sort by Name</option>
                <option value="country">Sort by Country</option>
                <option value="region">Sort by Region</option>
              </select>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-hostvue-light transition-colors"
                style={{ borderColor: '#E5E7EB', color: '#374151' }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-hostvue-primary text-white' : 'text-hostvue-gray hover:bg-hostvue-light'}`}
                  style={viewMode === 'grid' ? { backgroundColor: '#D87441', color: '#FFFFFF' } : { color: '#6B7280' }}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-hostvue-primary text-white' : 'text-hostvue-gray hover:bg-hostvue-light'}`}
                  style={viewMode === 'list' ? { backgroundColor: '#D87441', color: '#FFFFFF' } : { color: '#6B7280' }}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-hostvue-light rounded-xl" style={{ backgroundColor: '#F7F7F7' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Country Filter */}
                <div>
                  <label className="block text-sm font-medium text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>Country</label>
                  <select
                    value={filters.country}
                    onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-hostvue-primary"
                  >
                    <option value="">All Countries</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Region Filter */}
                <div>
                  <label className="block text-sm font-medium text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>Region/State</label>
                  <select
                    value={filters.region}
                    onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-hostvue-primary"
                  >
                    <option value="">All Regions</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({
                      country: '',
                      region: '',
                      search: '',
                      sortBy: 'name'
                    })}
                    className="text-hostvue-primary hover:text-hostvue-secondary font-medium"
                    style={{ color: '#D87441' }}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedLocations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-hostvue-gray text-lg mb-4" style={{ color: '#6B7280' }}>
                <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
                No destinations found matching your criteria
              </div>
              <button
                onClick={() => setFilters({
                  country: '',
                  region: '',
                  search: '',
                  sortBy: 'name'
                })}
                className="text-hostvue-primary hover:text-hostvue-secondary font-medium"
                style={{ color: '#D87441' }}
              >
                Clear filters to see all destinations
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }>
              {sortedLocations.map((location) => (
                <LocationCard 
                  key={location.id} 
                  location={location}
                  className={viewMode === 'list' ? 'md:flex md:h-64' : ''}
                />
              ))}
            </div>
          )}

          {/* Load More (placeholder for pagination) */}
          {sortedLocations.length > 0 && sortedLocations.length >= 12 && (
            <div className="text-center mt-12">
              <button className="bg-hostvue-primary hover:bg-hostvue-secondary text-white font-medium px-8 py-3 rounded-xl transition-colors duration-200" style={{ backgroundColor: '#D87441' }}>
                Load More Destinations
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
