'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ApiLocation } from '@/services/api';
import { EditLocationModal } from './EditLocationModal';
import { useErrorHandler, useSuccessHandler } from '@/components/ui/toast';

export default function LocationsList() {
  const [locations, setLocations] = useState<ApiLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingLocation, setEditingLocation] = useState<ApiLocation | null>(null);
  const { handleApiError } = useErrorHandler();
  const { showSuccess } = useSuccessHandler();

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations');
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      const data = await response.json();
      setLocations(data);
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError('Failed to load locations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) {
      return;
    }

    try {
      const response = await fetch(`/api/locations/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        await handleApiError(response, 'delete location');
        return;
      }
      
      setLocations(locations.filter(location => location.id !== id));
      showSuccess('Location Deleted', 'Location has been successfully deleted.');
    } catch {
      handleApiError(new Response(), 'delete location');
    }
  };

  const handleEdit = (location: ApiLocation) => {
    setEditingLocation(location);
  };

  const handleCloseEdit = () => {
    setEditingLocation(null);
  };

  const handleUpdateSuccess = () => {
    fetchLocations(); // Refresh the list
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading locations...</p>
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
      {locations.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-50 rounded-full">
              <MapPin className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <p className="text-gray-500 mb-2 text-lg font-medium">No locations found</p>
          <p className="text-sm text-gray-400">Add your first destination to start offering services!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {locations.map((location) => (
            <Card key={location.id} className="hover:shadow-md transition-shadow border-gray-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{location.city}, {location.region}</h3>
                    <p className="text-sm text-gray-600 mb-3">{location.country}</p>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      {location.lat && location.lon && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Coordinates:</span> {location.lat}, {location.lon}
                        </span>
                      )}
                      {location.slug && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Slug:</span> {location.slug}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Created:</span> {location.createdAt && location.createdAt.length >= 3 
                          ? new Date(location.createdAt[0], location.createdAt[1] - 1, location.createdAt[2]).toLocaleDateString()
                          : 'Unknown'
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Link href={`/location?id=${location.id}`}>
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleEdit(location)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleDelete(location.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {editingLocation && (
        <EditLocationModal
          location={editingLocation}
          onClose={handleCloseEdit}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
