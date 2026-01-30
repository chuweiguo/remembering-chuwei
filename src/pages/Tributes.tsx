import { useLanguage } from '@/contexts/LanguageContext';
import TributeForm from '@/components/TributeForm';
import TributesList from '@/components/TributesList';

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJnUqF2BRgGJalbc7XEM1efP1TkWllPDD1c-DiGkKC6Y4PQl7SjrwRqeO_-xQeCS441g/exec';
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQEGRWxVG5gWzbZpQR0rcqh8aodJbxLv1lM6STB5VztT-LXAxKxZ6kgrYKsEuB7Ew9tKzRRjk5yvhgE/pub?output=csv';

const Tributes = () => {
  const { t } = useLanguage();

  return (
    <>
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

      {/* Leave a Message - Custom Form */}
      <section className="py-16">
        <div className="container max-w-2xl">
          <h2 className="font-display text-2xl font-semibold text-center mb-8 text-foreground">
            {t('tributes.form.title')}
          </h2>
          <div className="bg-card rounded-lg border border-border p-8">
            <TributeForm scriptUrl={GOOGLE_APPS_SCRIPT_URL} />
          </div>
        </div>
      </section>

      {/* Messages Display */}
      <section className="py-16 bg-memorial-cream/30">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl font-semibold text-center mb-8 text-foreground">
            {t('tributes.messages.title')}
          </h2>
          <TributesList sheetUrl={GOOGLE_SHEET_CSV_URL} />
        </div>
      </section>
    </>
  );
};

export default Tributes;
