'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Shield, ShieldCheck, Building2 } from 'lucide-react';
import { ApiProvider, providersApi } from '@/services/api';
import { EditProviderModal } from './EditProviderModal';
import { useSuccessHandler } from '@/components/ui/toast';

export default function ProvidersList() {
  const [providers, setProviders] = useState<ApiProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProvider, setEditingProvider] = useState<ApiProvider | null>(null);
  const { showSuccess } = useSuccessHandler();

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const data = await providersApi.getAllProviders();
      setProviders(data);
    } catch (err) {
      console.error('Error fetching providers:', err);
      setError('Failed to load providers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this provider?')) {
      return;
    }

    try {
      await providersApi.deleteProvider(id);
      setProviders(providers.filter(provider => provider.id !== id));
      showSuccess('Provider Deleted', 'Provider has been successfully deleted.');
    } catch (error) {
      console.error('Error deleting provider:', error);
      setError('Failed to delete provider');
    }
  };

  const handleEdit = (provider: ApiProvider) => {
    setEditingProvider(provider);
  };

  const handleCloseEdit = () => {
    setEditingProvider(null);
  };

  const handleUpdateSuccess = () => {
    fetchProviders(); // Refresh the list
  };

  const formatDate = (dateArray: number[]): string => {
    if (!dateArray || dateArray.length < 3) return 'Unknown';
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading providers...</p>
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
      {providers.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-50 rounded-full">
              <Building2 className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <p className="text-gray-500 mb-2 text-lg font-medium">No providers found</p>
          <p className="text-sm text-gray-400">Register your first service provider to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {providers.map((provider) => (
            <Card key={provider.id} className="hover:shadow-md transition-shadow border-gray-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {provider.companyName || provider.legalName || 'Unnamed Provider'}
                      </h3>
                      {provider.verified ? (
                        <div title="Verified Provider">
                          <ShieldCheck className="h-4 w-4 text-green-500" />
                        </div>
                      ) : (
                        <div title="Not Verified">
                          <Shield className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {provider.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{provider.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">User ID:</span> {provider.userId}
                      </span>
                      {provider.vatNumber && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium">VAT:</span> {provider.vatNumber}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Created:</span> {formatDate(provider.createdAt)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      provider.verified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {provider.verified ? 'Verified' : 'Pending'}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => handleEdit(provider)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleDelete(provider.id)}
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
      
      {editingProvider && (
        <EditProviderModal
          provider={editingProvider}
          onClose={handleCloseEdit}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
