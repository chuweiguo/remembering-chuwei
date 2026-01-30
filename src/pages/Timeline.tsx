import { useLanguage } from '@/contexts/LanguageContext';

// Timeline events - photos can be added as Cloudinary URLs
const timelineEvents = [
  {
    id: 1,
    date: { en: '2000 - 2013', zh: '2000 - 2013' },
    title: { en: 'Childhood in China', zh: '中国的童年' },
    description: { 
      en: 'Chuwei spent his early childhood years in China, where his curiosity and love for technology first began to bloom.', 
      zh: '楚惟在中国度过了童年时光，他对科技的好奇心和热爱在这里萌芽。' 
    },
    photos: [] as string[],
  },
  {
    id: 2,
    date: { en: '2013 - 2014', zh: '2013 - 2014' },
    title: { en: 'Tyee Middle School', zh: 'Tyee 中学' },
    description: { 
      en: 'Chuwei began his education in the United States at Tyee Middle School, adapting to a new culture and language.', 
      zh: '楚惟在 Tyee 中学开始了他在美国的求学之路，适应新的文化和语言。' 
    },
    photos: [] as string[],
  },
  {
    id: 3,
    date: { en: '2014 - 2018', zh: '2014 - 2018' },
    title: { en: 'Newport High School', zh: 'Newport 高中' },
    description: { 
      en: 'During his high school years at Newport, Chuwei developed his passion for engineering and technology.', 
      zh: '在 Newport 高中期间，楚惟培养了对工程和技术的热情。' 
    },
    photos: [] as string[],
  },
  {
    id: 4,
    date: { en: '2018 - 2022', zh: '2018 - 2022' },
    title: { en: 'New York University', zh: '纽约大学' },
    description: { 
      en: 'Chuwei pursued his studies at NYU, where he founded NYU UltraViolet and deepened his expertise in robotics.', 
      zh: '楚惟在纽约大学深造，创立了 NYU UltraViolet 社团，并深化了他在机器人领域的专业知识。' 
    },
    photos: [] as string[],
  },
  {
    id: 5,
    date: { en: '2022 - 2024', zh: '2022 - 2024' },
    title: { en: 'Mujin', zh: 'Mujin' },
    description: { 
      en: 'Chuwei joined Mujin as a robotics engineer, working on cutting-edge automation solutions.', 
      zh: '楚惟加入 Mujin 担任机器人工程师，从事前沿自动化解决方案的研发。' 
    },
    photos: [] as string[],
  },
  {
    id: 6,
    date: { en: '2025 - 2026', zh: '2025 - 2026' },
    title: { en: 'Ambi Robotics', zh: 'Ambi Robotics' },
    description: { 
      en: 'Chuwei continued his robotics career at Ambi Robotics, contributing to innovative warehouse automation technology.', 
      zh: '楚惟在 Ambi Robotics 继续他的机器人事业，为创新的仓库自动化技术做出贡献。' 
    },
    photos: [] as string[],
  },
];

const Timeline = () => {
  const { language, t } = useLanguage();

  return (
    <>
      {/* Header */}
      <section className="py-4 md:py-6 bg-gradient-to-b from-memorial-cream to-background">
        <div className="container text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 animate-fade-in-up">
            {t('timeline.title')}
          </h1>
          <p className="text-base text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t('timeline.subtitle')}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-6">
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
    </>
  );
};

export default Timeline;
