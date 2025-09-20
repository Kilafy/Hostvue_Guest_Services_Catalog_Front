'use client';
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, Globe, Calendar, MapPin, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { servicesApi, providersApi, ApiService, ApiProvider } from '@/services/api';

export default function ServiceDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#D87441' }}></div>
          <p className="text-hostvue-gray text-lg" style={{ color: '#6B7280' }}>Loading service details...</p>
        </div>
      </div>
    }>
      <ServiceDetailsContent />
    </Suspense>
  );
}

function ServiceDetailsContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('id');
  
  const [service, setService] = useState<ApiService | null>(null);
  const [provider, setProvider] = useState<ApiProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProviderDetails = useCallback(async (providerId: string) => {
    try {
      const data = await providersApi.getProviderById(providerId);
      setProvider(data);
    } catch (err) {
      console.error('Error fetching provider details:', err);
      setProvider(null);
    }
  }, []);

  const fetchServiceDetails = useCallback(async () => {
    if (!serviceId) return;
    
    try {
      const data = await servicesApi.getServiceById(serviceId);
      setService(data);
      
      if (data.providerId) {
        fetchProviderDetails(data.providerId);
      }
    } catch (err) {
      console.error('Error fetching service details:', err);
      setService(null);
    } finally {
      setIsLoading(false);
    }
  }, [serviceId, fetchProviderDetails]);

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetails();
    }
  }, [serviceId, fetchServiceDetails]);

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
            The service you are looking for does not exist or has been removed.
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
                    Provider: {provider.companyName || provider.legalName || 'Unknown Provider'}
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

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {service.imageUrl && (
              <div className="bg-white rounded-3xl shadow-soft p-8 mb-8">
                <h2 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                  Service Image
                </h2>
                
                <div className="mb-8">
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={service.imageUrl}
                      alt={`Image of ${service.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

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

          <div className="lg:col-span-1">
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
                    {formatDuration(service.durationMinutes || 0)}
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
              </div>
            </div>

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
                    <p className="text-hostvue-dark text-lg" style={{ color: '#2C2C2C' }}>
                      {provider.companyName || provider.legalName || 'Unknown Provider'}
                    </p>
                  </div>
                  {provider.description && (
                    <div>
                      <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                        Description
                      </label>
                      <p className="text-hostvue-dark text-lg" style={{ color: '#2C2C2C' }}>{provider.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
