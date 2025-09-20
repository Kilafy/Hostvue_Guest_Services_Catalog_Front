import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, Users, MapPin, Calendar, Shield, Heart, Share2, Check, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TourismService } from '@/types/tourism';

interface ServiceDetailProps {
  service: TourismService;
}

export default function ServiceDetailPage({ service }: ServiceDetailProps) {
  const discountPercentage = service.originalPrice 
    ? Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-hostvue-light py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-hostvue-gray">
            <Link href="/" className="hover:text-hostvue-primary">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-hostvue-primary">Experiences</Link>
            <span>/</span>
            <Link href={`/destinations/${service.city.toLowerCase()}`} className="hover:text-hostvue-primary">
              {service.city}
            </Link>
            <span>/</span>
            <span className="text-hostvue-dark">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <Link 
              href="/services"
              className="inline-flex items-center text-hostvue-primary hover:text-hostvue-secondary mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Experiences
            </Link>

            {/* Title and Basic Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: service.category?.color || '#6B7280' }}
                >
                  {service.category ? (
                    `${service.category.icon} ${service.category.name}`
                  ) : (
                    '❓ Category not found'
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-hostvue-gray hover:text-hostvue-primary transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-hostvue-gray hover:text-hostvue-primary transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h1 className="font-display font-bold text-3xl md:text-4xl text-hostvue-dark mb-4">
                {service.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-hostvue-gray mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {service.city}, {service.country}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Up to {service.groupSize.max} people
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-hostvue-dark ml-1">{service.rating}</span>
                  <span className="text-hostvue-gray ml-1">
                    ({service.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl overflow-hidden">
                <div className="md:col-span-2">
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  {service.imageGallery.slice(1, 3).map((image, index) => (
                    <div key={index} className="relative h-32 md:h-[152px]">
                      <Image
                        src={image}
                        alt={`${service.title} ${index + 2}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      {index === 1 && service.imageGallery.length > 3 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                          <span className="text-white font-medium">
                            +{service.imageGallery.length - 3} more
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-hostvue-dark mb-4">
                About This Experience
              </h2>
              <p className="text-hostvue-gray leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* What's Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-lg text-hostvue-dark mb-4">What&apos;s Included</h3>
                <ul className="space-y-2">
                  {service.includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-hostvue-gray">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-hostvue-dark mb-4">What&apos;s Not Included</h3>
                <ul className="space-y-2">
                  {service.excludes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-hostvue-gray">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-hostvue-light rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-lg text-hostvue-dark mb-4">Important Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-hostvue-dark">Meeting Point:</strong>
                  <p className="text-hostvue-gray mt-1">{service.meetingPoint}</p>
                </div>
                <div>
                  <strong className="text-hostvue-dark">Languages:</strong>
                  <p className="text-hostvue-gray mt-1">{service.languages.join(', ')}</p>
                </div>
                <div>
                  <strong className="text-hostvue-dark">Group Size:</strong>
                  <p className="text-hostvue-gray mt-1">
                    {service.groupSize.min}-{service.groupSize.max} participants
                  </p>
                </div>
                <div>
                  <strong className="text-hostvue-dark">Difficulty:</strong>
                  <p className="text-hostvue-gray mt-1 capitalize">{service.difficulty}</p>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-semibold text-lg text-hostvue-dark">Cancellation Policy</h3>
              </div>
              <p className="text-hostvue-gray">{service.cancellationPolicy}</p>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="card p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    {service.originalPrice && (
                      <span className="text-hostvue-gray text-lg line-through">
                        ${service.originalPrice}
                      </span>
                    )}
                    {discountPercentage > 0 && (
                      <span className="bg-hostvue-primary text-white px-2 py-1 rounded text-sm font-medium">
                        -{discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-hostvue-primary">
                      ${service.price}
                    </span>
                    <span className="text-hostvue-gray ml-1">per person</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-hostvue-gray mb-2">
                      Select Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-hostvue-gray" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-hostvue-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-hostvue-gray mb-2">
                      Number of Guests
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-hostvue-primary">
                      {Array.from({ length: service.groupSize.max }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="w-full bg-hostvue-primary hover:bg-hostvue-secondary text-white font-medium py-4 px-6 rounded-xl transition-colors duration-200 mb-4">
                  Book Now
                </button>

                <div className="text-center">
                  <p className="text-sm text-hostvue-gray mb-2">Free cancellation up to 24 hours before</p>
                  <p className="text-sm text-hostvue-gray">Reserve now & pay later</p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-hostvue-dark mb-3">Why Book With Us?</h4>
                  <ul className="space-y-2 text-sm text-hostvue-gray">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Best price guarantee
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Instant confirmation
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      24/7 customer support
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Free cancellation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
