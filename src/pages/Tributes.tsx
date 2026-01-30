import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TributeForm from '@/components/TributeForm';
import TributesList from '@/components/TributesList';

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxIfMcknf6vesrQ8Y2yFPq-WJ2JIUlTlEjSWezxdhgstf1Q10twcNim9cS5OFqvz5KIYA/exec';
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQEGRWxVG5gWzbZpQR0rcqh8aodJbxLv1lM6STB5VztT-LXAxKxZ6kgrYKsEuB7Ew9tKzRRjk5yvhgE/pub?output=csv';

const Tributes = () => {
  const { t } = useLanguage();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubmitSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      {/* Header */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-memorial-cream to-background">
        <div className="container text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 animate-fade-in-up">
            {t('tributes.title')}
          </h1>
          <p className="text-base text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t('tributes.subtitle')}
          </p>
        </div>
      </section>

      {/* Messages Display */}
      <section className="py-8">
        <div className="container max-w-3xl">
          <h2 className="font-display text-xl font-semibold text-center mb-4 text-foreground">
            {t('tributes.messages.title')}
          </h2>
          <TributesList sheetUrl={GOOGLE_SHEET_CSV_URL} refreshTrigger={refreshTrigger} />
        </div>
      </section>

      {/* Leave a Message - Custom Form */}
      <section className="py-8 bg-memorial-cream/30">
        <div className="container max-w-xl">
          <h2 className="font-display text-xl font-semibold text-center mb-4 text-foreground">
            {t('tributes.form.title')}
          </h2>
          <div className="bg-card rounded-lg border border-border p-6">
            <TributeForm scriptUrl={GOOGLE_APPS_SCRIPT_URL} onSubmitSuccess={handleSubmitSuccess} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Tributes;
