import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';

const Tributes = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-memorial-cream to-background">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            {t('tributes.title')}
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t('tributes.subtitle')}
          </p>
        </div>
      </section>

      {/* Leave a Message - Google Form */}
      <section className="py-16">
        <div className="container max-w-2xl">
          <h2 className="font-display text-2xl font-semibold text-center mb-8 text-foreground">
            {t('tributes.form.title')}
          </h2>
          <div className="bg-card rounded-lg border border-border p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Google Form will be embedded here
            </p>
            <p className="text-sm text-memorial-warm-gray">
              Create a Google Form and paste the embed code here
            </p>
          </div>
        </div>
      </section>

      {/* Messages Display - Google Sheet */}
      <section className="py-16 bg-memorial-cream/30">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl font-semibold text-center mb-8 text-foreground">
            {t('tributes.messages.title')}
          </h2>
          <div className="bg-card rounded-lg border border-border p-8 text-center min-h-[300px] flex items-center justify-center">
            <div>
              <p className="text-muted-foreground mb-4">
                Messages from the Google Sheet will be displayed here
              </p>
              <p className="text-sm text-memorial-warm-gray">
                Connect your Google Sheet to display submitted tributes
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tributes;
