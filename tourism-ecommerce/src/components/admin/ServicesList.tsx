'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  durationMinutes: number;
  status: string;
  minCapacity: number;
  maxCapacity: number;
  languageOffered: string;
  providerId: string;
  categoryIds: string[];
  locationIds: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/services');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      const response = await fetch(`http://kilafy-backed.us-east-1.elasticbeanstalk.com/api/services/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      
      setServices(services.filter(service => service.id !== id));
    } catch (err) {
      console.error('Error deleting service:', err);
      alert('Failed to delete service');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {services.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">No services found.</p>
          <p className="text-sm text-gray-400">Create your first service using the form!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow border-gray-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{service.shortDescription}</p>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Duration:</span> {service.durationMinutes} min
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Capacity:</span> {service.minCapacity}-{service.maxCapacity}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Language:</span> {service.languageOffered}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.status}
                    </span>
                    
                    <div className="flex gap-2">
                      <Link href={`/service?id=${service.id}`}>
                        <Button variant="outline" size="sm" className="h-8 px-2">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
