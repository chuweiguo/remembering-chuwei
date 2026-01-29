import { useLanguage } from '@/contexts/LanguageContext';

// Placeholder - will be replaced with Cloudinary URLs
const photos: string[] = [];

const Gallery = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-memorial-cream to-background">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            {t('gallery.title')}
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t('gallery.subtitle')}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container">
          {photos.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="break-inside-avoid animate-fade-in-up"
                  style={{ animationDelay: `${(index % 8) * 0.05}s` }}
                >
                  <img
                    src={photo}
                    alt=""
                    className="w-full rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
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
                {t('gallery.placeholder')}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Gallery;
