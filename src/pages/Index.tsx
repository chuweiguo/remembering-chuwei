import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';

const Index = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-memorial-cream to-background" />
        <div className="container relative z-10 text-center">
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              {t('common.name')}
            </h1>
            <p className="text-xl md:text-2xl text-memorial-gold font-medium mb-6">
              {t('home.welcome')}
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t('home.subtitle')}
            </p>
          </div>
          
          {/* Placeholder for hero photo */}
          <div className="mt-12 mx-auto w-48 h-48 md:w-64 md:h-64 rounded-full bg-memorial-sage/30 border-4 border-memorial-gold/30 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-muted-foreground text-sm">Photo</span>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground">
            {t('home.biography.title')}
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
            <p className="text-center italic text-memorial-warm-gray">
              {t('home.biography.placeholder')}
            </p>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section className="py-16 md:py-24 bg-memorial-cream/50">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground">
            {t('home.music.title')}
          </h2>
          <div className="aspect-video bg-card rounded-lg border border-border flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              YouTube playlist will be embedded here
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
