import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Settings, BarChart3, MapPin, Tag, Briefcase } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Manage your tourism services and content</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, Admin</span>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Locations
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Categories
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
            </div>
            <DashboardStats />
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Services Management</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Service Form */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Create New Service
                    </CardTitle>
                    <CardDescription>
                      Add a new tourism service to your catalog
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ServiceForm />
                  </CardContent>
                </Card>
              </div>

              {/* Services List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Existing Services</CardTitle>
                    <CardDescription>
                      Manage and edit your current services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ServicesList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Locations Management */}
          <TabsContent value="locations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Locations Management</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Location Form */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Add New Location
                    </CardTitle>
                    <CardDescription>
                      Add a new destination to your platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LocationForm />
                  </CardContent>
                </Card>
              </div>

              {/* Locations List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Existing Locations</CardTitle>
                    <CardDescription>
                      Manage your destination locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LocationsList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Categories Management */}
          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Categories Management</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Category Form */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Create New Category
                    </CardTitle>
                    <CardDescription>
                      Add a new service category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CategoryForm />
                  </CardContent>
                </Card>
              </div>

              {/* Categories List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Existing Categories</CardTitle>
                    <CardDescription>
                      Manage your service categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CategoriesList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
