'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { servicesApi, categoriesApi, locationsApi } from '@/services/api';

interface DashboardStats {
  totalServices: number;
  totalLocations: number;
  totalCategories: number;
  activeServices: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalServices: 0,
    totalLocations: 0,
    totalCategories: 0,
    activeServices: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all data in parallel using the API functions
      const [services, locations, categories] = await Promise.all([
        servicesApi.getAllServices(),
        locationsApi.getAllLocations(),
        categoriesApi.getAllCategories()
      ]);

      const activeServices = services.filter((service) => service.status === 'active').length;

      setStats({
        totalServices: services.length,
        totalLocations: locations.length,
        totalCategories: categories.length,
        activeServices
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading dashboard stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Services</CardTitle>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-lg">🎯</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalServices}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.activeServices} active services
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Locations</CardTitle>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-lg">📍</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalLocations}</div>
            <p className="text-xs text-gray-500 mt-1">
              Available destinations
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Categories</CardTitle>
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-lg">📂</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalCategories}</div>
            <p className="text-xs text-gray-500 mt-1">
              Service categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Rate</CardTitle>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-lg">📊</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalServices > 0 
                ? Math.round((stats.activeServices / stats.totalServices) * 100)
                : 0}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Services active
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Create new tourism services</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Add locations and destinations</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Organize content with categories</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Manage service providers</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">System Overview</CardTitle>
            <CardDescription className="text-gray-600">Current platform statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-blue-50">
                <span className="text-sm text-gray-700">Services configured</span>
                <span className="font-semibold text-blue-600">{stats.totalServices}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-green-50">
                <span className="text-sm text-gray-700">Locations available</span>
                <span className="font-semibold text-green-600">{stats.totalLocations}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-purple-50">
                <span className="text-sm text-gray-700">Categories created</span>
                <span className="font-semibold text-purple-600">{stats.totalCategories}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-orange-50">
                <span className="text-sm text-gray-700">System health</span>
                <span className="font-semibold text-orange-600">Excellent</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
