import { useState, useEffect, useCallback } from 'react';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

interface UseCloudinaryGalleryOptions {
  cloudName: string;
  folder: string;
  batchSize?: number;
}

export function useCloudinaryGallery({ 
  cloudName, 
  folder, 
  batchSize = 12 
}: UseCloudinaryGalleryOptions) {
  const [photos, setPhotos] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const fetchPhotos = useCallback(async (cursor?: string | null) => {
    try {
      if (cursor) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Using Cloudinary's Search API via the client-side endpoint
      // This requires the folder to have public access
      const baseUrl = `https://res.cloudinary.com/${cloudName}/image/list/${folder}.json`;
      
      const response = await fetch(baseUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }

      const data = await response.json();
      const resources: CloudinaryResource[] = (data.resources || []).map((r: any) => ({
        public_id: r.public_id,
        secure_url: `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${r.public_id}.${r.format}`,
        width: r.width,
        height: r.height,
        format: r.format,
      }));

      // Client-side pagination since list endpoint doesn't support cursor
      const startIndex = cursor ? parseInt(cursor, 10) : 0;
      const endIndex = startIndex + batchSize;
      const batch = resources.slice(startIndex, endIndex);
      
      if (cursor) {
        setPhotos(prev => [...prev, ...batch]);
      } else {
        setPhotos(batch);
      }
      
      setHasMore(endIndex < resources.length);
      setNextCursor(endIndex < resources.length ? endIndex.toString() : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load photos');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [cloudName, folder, batchSize]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore && nextCursor) {
      fetchPhotos(nextCursor);
    }
  }, [loadingMore, hasMore, nextCursor, fetchPhotos]);

  const refresh = useCallback(() => {
    setPhotos([]);
    setNextCursor(null);
    setHasMore(true);
    fetchPhotos();
  }, [fetchPhotos]);

  return {
    photos,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}
