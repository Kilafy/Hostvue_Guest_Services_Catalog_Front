'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
// Using inline SVG icons instead of lucide-react for better compatibility
import ServiceForm from '@/components/admin/ServiceForm';
import LocationForm from '@/components/admin/LocationForm';
import CategoryForm from '@/components/admin/CategoryForm';
import ProviderForm from '@/components/admin/ProviderForm';
import ServicesList from '@/components/admin/ServicesList';
import LocationsList from '@/components/admin/LocationsList';
import CategoriesList from '@/components/admin/CategoriesList';
import ProvidersList from '@/components/admin/ProvidersList';
import MediaForm from '@/components/admin/MediaForm';
import MediaList from '@/components/admin/MediaList';
import DashboardStats from '@/components/admin/DashboardStats';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-hostvue-light to-white">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-hostvue-primary to-hostvue-secondary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-hostvue-dark">Admin Dashboard</h1>
                <p className="text-sm text-hostvue-gray mt-1">Manage your tourism services and content</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-hostvue-gray">Welcome back</p>
                <p className="text-sm font-semibold text-hostvue-dark">Administrator</p>
              </div>
              <div className="h-11 w-11 bg-gradient-to-br from-hostvue-primary to-hostvue-secondary rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-white border border-neutral-200 p-1.5 rounded-xl shadow-sm">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-hostvue-light data-[state=active]:text-hostvue-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-hostvue-accent"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="hidden sm:inline font-medium">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-hostvue-light data-[state=active]:text-hostvue-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-hostvue-accent"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0a2 2 0 012 2v6.294c0 .319-.192.608-.49.756a19.532 19.532 0 01-8.02 2.025 19.532 19.532 0 01-8.02-2.025A1.143 1.143 0 013 14.294V8a2 2 0 012-2z" />
              </svg>
              <span className="hidden sm:inline font-medium">Services</span>
            </TabsTrigger>
            <TabsTrigger 
              value="locations" 
              className="flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-hostvue-light data-[state=active]:text-hostvue-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-hostvue-accent"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="hidden sm:inline font-medium">Locations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="categories" 
              className="flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-hostvue-light data-[state=active]:text-hostvue-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-hostvue-accent"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="hidden sm:inline font-medium">Categories</span>
            </TabsTrigger>
            <TabsTrigger 
              value="providers" 
              className="flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-hostvue-light data-[state=active]:text-hostvue-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-hostvue-accent"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="hidden sm:inline font-medium">Providers</span>
            </TabsTrigger>
            <TabsTrigger 
              value="media" 
              className="flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-hostvue-light data-[state=active]:text-hostvue-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-hostvue-accent"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline font-medium">Media</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="mt-0">
            <DashboardStats />
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-hostvue-primary to-hostvue-secondary rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hostvue-dark">Add New Service</h2>
                    <p className="text-sm text-hostvue-gray mt-1">Create a new tourism service offering</p>
                  </div>
                </div>
                <ServiceForm />
              </Card>
              
              <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-tourism-mountain to-tourism-ocean rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hostvue-dark">Existing Services</h2>
                    <p className="text-sm text-hostvue-gray mt-1">Manage your current service offerings</p>
                  </div>
                </div>
                <ServicesList />
              </Card>
            </div>
          </TabsContent>

          {/* Locations Management */}
          <TabsContent value="locations" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-tourism-culture to-hostvue-accent rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hostvue-dark">Add New Location</h2>
                    <p className="text-sm text-hostvue-gray mt-1">Register a new destination or venue</p>
                  </div>
                </div>
                <LocationForm />
              </Card>
              
              <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-tourism-mountain to-tourism-ocean rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hostvue-dark">Existing Locations</h2>
                    <p className="text-sm text-hostvue-gray mt-1">Manage your current destinations</p>
                  </div>
                </div>
                <LocationsList />
              </Card>
            </div>
          </TabsContent>

          {/* Categories Management */}
          <TabsContent value="categories" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-tourism-food to-hostvue-tertiary rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hostvue-dark">Add New Category</h2>
                    <p className="text-sm text-hostvue-gray mt-1">Create a new service category</p>
                  </div>
                </div>
                <CategoryForm />
              </Card>
              
              <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-tourism-mountain to-tourism-ocean rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hostvue-dark">Existing Categories</h2>
                    <p className="text-sm text-hostvue-gray mt-1">Manage your current categories</p>
                  </div>
                </div>
                <CategoriesList />
              </Card>
            </div>
          </TabsContent>

          {/* Providers Management */}
          <TabsContent value="providers" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-tourism-adventure to-hostvue-secondary rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hostvue-dark">Add New Provider</h2>
                    <p className="text-sm text-hostvue-gray mt-1">Register a new service provider</p>
                  </div>
                </div>
                <ProviderForm />
              </Card>
              
              <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-tourism-mountain to-tourism-ocean rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hostvue-dark">Existing Providers</h2>
                    <p className="text-sm text-hostvue-gray mt-1">Manage your service providers</p>
                  </div>
                </div>
                <ProvidersList />
              </Card>
            </div>
          </TabsContent>

          {/* Media Management */}
          <TabsContent value="media" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-hostvue-primary to-hostvue-accent rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hostvue-dark">Add New Media</h2>
                    <p className="text-sm text-hostvue-gray mt-1">Upload images and media content</p>
                  </div>
                </div>
                <MediaForm />
              </Card>
              
              <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-gradient-to-br from-tourism-mountain to-tourism-ocean rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hostvue-dark">Existing Media</h2>
                    <p className="text-sm text-hostvue-gray mt-1">Manage your media files</p>
                  </div>
                </div>
                <MediaList />
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
