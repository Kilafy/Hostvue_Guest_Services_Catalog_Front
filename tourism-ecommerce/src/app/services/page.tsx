'use client';

import { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { useServicesPageData } from '@/hooks/useData';

export default function ServicesPage() {
  const { data: servicesPageData, loading, error } = useServicesPageData();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    priceRange: [0, 200],
    rating: 0,
    sortBy: 'popularity'
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-hostvue-light" style={{ backgroundColor: '#F7F7F7' }}>
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-hostvue-gray">Loading...</div>
        </div>
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

  const tourismServices = servicesPageData?.services || [];
  const categories = servicesPageData?.categories || [];
  const cities = servicesPageData?.cities || [];

  const filteredServices = tourismServices.filter(service => {
    if (filters.category && service.category?.id !== filters.category) return false;
    if (filters.city && service.city !== filters.city) return false;
    if (service.price < filters.priceRange[0] || service.price > filters.priceRange[1]) return false;
    if (service.rating < filters.rating) return false;
    return true;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      default: // popularity
        return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div className="min-h-screen bg-hostvue-light" style={{ backgroundColor: '#F7F7F7' }}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-hostvue-primary to-hostvue-secondary text-white py-16" style={{ background: 'linear-gradient(135deg, #D87441 0%, #C86635 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: '#FFFFFF' }}>
              Explore All Experiences
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#FFFFFF' }}>
              Discover amazing tours and activities around the world. Filter by category, 
              destination, price, and more to find your perfect experience.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Results Count */}
            <div className="text-hostvue-gray" style={{ color: '#6B7280' }}>
              Showing {sortedServices.length} of {tourismServices.length} experiences
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-hostvue-primary"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-hostvue-primary"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>Destination</label>
                  <select
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-hostvue-primary"
                  >
                    <option value="">All Destinations</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}, {city.country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>
                    Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="10"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                    className="w-full"
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-hostvue-primary"
                  >
                    <option value="0">Any Rating</option>
                    <option value="7">7+ Stars</option>
                    <option value="8">8+ Stars</option>
                    <option value="9">9+ Stars</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({
                    category: '',
                    city: '',
                    priceRange: [0, 200],
                    rating: 0,
                    sortBy: 'popularity'
                  })}
                  className="text-hostvue-primary hover:text-hostvue-secondary font-medium"
                  style={{ color: '#D87441' }}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-hostvue-gray text-lg mb-4" style={{ color: '#6B7280' }}>No experiences found matching your criteria</div>
              <button
                onClick={() => setFilters({
                  category: '',
                  city: '',
                  priceRange: [0, 200],
                  rating: 0,
                  sortBy: 'popularity'
                })}
                className="text-hostvue-primary hover:text-hostvue-secondary font-medium"
                style={{ color: '#D87441' }}
              >
                Clear filters to see all experiences
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }>
              {sortedServices.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service}
                  className={viewMode === 'list' ? 'md:flex md:h-64' : ''}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {sortedServices.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-hostvue-primary hover:bg-hostvue-secondary text-white font-medium px-8 py-3 rounded-xl transition-colors duration-200" style={{ backgroundColor: '#D87441' }}>
                Load More Experiences
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
