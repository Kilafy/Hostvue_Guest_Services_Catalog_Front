'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Globe, ExternalLink } from 'lucide-react';
import { ApiLocation } from '@/services/api';

interface LocationCardProps {
  location: ApiLocation;
  className?: string;
}

export default function LocationCard({ location, className = '' }: LocationCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Use the actual location image URL if available and no error occurred
  const showActualImage = location.imageUrl && !imageError;

  return (
    <Link href={`/locations/${location.id}`}>
      <div className={`bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer ${className}`}>
        {/* Location Image */}
        <div className="aspect-video w-full bg-gradient-to-br from-hostvue-primary to-hostvue-secondary relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #D87441 0%, #C86635 100%)' }}>
          {showActualImage ? (
            <Image
              src={location.imageUrl!}
              alt={`${location.city}, ${location.region || location.country}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <svg className="h-16 w-16 mx-auto mb-4 opacity-75" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <h3 className="text-xl font-bold">{location.city}</h3>
                <p className="text-sm opacity-90">{location.region || location.country}</p>
              </div>
            </div>
          )}
          
          {/* Overlay with location info on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white">
              <ExternalLink className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">View Details</p>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="p-6">
          {/* Main Info */}
          <div className="mb-4">
            <h3 className="font-display font-bold text-xl text-hostvue-dark mb-2 group-hover:text-hostvue-primary transition-colors" style={{ color: '#2C2C2C' }}>
              {location.city}
            </h3>
            
            <div className="flex items-center text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>
              <MapPin className="h-4 w-4 mr-2 text-hostvue-primary" style={{ color: '#D87441' }} />
              <span className="text-sm">
                {location.region && `${location.region}, `}{location.country}
              </span>
            </div>

            {location.lat && location.lon && (
              <div className="flex items-center text-hostvue-gray text-xs" style={{ color: '#6B7280' }}>
                <Globe className="h-3 w-3 mr-1" />
                <span>{location.lat?.toFixed(4)}, {location.lon?.toFixed(4)}</span>
              </div>
            )}
          </div>

          {/* Slug */}
          {location.slug && (
            <div className="mb-4">
              <span className="inline-block bg-hostvue-light text-hostvue-gray text-xs px-2 py-1 rounded-lg font-mono" style={{ backgroundColor: '#F7F7F7', color: '#6B7280' }}>
                /{location.slug}
              </span>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-hostvue-gray text-sm" style={{ color: '#6B7280' }}>
              Explore destination
            </span>
            <div className="flex items-center text-hostvue-primary group-hover:text-hostvue-secondary transition-colors" style={{ color: '#D87441' }}>
              <span className="text-sm font-medium mr-1">View</span>
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
