'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Plus, Settings, BarChart3, MapPin, Tag, Briefcase, List } from 'lucide-react';
import ServiceForm from '@/components/admin/ServiceForm';
import LocationForm from '@/components/admin/LocationForm';
import CategoryForm from '@/components/admin/CategoryForm';
import ServicesList from '@/components/admin/ServicesList';
import LocationsList from '@/components/admin/LocationsList';
import CategoriesList from '@/components/admin/CategoriesList';
import DashboardStats from '@/components/admin/DashboardStats';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your tourism services and content</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-500">Welcome back</p>
                <p className="text-sm font-medium text-gray-900">Administrator</p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white border border-gray-200 p-1 rounded-lg">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200"
            >
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger 
              value="locations" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Locations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="categories" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200"
            >
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="mt-0">
            <DashboardStats />
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 border-0 shadow-sm bg-white">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Add New Service</h2>
                    <p className="text-sm text-gray-600">Create a new tourism service offering</p>
                  </div>
                </div>
                <ServiceForm />
              </Card>
              
              <Card className="p-6 border-0 shadow-sm bg-white">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                    <List className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Existing Services</h2>
                    <p className="text-sm text-gray-600">Manage your current service offerings</p>
                  </div>
                </div>
                <ServicesList />
              </Card>
            </div>
          </TabsContent>

          {/* Locations Management */}
          <TabsContent value="locations" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 border-0 shadow-sm bg-white">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Add New Location</h2>
                    <p className="text-sm text-gray-600">Register a new destination or venue</p>
                  </div>
                </div>
                <LocationForm />
              </Card>
              
              <Card className="p-6 border-0 shadow-sm bg-white">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                    <List className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Existing Locations</h2>
                    <p className="text-sm text-gray-600">Manage your current destinations</p>
                  </div>
                </div>
                <LocationsList />
              </Card>
            </div>
          </TabsContent>

          {/* Categories Management */}
          <TabsContent value="categories" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 border-0 shadow-sm bg-white">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                    <Tag className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Add New Category</h2>
                    <p className="text-sm text-gray-600">Create a new service category</p>
                  </div>
                </div>
                <CategoryForm />
              </Card>
              
              <Card className="p-6 border-0 shadow-sm bg-white">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                    <List className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Existing Categories</h2>
                    <p className="text-sm text-gray-600">Manage your current categories</p>
                  </div>
                </div>
                <CategoriesList />
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
