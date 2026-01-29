import { useLanguage } from '@/contexts/LanguageContext';


const Index = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-memorial-cream to-background" />
        <div className="container relative z-10 text-center">
          <div className="animate-fade-in-up">
            <p className="text-xl md:text-2xl text-memorial-gold font-medium mb-4">
              {t('home.welcome')}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              {t('common.name')}
            </h1>
            <p className="text-muted-foreground text-lg">
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
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p className="text-foreground font-medium text-center text-xl">
              {t('bio.intro')}
            </p>
            
            <p>{t('bio.early')}</p>
            
            <p>{t('bio.hobbies')}</p>
            
            <p className="text-foreground">{t('bio.character')}</p>
            
            <p className="italic border-l-4 border-memorial-gold pl-6 py-2 bg-memorial-cream/30 rounded-r">
              {t('bio.wish')}
            </p>
            
            <p className="text-foreground font-medium text-center pt-4">
              {t('bio.closing')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
