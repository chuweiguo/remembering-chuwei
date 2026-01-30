import { useState, useEffect, useRef } from 'react';
import { Loader2, RefreshCw, ImageOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCloudinaryGallery } from '@/hooks/useCloudinaryGallery';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { PhotoUploadDialog } from '@/components/PhotoUploadDialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const CLOUDINARY_CLOUD_NAME = 'dt0xeaftq';
const CLOUDINARY_TAG = 'chuwei-gallery';
const CLOUDINARY_FOLDER = 'Home/chuwei-gallery';

const Gallery = () => {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    photos,
    photoBatches,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
  } = useCloudinaryGallery({
    cloudName: CLOUDINARY_CLOUD_NAME,
    tag: CLOUDINARY_TAG,
    folder: CLOUDINARY_FOLDER,
    batchSize: 12,
  });

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore]);

  // Calculate global index for lightbox from batch position
  const openLightbox = (batchIndex: number, photoIndexInBatch: number) => {
    let globalIndex = 0;
    for (let i = 0; i < batchIndex; i++) {
      globalIndex += photoBatches[i].length;
    }
    globalIndex += photoIndexInBatch;
    setCurrentPhotoIndex(globalIndex);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-memorial-cream to-background">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            {t('gallery.title')}
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up mb-6" style={{ animationDelay: '0.1s' }}>
            {t('gallery.subtitle')}
          </p>
          <div className="flex justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <PhotoUploadDialog />
            <Button variant="ghost" size="icon" onClick={refresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container">
          {loading && photos.length === 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton 
                  key={i} 
                  className="break-inside-avoid rounded-lg"
                  style={{ height: `${200 + Math.random() * 150}px` }}
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <ImageOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button variant="outline" onClick={refresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t('tributes.messages.retry')}
              </Button>
            </div>
          ) : photos.length > 0 ? (
            <>
              {/* Render each batch in its own container to prevent reflow */}
              {photoBatches.map((batch, batchIndex) => (
                <div 
                  key={`batch-${batchIndex}`} 
                  className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mb-4"
                >
                  {batch.map((photo, photoIndex) => (
                    <div
                      key={photo.public_id}
                      className="break-inside-avoid cursor-pointer group"
                      onClick={() => openLightbox(batchIndex, photoIndex)}
                    >
                      <img
                        src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_400,q_auto,f_auto/${photo.public_id}.${photo.format}`}
                        alt=""
                        className="w-full rounded-lg shadow-sm group-hover:shadow-md transition-all group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}

              {/* Load more trigger */}
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {loadingMore && (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                )}
                {!hasMore && photos.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {t('gallery.noMore')}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-memorial-cream rounded-lg flex items-center justify-center"
                  >
                    <span className="text-muted-foreground text-xs">Photo {i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground max-w-md mx-auto">
                {t('gallery.empty')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <PhotoLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={photos}
        currentIndex={currentPhotoIndex}
        onNavigate={setCurrentPhotoIndex}
      />
    </>
  );
};

export default Gallery;
