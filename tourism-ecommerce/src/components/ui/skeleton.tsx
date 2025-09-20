import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden group">
      {/* Image skeleton */}
      <div className="relative h-48">
        <Skeleton className="w-full h-full" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-6">
        {/* Category badge skeleton */}
        <div className="mb-3">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        
        {/* Title skeleton */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        
        {/* Description skeleton */}
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        
        {/* Meta info skeleton */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-8 mr-1" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
        
        {/* Price and button skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-6 w-16 mb-1" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="text-center p-6 rounded-2xl border border-gray-100">
      {/* Icon skeleton */}
      <div className="w-16 h-16 mx-auto rounded-2xl mb-4">
        <Skeleton className="w-full h-full rounded-2xl" />
      </div>
      
      {/* Title skeleton */}
      <Skeleton className="h-5 w-20 mx-auto mb-2" />
      
      {/* Description skeleton */}
      <Skeleton className="h-4 w-24 mx-auto" />
    </div>
  );
}

export function DestinationCardSkeleton() {
  return (
    <div className="relative h-64 rounded-2xl overflow-hidden shadow-card">
      {/* Image skeleton */}
      <Skeleton className="w-full h-full" />
      
      {/* Content skeleton overlay */}
      <div className="absolute bottom-4 left-4">
        <Skeleton className="h-6 w-32 mb-1 bg-gray-300" />
        <Skeleton className="h-4 w-20 mb-2 bg-gray-300" />
        <Skeleton className="h-4 w-24 bg-gray-300" />
      </div>
    </div>
  );
}

export function ServiceListItemSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Title skeleton */}
          <Skeleton className="h-5 w-64 mb-2" />
          
          {/* Description skeleton */}
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4 mb-3" />
          
          {/* Meta info skeleton */}
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {/* Status badge skeleton */}
          <Skeleton className="h-6 w-16 rounded-full" />
          
          {/* Action buttons skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-8 w-14 rounded" />
            <Skeleton className="h-8 w-18 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
