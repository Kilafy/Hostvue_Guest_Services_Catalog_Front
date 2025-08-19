import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Users, MapPin } from 'lucide-react';
import { TourismService } from '@/types/tourism';

interface ServiceCardProps {
  service: TourismService;
  className?: string;
}

export default function ServiceCard({ service, className = '' }: ServiceCardProps) {
  const discountPercentage = service.originalPrice 
    ? Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)
    : 0;

  return (
    <div className={`card card-hover ${className}`}>
      <Link href={`/services/${service.id}`}>
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-hostvue-primary text-white px-2 py-1 rounded-lg text-sm font-medium">
              -{discountPercentage}%
            </div>
          )}
          
          {/* Category Badge */}
          <div 
            className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium text-white"
            style={{ backgroundColor: service.category.color }}
          >
            {service.category.icon} {service.category.name}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Location */}
          <div className="flex items-center text-hostvue-gray text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {service.city}, {service.country}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg text-hostvue-dark mb-2 line-clamp-2 hover:text-hostvue-primary transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-hostvue-gray text-sm mb-4 line-clamp-2">
            {service.shortDescription}
          </p>

          {/* Features */}
          <div className="flex items-center justify-between text-sm text-hostvue-gray mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {service.duration}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Max {service.groupSize.max}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium text-hostvue-dark ml-1">
                {service.rating}
              </span>
            </div>
            <span className="text-hostvue-gray text-sm ml-2">
              ({service.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              {service.originalPrice && (
                <span className="text-hostvue-gray text-sm line-through mr-2">
                  ${service.originalPrice}
                </span>
              )}
              <span className="text-hostvue-primary font-bold text-xl">
                ${service.price}
              </span>
            </div>
            <button className="bg-hostvue-primary hover:bg-hostvue-secondary text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
