"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { useHomepageData } from "@/hooks/useData";

export default function HomePage() {
  const { data: homepageData, loading, error } = useHomepageData();
  
  const heroFeatures = [
    { icon: CheckCircle, text: "24/7 Customer Support" },
    { icon: CheckCircle, text: "Best Price Guarantee" },
    { icon: CheckCircle, text: "Instant Confirmation" },
    { icon: CheckCircle, text: "Free Cancellation" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
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
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  const featuredServices = homepageData?.featuredServices || [];
  const categories = homepageData?.categories || [];
  const popularDestinations = homepageData?.popularDestinations || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Featured Services */}
      <section className="py-16 bg-hostvue-light" style={{ backgroundColor: '#F7F7F7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <Link
              href="/services"
              className="hidden md:flex items-center text-hostvue-primary hover:text-hostvue-secondary font-medium transition-colors"
              style={{ color: '#D87441' }}
            >
              View All <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              href="/services"
              className="inline-flex items-center text-hostvue-primary hover:text-hostvue-secondary font-medium transition-colors"
              style={{ color: '#D87441' }}
            >
              View All Experiences <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-hostvue-cream to-hostvue-light overflow-hidden" style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #F7F7F7 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                Discover Amazing
                <span className="text-hostvue-primary block" style={{ color: '#D87441' }}>
                  Tourism Experiences
                </span>
              </h1>
              <p className="text-xl text-hostvue-gray mb-8 max-w-lg" style={{ color: '#6B7280' }}>
                Explore incredible destinations with local experts. From
                cultural tours to adventure activities, create unforgettable
                memories with personalized recommendations and 24/7 assistance.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>
                      Where to?
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-hostvue-gray" style={{ color: '#6B7280' }} />
                      <input
                        type="text"
                        placeholder="Enter destination"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-hostvue-primary"
                        style={{ borderColor: '#E5E7EB' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>
                      When?
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-hostvue-primary"
                      style={{ borderColor: '#E5E7EB' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>
                      Guests
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-hostvue-primary" style={{ borderColor: '#E5E7EB' }}>
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3-5 Guests</option>
                      <option>6+ Guests</option>
                    </select>
                  </div>
                </div>
                <button className="w-full mt-4 bg-hostvue-primary hover:bg-hostvue-secondary text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center" style={{ backgroundColor: '#D87441' }}>
                  <Search className="h-5 w-5 mr-2" />
                  Search Experiences
                </button>
              </div>

              {/* Hero Features */}
              <div className="grid grid-cols-2 gap-4">
                {heroFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <feature.icon className="h-5 w-5 text-hostvue-primary" style={{ color: '#D87441' }} />
                    <span className="text-hostvue-gray" style={{ color: '#6B7280' }}>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
                alt="Beautiful travel destination"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="font-bold text-2xl text-hostvue-primary" style={{ color: '#D87441' }}>
                      4.9
                    </div>
                    <div className="text-sm text-hostvue-gray" style={{ color: '#6B7280' }}>Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-hostvue-primary" style={{ color: '#D87441' }}>
                      10K+
                    </div>
                    <div className="text-sm text-hostvue-gray" style={{ color: '#6B7280' }}>Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-hostvue-primary" style={{ color: '#D87441' }}>
                      50+
                    </div>
                    <div className="text-sm text-hostvue-gray" style={{ color: '#6B7280' }}>Cities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-hostvue-dark mb-4" style={{ color: '#2C2C2C' }}>
              Explore by Category
            </h2>
            <p className="text-xl text-hostvue-gray max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Find the perfect experience that matches your interests and travel
              style
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group text-center p-6 rounded-2xl border border-gray-100 hover:border-hostvue-primary transition-all duration-200 hover:shadow-card"
              >
                <div
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  {category.icon}
                </div>
                <h3 className="font-semibold text-hostvue-dark group-hover:text-hostvue-primary transition-colors" style={{ color: '#2C2C2C' }}>
                  {category.name}
                </h3>
                <p className="text-sm text-hostvue-gray mt-1" style={{ color: '#6B7280' }}>
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-hostvue-dark mb-4" style={{ color: '#2C2C2C' }}>
              Popular Destinations
            </h2>
            <p className="text-xl text-hostvue-gray max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Discover the most loved cities with thousands of amazing
              experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.id}`}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300"
              >
                <Image
                  src={destination.imageUrl}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl mb-1">{destination.name}</h3>
                  <p className="text-sm opacity-90 mb-2">
                    {destination.country}
                  </p>
                  <div className="text-sm">
                    {destination.serviceCount} experiences
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-hostvue-primary to-hostvue-secondary" style={{ background: 'linear-gradient(135deg, #D87441 0%, #C86635 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust us to create amazing
            experiences. Book now and start your journey with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="bg-white text-hostvue-primary hover:bg-hostvue-light font-medium px-8 py-3 rounded-xl transition-colors duration-200 shadow-lg"
              style={{ color: '#D87441' }}
            >
              Explore All Experiences
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-hostvue-primary font-medium px-8 py-3 rounded-xl transition-all duration-200"
              style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
