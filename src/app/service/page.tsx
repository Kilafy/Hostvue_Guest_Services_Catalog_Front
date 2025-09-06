'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, Globe, Calendar, MapPin, Tag } from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: string;
  providerId: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  durationMinutes: number;
  minCapacity?: number;
  maxCapacity?: number;
  languageOffered: string[];
  status: string;
  createdAt: number[];
  updatedAt?: number[];
}

interface Provider {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  description?: string;
}

interface Media {
  id: string;
  url: string;
  altText?: string;
  description?: string;
  position: number;
  mimeType?: string;
}

export default function ServiceDetailsPage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('id');
  
  const [service, setService] = useState<Service | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServiceDetails = useCallback(async () => {
    if (!serviceId) return;
    
    try {
      const response = await fetch(`http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/services/${serviceId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch service details');
      }
      const data = await response.json();
      setService(data);
      
      if (data.providerId) {
        fetchProviderDetails(data.providerId);
      }
    } catch (err) {
      console.error('Error fetching service details:', err);
    }
  }, [serviceId]);

  const fetchProviderDetails = useCallback(async (providerId: string) => {
    try {
      const response = await fetch(`http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/providers/${providerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch provider details');
      }
      const data = await response.json();
      setProvider(data);
    } catch (err) {
      console.error('Error fetching provider details:', err);
    }
  }, []);

  const fetchServiceMedia = useCallback(async () => {
    try {
      const response = await fetch('http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/media');
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      const allMedia = await response.json();
      
      const serviceMedia = allMedia
        .filter((mediaItem: Media) => mediaItem.url.includes(serviceId))
        .sort((a: Media, b: Media) => a.position - b.position);
      
      setMedia(serviceMedia);
    } catch (err) {
      console.error('Error fetching media:', err);
    } finally {
      setIsLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetails();
      fetchServiceMedia();
    }
  }, [serviceId, fetchServiceDetails, fetchServiceMedia]);

  const formatDate = (dateArray: number[]) => {
    if (!dateArray || dateArray.length < 3) return 'N/A';
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toLocaleDateString();
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Media processing
  const mainImage = media.find(m => m.position === 0);
  const otherImages = media.filter(m => m.position !== 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#D87441' }}></div>
          <p className="text-hostvue-gray text-lg" style={{ color: '#6B7280' }}>Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Tag className="h-16 w-16 mx-auto mb-4 text-hostvue-gray" style={{ color: '#6B7280' }} />
          <h1 className="font-display font-bold text-2xl text-hostvue-dark mb-2" style={{ color: '#2C2C2C' }}>
            Service not found
          </h1>
          <p className="text-hostvue-gray mb-6" style={{ color: '#6B7280' }}>
            The service you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button 
              className="bg-hostvue-primary hover:bg-hostvue-primary/90 text-white"
              style={{ backgroundColor: '#D87441' }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
                {service.title}
              </h1>
              {service.shortDescription && (
                <p className="text-xl text-hostvue-gray mb-6" style={{ color: '#6B7280' }}>{service.shortDescription}</p>
              )}
              <div className="flex items-center gap-4 text-sm">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  service.status === 'active' ? 'bg-green-100 text-green-800' : 
                  service.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  <Tag className="h-3 w-3 mr-1" />
                  {service.status}
                </span>
                {provider && (
                  <span className="flex items-center text-hostvue-gray" style={{ color: '#6B7280' }}>
                    <MapPin className="h-4 w-4 mr-1 text-hostvue-primary" style={{ color: '#D87441' }} />
                    Provider: {provider.name}
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center text-sm text-hostvue-gray mb-1" style={{ color: '#6B7280' }}>
                <Calendar className="h-4 w-4 mr-1" />
                Created: {formatDate(service.createdAt)}
              </div>
              {service.updatedAt && (
                <div className="flex items-center text-sm text-hostvue-gray" style={{ color: '#6B7280' }}>
                  <Calendar className="h-4 w-4 mr-1" />
                  Updated: {formatDate(service.updatedAt)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Media Gallery */}
            {media.length > 0 && (
              <div className="bg-white rounded-3xl shadow-soft p-8 mb-8">
                <h2 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                  Media Gallery
                </h2>
                
                {/* Main Image */}
                {mainImage && (
                  <div className="mb-8">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={mainImage.url}
                        alt={mainImage.altText || `Main image of ${service.title}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/800x400/e5e7eb/9ca3af?text=Image+Not+Available';
                        }}
                      />
                    </div>
                    {mainImage.altText && (
                      <p className="text-sm text-hostvue-gray mt-3" style={{ color: '#6B7280' }}>
                        {mainImage.altText}
                      </p>
                    )}
                  </div>
                )}

                {/* Gallery Images */}
                {otherImages.length > 0 && (
                  <div>
                    <h3 className="font-display font-semibold text-lg text-hostvue-dark mb-4" style={{ color: '#2C2C2C' }}>
                      Gallery ({otherImages.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {otherImages.slice(0, 6).map((mediaItem, index) => (
                        <div
                          key={mediaItem.id}
                          className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-md"
                        >
                          <img
                            src={mediaItem.url}
                            alt={mediaItem.altText || `Gallery image ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/300x300/e5e7eb/9ca3af?text=Image+Not+Available';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {otherImages.length > 6 && (
                      <p className="text-sm text-hostvue-gray mt-4" style={{ color: '#6B7280' }}>
                        +{otherImages.length - 6} more images
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Main Image (standalone if no gallery) */}
            {!media.length && mainImage && (
              <div className="bg-white rounded-3xl shadow-soft p-8 mb-8">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={mainImage.url}
                    alt={mainImage.altText || `Main image of ${service.title}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/800x400/e5e7eb/9ca3af?text=Image+Not+Available';
                    }}
                  />
                </div>
                {mainImage.altText && (
                  <p className="text-sm text-hostvue-gray mt-3" style={{ color: '#6B7280' }}>
                    {mainImage.altText}
                  </p>
                )}
              </div>
            )}

            {/* No Image Placeholder */}
            {!mainImage && (
              <div className="bg-white rounded-3xl shadow-soft p-8 mb-8">
                <div className="aspect-video rounded-2xl bg-hostvue-light flex items-center justify-center" style={{ backgroundColor: '#F7F7F7' }}>
                  <div className="text-center text-hostvue-gray" style={{ color: '#6B7280' }}>
                    <Tag className="h-16 w-16 mx-auto mb-2 opacity-50" />
                    <p>No image available</p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-3xl shadow-soft p-8 mb-8">
              <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                Description
              </h3>
              <div className="prose prose-lg max-w-none text-hostvue-gray" style={{ color: '#6B7280' }}>
                {service.longDescription ? (
                  <p className="leading-relaxed whitespace-pre-wrap">{service.longDescription}</p>
                ) : (
                  <p className="italic">No description available</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Service Details */}
            <div className="bg-white rounded-3xl shadow-soft p-8 mb-8">
              <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                Service Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                    Duration
                  </label>
                  <p className="text-hostvue-dark flex items-center text-lg" style={{ color: '#2C2C2C' }}>
                    <Clock className="h-5 w-5 mr-2 text-hostvue-primary" style={{ color: '#D87441' }} />
                    {formatDuration(service.durationMinutes)}
                  </p>
                </div>
                
                {(service.minCapacity || service.maxCapacity) && (
                  <div>
                    <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                      Capacity
                    </label>
                    <p className="text-hostvue-dark flex items-center text-lg" style={{ color: '#2C2C2C' }}>
                      <Users className="h-5 w-5 mr-2 text-hostvue-primary" style={{ color: '#D87441' }} />
                      {service.minCapacity && service.maxCapacity 
                        ? `${service.minCapacity} - ${service.maxCapacity} people`
                        : service.minCapacity 
                        ? `Min ${service.minCapacity} people`
                        : `Max ${service.maxCapacity} people`
                      }
                    </p>
                  </div>
                )}
                
                {service.languageOffered && service.languageOffered.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                      Languages
                    </label>
                    <p className="text-hostvue-dark flex items-center text-lg" style={{ color: '#2C2C2C' }}>
                      <Globe className="h-5 w-5 mr-2 text-hostvue-primary" style={{ color: '#D87441' }} />
                      {service.languageOffered.join(', ')}
                    </p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                    Service ID
                  </label>
                  <p className="text-hostvue-gray font-mono text-xs break-all" style={{ color: '#6B7280' }}>{service.id}</p>
                </div>
              </div>
            </div>

            {/* Provider Details */}
            {provider && (
              <div className="bg-white rounded-3xl shadow-soft p-8 mb-8">
                <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                  Provider
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                      Name
                    </label>
                    <p className="text-hostvue-dark text-lg" style={{ color: '#2C2C2C' }}>{provider.name}</p>
                  </div>
                  {provider.email && (
                    <div>
                      <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                        Email
                      </label>
                      <p className="text-hostvue-dark text-lg" style={{ color: '#2C2C2C' }}>{provider.email}</p>
                    </div>
                  )}
                  {provider.phone && (
                    <div>
                      <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                        Phone
                      </label>
                      <p className="text-hostvue-dark text-lg" style={{ color: '#2C2C2C' }}>{provider.phone}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                      Provider ID
                    </label>
                    <p className="text-hostvue-gray font-mono text-xs break-all" style={{ color: '#6B7280' }}>{provider.id}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Media Summary */}
            <div className="bg-white rounded-3xl shadow-soft p-8">
              <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                Media Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-hostvue-gray font-medium" style={{ color: '#6B7280' }}>Total Images</span>
                  <span className="font-bold text-hostvue-dark text-lg" style={{ color: '#2C2C2C' }}>{media.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-hostvue-gray font-medium" style={{ color: '#6B7280' }}>Main Image</span>
                  <span className={`font-bold text-lg ${mainImage ? 'text-green-600' : 'text-red-600'}`}>
                    {mainImage ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-hostvue-gray font-medium" style={{ color: '#6B7280' }}>Gallery Images</span>
                  <span className="font-bold text-hostvue-dark text-lg" style={{ color: '#2C2C2C' }}>{otherImages.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
