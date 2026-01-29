import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';

// Placeholder timeline data - will be replaced with real content
const timelineEvents = [
  {
    id: 1,
    date: { en: 'Birth Year', zh: '出生年份' },
    title: { en: 'The Beginning', zh: '生命的开始' },
    description: { en: 'Chuwei was born...', zh: '楚惟出生...' },
    photos: [] as string[],
  },
  {
    id: 2,
    date: { en: 'Childhood', zh: '童年时期' },
    title: { en: 'Growing Up', zh: '成长岁月' },
    description: { en: 'Early years and cherished memories...', zh: '童年时光和珍贵回忆...' },
    photos: [] as string[],
  },
  {
    id: 3,
    date: { en: 'Later Years', zh: '后来的日子' },
    title: { en: 'Journey to America', zh: '来到美国' },
    description: { en: 'A new chapter begins...', zh: '新的篇章开始...' },
    photos: [] as string[],
  },
];

const Timeline = () => {
  const { language, t } = useLanguage();

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-memorial-cream to-background">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            {t('timeline.title')}
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t('timeline.subtitle')}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-memorial-gold/30 transform md:-translate-x-1/2" />

            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-memorial-gold rounded-full transform -translate-x-1/2 mt-2 z-10" />

                {/* Content card */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="bg-card rounded-lg p-6 border border-border shadow-sm animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="text-sm font-medium text-memorial-gold">
                      {event.date[language]}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground mt-1 mb-2">
                      {event.title[language]}
                    </h3>
                    <p className="text-muted-foreground">
                      {event.description[language]}
                    </p>

                    {/* Photo grid placeholder */}
                    {event.photos.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {event.photos.map((photo, photoIndex) => (
                          <img
                            key={photoIndex}
                            src={photo}
                            alt=""
                            className="rounded-md w-full h-24 object-cover"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4 p-4 bg-memorial-cream/50 rounded-md text-center text-sm text-muted-foreground">
                        Photos will be added here
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Timeline;
