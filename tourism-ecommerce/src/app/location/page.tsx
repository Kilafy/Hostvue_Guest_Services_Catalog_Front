'use client';
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Calendar, Image, Globe } from 'lucide-react';
import Link from 'next/link';

interface Location {
  id: string;
  name: string;
  city: string;
  region: string;
  country: string;
  lat?: number;
  lon?: number;
  slug?: string;
  createdAt: number[];
}

interface Media {
  id: string;
  ownerType: string;
  ownerId: string;
  url: string;
  altText?: string;
  mimeType?: string;
  createdAt: number[];
  position: number;
}

export default function LocationDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#D87441' }}></div>
          <p className="text-hostvue-gray text-lg" style={{ color: '#6B7280' }}>Loading location details...</p>
        </div>
      </div>
    }>
      <LocationDetailsContent />
    </Suspense>
  );
}

function LocationDetailsContent() {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('id');
  
  const [location, setLocation] = useState<Location | null>(null);
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocationDetails = useCallback(async () => {
    if (!locationId) return;
    
    try {
      const response = await fetch(`https://guests-services.munnity.app/api/locations/${locationId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch location details');
      }
      const data = await response.json();
      setLocation(data);
    } catch (err) {
      console.error('Error fetching location:', err);
      setError('Failed to load location details');
    }
  }, [locationId]);

  const fetchLocationMedia = useCallback(async () => {
    if (!locationId) return;
    
    try {
      const response = await fetch('https://guests-services.munnity.app/api/media');
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      const allMedia = await response.json();
      
      // Filter media for this location and sort by position
      const locationMedia = allMedia
        .filter((item: Media) => item.ownerType === 'location' && item.ownerId === locationId)
        .sort((a: Media, b: Media) => a.position - b.position);
      
      setMedia(locationMedia);
    } catch (err) {
      console.error('Error fetching media:', err);
    } finally {
      setIsLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    if (locationId) {
      fetchLocationDetails();
      fetchLocationMedia();
    }
  }, [locationId, fetchLocationDetails, fetchLocationMedia]);

  const formatDate = (dateArray: number[]) => {
    if (!dateArray || dateArray.length < 3) return 'Unknown';
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-hostvue-primary mx-auto mb-4" style={{ borderBottomColor: '#D87441' }}></div>
              <p className="text-hostvue-gray text-xl" style={{ color: '#6B7280' }}>Loading location details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8 max-w-md mx-auto">
              <p className="text-red-600 mb-6 text-lg">{error || 'Location not found'}</p>
              <Link href="/">
                <Button 
                  variant="outline"
                  className="border-hostvue-primary text-hostvue-primary hover:bg-hostvue-primary hover:text-white transition-colors"
                  style={{ borderColor: '#D87441', color: '#D87441' }}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const mainImage = media.find(m => m.position === 0);
  const otherImages = media.filter(m => m.position !== 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button 
              variant="outline" 
              className="mb-6 border-hostvue-primary text-hostvue-primary hover:bg-hostvue-primary hover:text-white transition-colors"
              style={{ borderColor: '#D87441', color: '#D87441' }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-hostvue-dark mb-4" style={{ color: '#2C2C2C' }}>
                {location.name}
              </h1>
              <div className="flex items-center text-hostvue-gray text-lg mb-4" style={{ color: '#6B7280' }}>
                <MapPin className="h-6 w-6 mr-2 text-hostvue-primary" style={{ color: '#D87441' }} />
                <span>{location.city}, {location.region}, {location.country}</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center text-sm text-hostvue-gray" style={{ color: '#6B7280' }}>
                <Calendar className="h-4 w-4 mr-1" />
                Created: {formatDate(location.createdAt)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            {mainImage ? (
              <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-video w-full">
                  <img
                    src={mainImage.url}
                    alt={mainImage.altText || `Main image of ${location.name}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div class="text-center">
                              <svg class="h-16 w-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <p class="text-gray-500 text-sm">Image not available</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
                {mainImage.altText && (
                  <div className="p-4 bg-white">
                    <p className="text-hostvue-gray" style={{ color: '#6B7280' }}>{mainImage.altText}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-video w-full bg-hostvue-light flex items-center justify-center" style={{ backgroundColor: '#F7F7F7' }}>
                  <div className="text-center text-hostvue-gray" style={{ color: '#6B7280' }}>
                    <MapPin className="h-16 w-16 mx-auto mb-2 opacity-50" />
                    <p>No main image available</p>
                  </div>
                </div>
              </div>
            )}

            {/* Image Gallery */}
            {otherImages.length > 0 && (
              <div className="mb-8 bg-white rounded-3xl p-8 shadow-soft">
                <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {otherImages.map((mediaItem, index) => (
                    <div
                      key={mediaItem.id}
                      className="aspect-square rounded-2xl overflow-hidden shadow-card hover:shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
                    >
                      <img
                        src={mediaItem.url}
                        alt={mediaItem.altText || `Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                                <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Media List */}
            {media.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-soft">
                <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                  All Media ({media.length})
                </h3>
                <div className="space-y-4">
                  {media.map((mediaItem) => (
                    <div
                      key={mediaItem.id}
                      className="flex items-center justify-between p-4 bg-hostvue-light rounded-2xl hover:bg-gray-50 transition-colors"
                      style={{ backgroundColor: '#F7F7F7' }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                          <img
                            src={mediaItem.url}
                            alt={mediaItem.altText || 'Media thumbnail'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/64x64/e5e7eb/9ca3af?text=N/A';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-hostvue-dark" style={{ color: '#2C2C2C' }}>
                            {mediaItem.position === 0 ? 'Main Image' : `Gallery Image ${mediaItem.position}`}
                          </p>
                          <p className="text-sm text-hostvue-gray" style={{ color: '#6B7280' }}>
                            {mediaItem.altText || 'No description'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-hostvue-primary text-white" style={{ backgroundColor: '#D87441' }}>
                          Position {mediaItem.position}
                        </span>
                        {mediaItem.mimeType && (
                          <p className="text-xs text-hostvue-gray mt-1" style={{ color: '#6B7280' }}>{mediaItem.mimeType}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Location Details */}
            <div className="mb-8 bg-white rounded-3xl p-8 shadow-soft">
              <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>Location Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-hostvue-gray" style={{ color: '#6B7280' }}>Name</label>
                  <p className="text-hostvue-dark font-medium text-lg" style={{ color: '#2C2C2C' }}>{location.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-hostvue-gray" style={{ color: '#6B7280' }}>City</label>
                  <p className="text-hostvue-dark" style={{ color: '#2C2C2C' }}>{location.city}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-hostvue-gray" style={{ color: '#6B7280' }}>Region/Department</label>
                  <p className="text-hostvue-dark" style={{ color: '#2C2C2C' }}>{location.region}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-hostvue-gray" style={{ color: '#6B7280' }}>Country</label>
                  <p className="text-hostvue-dark flex items-center" style={{ color: '#2C2C2C' }}>
                    <Globe className="h-4 w-4 mr-2 text-hostvue-primary" style={{ color: '#D87441' }} />
                    {location.country}
                  </p>
                </div>
                {location.lat && location.lon && (
                  <div>
                    <label className="text-sm font-medium text-hostvue-gray" style={{ color: '#6B7280' }}>Coordinates</label>
                    <p className="text-hostvue-dark" style={{ color: '#2C2C2C' }}>{location.lat}, {location.lon}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-hostvue-primary hover:text-hostvue-secondary text-sm underline transition-colors"
                      style={{ color: '#D87441' }}
                    >
                      View on Google Maps
                    </a>
                  </div>
                )}
                {location.slug && (
                  <div>
                    <label className="text-sm font-medium text-hostvue-gray" style={{ color: '#6B7280' }}>Slug</label>
                    <p className="text-hostvue-dark font-mono text-sm bg-hostvue-light px-3 py-2 rounded-lg" style={{ color: '#2C2C2C', backgroundColor: '#F7F7F7' }}>{location.slug}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-hostvue-gray" style={{ color: '#6B7280' }}>Location ID</label>
                  <p className="text-hostvue-gray font-mono text-xs break-all bg-hostvue-light px-3 py-2 rounded-lg" style={{ color: '#6B7280', backgroundColor: '#F7F7F7' }}>{location.id}</p>
                </div>
              </div>
            </div>

            {/* Media Summary */}
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>Media Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-hostvue-light rounded-xl" style={{ backgroundColor: '#F7F7F7' }}>
                  <span className="text-hostvue-gray font-medium" style={{ color: '#6B7280' }}>Total Images</span>
                  <span className="font-bold text-xl text-hostvue-primary" style={{ color: '#D87441' }}>{media.length}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-hostvue-light rounded-xl" style={{ backgroundColor: '#F7F7F7' }}>
                  <span className="text-hostvue-gray font-medium" style={{ color: '#6B7280' }}>Main Image</span>
                  <span className={`font-bold text-xl ${mainImage ? 'text-green-600' : 'text-red-500'}`}>{mainImage ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-hostvue-light rounded-xl" style={{ backgroundColor: '#F7F7F7' }}>
                  <span className="text-hostvue-gray font-medium" style={{ color: '#6B7280' }}>Gallery Images</span>
                  <span className="font-bold text-xl text-hostvue-primary" style={{ color: '#D87441' }}>{otherImages.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
