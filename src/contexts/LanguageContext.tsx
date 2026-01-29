import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', zh: '首页' },
  'nav.timeline': { en: 'Life Journey', zh: '生命旅程' },
  'nav.gallery': { en: 'Photo Gallery', zh: '相册' },
  'nav.tributes': { en: 'Tributes', zh: '留言悼念' },
  
  // Home page
  'home.welcome': { en: 'In Loving Memory', zh: '永远怀念' },
  'home.subtitle': { en: 'Celebrating a life filled with love, joy, and cherished memories', zh: '纪念一个充满爱、快乐和珍贵回忆的生命' },
  'home.biography.title': { en: 'His Story', zh: '他的故事' },
  'home.biography.placeholder': { en: 'Biography content will be added here...', zh: '传记内容将在此处添加...' },
  'home.music.title': { en: 'Songs He Loved', zh: '他喜爱的歌曲' },
  
  // Timeline page
  'timeline.title': { en: 'Life Journey', zh: '生命旅程' },
  'timeline.subtitle': { en: 'Milestones and cherished moments', zh: '里程碑和珍贵时刻' },
  
  // Gallery page
  'gallery.title': { en: 'Photo Gallery', zh: '相册' },
  'gallery.subtitle': { en: 'Treasured memories captured in time', zh: '定格的珍贵记忆' },
  'gallery.placeholder': { en: 'Photos will be added here. Upload your photos to Cloudinary and add the URLs to the gallery data file.', zh: '照片将在此处添加。请将照片上传到Cloudinary并将URL添加到相册数据文件中。' },
  
  // Tributes page
  'tributes.title': { en: 'Tributes & Messages', zh: '留言悼念' },
  'tributes.subtitle': { en: 'Share your memories and messages of love', zh: '分享您的回忆和爱的留言' },
  'tributes.form.title': { en: 'Leave a Message', zh: '留言' },
  'tributes.messages.title': { en: 'Messages from Friends & Family', zh: '亲友留言' },
  
  // Common
  'common.loading': { en: 'Loading...', zh: '加载中...' },
  'common.name': { en: 'Chuwei Guo', zh: '郭楚惟' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('memorial-language');
      if (saved === 'en' || saved === 'zh') return saved;
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('memorial-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
