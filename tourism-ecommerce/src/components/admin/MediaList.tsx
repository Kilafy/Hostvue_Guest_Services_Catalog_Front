'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Image as ImageIcon, Video, Copy, Upload } from 'lucide-react';
import Image from 'next/image';
import { ApiMedia } from '@/services/api';
import { EditMediaModal } from './EditMediaModal';
import { useErrorHandler, useSuccessHandler } from '@/components/ui/toast';

export default function MediaList() {
  const [media, setMedia] = useState<ApiMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMedia, setEditingMedia] = useState<ApiMedia | null>(null);
  const { handleApiError } = useErrorHandler();
  const { showSuccess } = useSuccessHandler();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      const data = await response.json();
      setMedia(data);
    } catch (err) {
      console.error('Error fetching media:', err);
      setError('Failed to load media');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) {
      return;
    }

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        await handleApiError(response, 'delete media');
        return;
      }
      
      setMedia(media.filter(item => item.id !== id));
      showSuccess('Media Deleted', 'Media has been successfully deleted.');
    } catch {
      handleApiError(new Response(), 'delete media');
    }
  };

  const handleEdit = (mediaItem: ApiMedia) => {
    setEditingMedia(mediaItem);
  };

  const handleCloseEdit = () => {
    setEditingMedia(null);
  };

  const handleUpdateSuccess = () => {
    fetchMedia(); // Refresh the list
  };

  const formatDate = (dateArray: number[]): string => {
    if (!dateArray || dateArray.length < 3) return 'Unknown';
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toLocaleDateString();
  };

  const getMediaIcon = (mimeType?: string) => {
    if (!mimeType) return <ImageIcon className="h-4 w-4" />;
    if (mimeType.startsWith('video/')) return <Video className="h-4 w-4" />;
    return <ImageIcon className="h-4 w-4" />;
  };

  const getMediaTypeColor = (mimeType?: string) => {
    if (!mimeType) return 'bg-gray-100 text-gray-800';
    if (mimeType.startsWith('video/')) return 'bg-purple-100 text-purple-800';
    return 'bg-blue-100 text-blue-800';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading media...</p>
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
      {media.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-pink-50 rounded-full">
              <Upload className="h-8 w-8 text-pink-400" />
            </div>
          </div>
          <p className="text-gray-500 mb-2 text-lg font-medium">No media found</p>
          <p className="text-sm text-gray-400">Upload your first images and videos to showcase your services!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {media.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow border-gray-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0">
                      {item.mimeType?.startsWith('image/') ? (
                        <div className="relative">
                          <Image 
                            src={item.url} 
                            alt={item.altText || 'Media'} 
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded-lg border shadow-sm"
                            unoptimized={true}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-20 h-20 bg-gray-100 rounded-lg border flex items-center justify-center">
                                    <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-lg border flex items-center justify-center">
                          {getMediaIcon(item.mimeType)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {item.altText || 'Untitled Media'}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMediaTypeColor(item.mimeType)}`}>
                          {item.mimeType || 'Unknown'}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Owner:</span> {item.ownerType}#{item.ownerId}
                        </span>
                        {item.position !== undefined && (
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Position:</span> {item.position}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Created:</span> {formatDate(item.createdAt)}
                        </span>
                      </div>
                      
                      {/* Improved URL display */}
                      <div className="bg-gray-50 border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-600">Media URL:</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => navigator.clipboard.writeText(item.url)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="text-sm text-gray-700 break-all">
                          {item.url}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => window.open(item.url, '_blank')}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleDelete(item.id)}
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
      
      {editingMedia && (
        <EditMediaModal
          media={editingMedia}
          onClose={handleCloseEdit}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
