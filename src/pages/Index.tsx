import { useLanguage } from '@/contexts/LanguageContext';
import chuweiHero from '@/assets/chuwei-hero.jpg';


const Index = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-memorial-cream to-background" />
        <div className="container relative z-10 text-center">
          <div className="animate-fade-in-up">
            <p className="text-lg md:text-xl text-memorial-gold font-medium mb-2">
              {t('home.welcome')}
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2">
              {t('common.name')}
            </h1>
            <p className="text-muted-foreground text-base">
              {t('home.subtitle')}
            </p>
          </div>
          
          {/* Hero photo */}
          <div className="mt-6 mx-auto w-52 h-52 md:w-72 md:h-72 rounded-full border-4 border-memorial-gold/30 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <img src={chuweiHero} alt="Chuwei Guo" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-4 md:py-6">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-6 text-foreground">
            {t('home.biography.title')}
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p className="text-foreground font-medium text-center text-xl">
              {t('bio.intro')}
            </p>
            
            <p>{t('bio.early')}</p>
            
            <p>{t('bio.hobbies')}</p>
            
            <p>{t('bio.character')}</p>
            
            <p>{t('bio.wish')}</p>
            
            <p>{t('bio.closing')}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
