'use client';
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Tag, Calendar, Folder } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  slug?: string;
  createdAt: number[];
}

interface Service {
  id: string;
  title: string;
  shortDescription?: string;
  status: string;
}

export default function CategoryDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#D87441' }}></div>
          <p className="text-hostvue-gray text-lg" style={{ color: '#6B7280' }}>Loading category details...</p>
        </div>
      </div>
    }>
      <CategoryDetailsContent />
    </Suspense>
  );
}

function CategoryDetailsContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  
  const [category, setCategory] = useState<Category | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [parentCategory, setParentCategory] = useState<Category | null>(null);
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryDetails = useCallback(async () => {
    if (!categoryId) return;
    
    try {
      const response = await fetch(`http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category details');
      }
      const data = await response.json();
      setCategory(data);
      
      // Fetch parent category if exists
      if (data.parentId) {
        fetchParentCategory(data.parentId);
      }
    } catch (err) {
      console.error('Error fetching category:', err);
      setError('Failed to load category details');
    }
  }, [categoryId]);

  const fetchParentCategory = async (parentId: string) => {
    try {
      const response = await fetch(`http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/categories/${parentId}`);
      if (response.ok) {
        const parentData = await response.json();
        setParentCategory(parentData);
      }
    } catch (err) {
      console.error('Error fetching parent category:', err);
    }
  };

  const fetchRelatedData = useCallback(async () => {
    if (!categoryId) return;
    
    try {
      // Fetch all categories to find children
      const categoriesResponse = await fetch('http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/categories');
      if (categoriesResponse.ok) {
        const allCategories = await categoriesResponse.json();
        const children = allCategories.filter((cat: Category) => cat.parentId === categoryId);
        setChildCategories(children);
      }

      // Fetch all services to find ones in this category
      const servicesResponse = await fetch('http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/services');
      if (servicesResponse.ok) {
        const allServices = await servicesResponse.json();
        // Filter services that have this category in their categoryIds array
        const relatedServices = allServices.filter((service: Service & { categoryIds?: string[] }) => 
          service.categoryIds && service.categoryIds.includes(categoryId)
        );
        setServices(relatedServices);
      }
    } catch (err) {
      console.error('Error fetching related data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryDetails();
      fetchRelatedData();
    }
  }, [categoryId, fetchCategoryDetails, fetchRelatedData]);

  const formatDate = (dateArray: number[]) => {
    if (!dateArray || dateArray.length < 3) return 'Unknown';
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#D87441' }}></div>
          <p className="text-hostvue-gray text-lg" style={{ color: '#6B7280' }}>Loading category details...</p>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Tag className="h-16 w-16 mx-auto mb-4 text-hostvue-gray" style={{ color: '#6B7280' }} />
          <h1 className="font-display font-bold text-2xl text-hostvue-dark mb-2" style={{ color: '#2C2C2C' }}>
            Category not found
          </h1>
          <p className="text-hostvue-gray mb-6" style={{ color: '#6B7280' }}>
            {error || 'The category you\'re looking for doesn\'t exist or has been removed.'}
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
                {category.name}
              </h1>
              {category.description && (
                <p className="text-xl text-hostvue-gray mb-6" style={{ color: '#6B7280' }}>{category.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Tag className="h-3 w-3 mr-1" />
                  Category
                </span>
                {parentCategory && (
                  <span className="flex items-center text-hostvue-gray" style={{ color: '#6B7280' }}>
                    <Folder className="h-4 w-4 mr-1 text-hostvue-primary" style={{ color: '#D87441' }} />
                    Parent: {parentCategory.name}
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center text-sm text-hostvue-gray mb-1" style={{ color: '#6B7280' }}>
                <Calendar className="h-4 w-4 mr-1" />
                Created: {formatDate(category.createdAt)}
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Description */}
            <div className="bg-white rounded-3xl shadow-soft p-8 mb-8" style={{ boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)' }}>
              <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                Description
              </h3>
              <div className="prose prose-lg max-w-none text-hostvue-gray" style={{ color: '#6B7280' }}>
                {category.description ? (
                  <p className="leading-relaxed whitespace-pre-wrap">{category.description}</p>
                ) : (
                  <p className="italic">No description available</p>
                )}
              </div>
            </div>

            {/* Related Services */}
            {services.length > 0 && (
              <div className="bg-white rounded-3xl shadow-soft p-8 mb-8" style={{ boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)' }}>
                <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                  Services in this Category ({services.length})
                </h3>
                <div className="space-y-4">
                  {services.map((service) => (
                    <Link 
                      key={service.id}
                      href={`/service?id=${service.id}`}
                      className="block"
                    >
                      <div className="flex items-center justify-between p-6 bg-hostvue-light rounded-2xl hover:shadow-md transition-all duration-200 cursor-pointer" style={{ backgroundColor: '#F7F7F7' }}>
                        <div className="flex-1">
                          <h4 className="font-display font-semibold text-lg text-hostvue-dark mb-2" style={{ color: '#2C2C2C' }}>
                            {service.title}
                          </h4>
                          {service.shortDescription && (
                            <p className="text-hostvue-gray" style={{ color: '#6B7280' }}>
                              {service.shortDescription}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            service.status === 'active' ? 'bg-green-100 text-green-800' : 
                            service.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {service.status}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {/* Child Categories */}
            {childCategories.length > 0 && (
              <div className="bg-white rounded-3xl shadow-soft p-8 mb-8" style={{ boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)' }}>
                <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                  Subcategories ({childCategories.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {childCategories.map((child) => (
                    <Link 
                      key={child.id}
                      href={`/category?id=${child.id}`}
                      className="block"
                    >
                      <div className="p-6 bg-hostvue-light rounded-2xl hover:shadow-md transition-all duration-200 cursor-pointer" style={{ backgroundColor: '#F7F7F7' }}>
                        <h4 className="font-display font-semibold text-lg text-hostvue-dark mb-2" style={{ color: '#2C2C2C' }}>
                          {child.name}
                        </h4>
                        {child.description && (
                          <p className="text-hostvue-gray mb-2" style={{ color: '#6B7280' }}>{child.description}</p>
                        )}
                        {child.slug && (
                          <p className="text-xs text-hostvue-gray font-mono" style={{ color: '#6B7280' }}>{child.slug}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Category Details */}
            <div className="bg-white rounded-3xl shadow-soft p-8 mb-8" style={{ boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)' }}>
              <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                Category Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                    Name
                  </label>
                  <p className="text-hostvue-dark text-lg" style={{ color: '#2C2C2C' }}>{category.name}</p>
                </div>
                
                {category.slug && (
                  <div>
                    <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                      Slug
                    </label>
                    <p className="text-hostvue-dark font-mono text-sm" style={{ color: '#2C2C2C' }}>{category.slug}</p>
                  </div>
                )}
                
                {parentCategory && (
                  <div>
                    <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                      Parent Category
                    </label>
                    <Link href={`/category?id=${parentCategory.id}`} className="block">
                      <p className="text-hostvue-primary hover:text-hostvue-primary/80 underline text-lg" style={{ color: '#D87441' }}>
                        {parentCategory.name}
                      </p>
                    </Link>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-semibold text-hostvue-gray uppercase tracking-wide mb-2 block" style={{ color: '#6B7280' }}>
                    Category ID
                  </label>
                  <p className="text-hostvue-gray font-mono text-xs break-all" style={{ color: '#6B7280' }}>{category.id}</p>
                </div>
              </div>
            </div>
            {/* Summary */}
            <div className="bg-white rounded-3xl shadow-soft p-8" style={{ boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)' }}>
              <h3 className="font-display font-bold text-2xl text-hostvue-dark mb-6" style={{ color: '#2C2C2C' }}>
                Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-hostvue-gray font-medium" style={{ color: '#6B7280' }}>Related Services</span>
                  <span className="font-bold text-hostvue-dark text-lg" style={{ color: '#2C2C2C' }}>{services.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-hostvue-gray font-medium" style={{ color: '#6B7280' }}>Subcategories</span>
                  <span className="font-bold text-hostvue-dark text-lg" style={{ color: '#2C2C2C' }}>{childCategories.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-hostvue-gray font-medium" style={{ color: '#6B7280' }}>Has Parent</span>
                  <span className={`font-bold text-lg ${parentCategory ? 'text-green-600' : 'text-red-600'}`}>
                    {parentCategory ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
