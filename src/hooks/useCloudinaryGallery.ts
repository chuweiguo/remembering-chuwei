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
  tag: string;
  folder: string;
  batchSize?: number;
}

export function useCloudinaryGallery({ 
  cloudName, 
  tag,
  folder,
  batchSize = 12 
}: UseCloudinaryGalleryOptions) {
  const [photos, setPhotos] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [allResources, setAllResources] = useState<CloudinaryResource[]>([]);

  const fetchPhotos = useCallback(async (cursor?: string | null) => {
    try {
      if (cursor) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Only fetch from API on initial load
      if (!cursor) {
        // Using Cloudinary's client-side list endpoint with TAG (not folder)
        // This requires "Resource list" to be unchecked in Cloudinary Security settings
        const baseUrl = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
        
        const response = await fetch(baseUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch photos. Make sure the tag exists and Resource List is enabled in Cloudinary settings.');
        }

        const data = await response.json();
        const resources: CloudinaryResource[] = (data.resources || []).map((r: any) => ({
          public_id: r.public_id,
          // Build the full URL - the public_id already contains the unique identifier
          secure_url: `https://res.cloudinary.com/${cloudName}/image/upload/v${r.version}/${r.public_id}.${r.format}`,
          width: r.width,
          height: r.height,
          format: r.format,
        }));

        // Sort by public_id to ensure consistent ordering
        const sortedResources = [...resources].sort((a, b) => 
          a.public_id.localeCompare(b.public_id)
        );

        setAllResources(sortedResources);
        
        const batch = sortedResources.slice(0, batchSize);
        setPhotos(batch);
        setHasMore(batchSize < sortedResources.length);
        setNextCursor(batchSize < sortedResources.length ? batchSize.toString() : null);
      } else {
        // Client-side pagination for subsequent loads
        const startIndex = parseInt(cursor, 10);
        const endIndex = startIndex + batchSize;
        const batch = allResources.slice(startIndex, endIndex);
        
        setPhotos(prev => [...prev, ...batch]);
        setHasMore(endIndex < allResources.length);
        setNextCursor(endIndex < allResources.length ? endIndex.toString() : null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load photos');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [cloudName, tag, folder, batchSize, allResources]);

  useEffect(() => {
    fetchPhotos();
  }, [cloudName, tag, folder, batchSize]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore && nextCursor) {
      fetchPhotos(nextCursor);
    }
  }, [loadingMore, hasMore, nextCursor, fetchPhotos]);

  const refresh = useCallback(() => {
    setPhotos([]);
    setAllResources([]);
    setNextCursor(null);
    setHasMore(true);
    fetchPhotos();
  }, []);

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
