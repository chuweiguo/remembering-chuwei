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
  'home.subtitle': { en: 'August 7, 2000 – January 20, 2025', zh: '2000年8月7日 – 2025年1月20日' },
  'home.biography.title': { en: 'His Story', zh: '他的故事' },
  'home.music.title': { en: 'Songs He Loved', zh: '他喜爱的歌曲' },
  'home.music.description': { 
    en: 'Background music is selected directly from Chuwei\'s personal playlist. These are some of his favorite songs, and music that his friends remember him by.', 
    zh: '背景音乐直接选自楚惟的个人播放列表。这些是他最喜欢的歌曲，也是朋友们怀念他时会想起的音乐。' 
  },
  
  // Biography sections
  'bio.intro': { 
    en: 'Chuwei Guo, 25, left us on January 20, 2025, with his friends by his side at Breckenridge, Colorado.', 
    zh: '郭楚惟，25岁，于2025年1月20日在科罗拉多州布雷肯里奇与朋友们在一起时离开了我们。' 
  },
  'bio.early': { 
    en: 'Chuwei was born on August 7, 2000, in Nanjing, China, to Ms. Chen and Mr. Guo. He moved to Bellevue, Washington in 2013, where he attended Tyee Middle School and later Newport High School. At Newport, he served as the Vice President of Programming in the Newport Robotics Group. After graduating in 2018, he went on to study computer science at NYU, where he founded NYU UltraViolet, a robotics club which now has over 100 members. He graduated in 2022 and moved to Atlanta, Georgia to begin working at a robotics startup, Mujin. In 2025, he moved to Berkeley, California and joined another robotics startup, Ambi Robotics.', 
    zh: '楚惟于2000年8月7日出生在中国南京，父母是陈女士和郭先生。2013年，他移居到华盛顿州贝尔维尤，先后就读于Tyee中学和Newport高中。在Newport高中，他担任Newport机器人小组的编程副主席。2018年毕业后，他前往纽约大学攻读计算机科学，并在那里创立了NYU UltraViolet机器人俱乐部，该俱乐部现在已有超过100名成员。2022年毕业后，他搬到佐治亚州亚特兰大，开始在机器人初创公司Mujin工作。2025年，他搬到加利福尼亚州伯克利，加入了另一家机器人初创公司Ambi Robotics。' 
  },
  'bio.career': { 
    en: 'In both companies, he served as an engineer in robotics, an area he found his passion when he was very young.', 
    zh: '在这两家公司，他都担任机器人工程师——这是他从小就发现自己热爱的领域。' 
  },
  'bio.hobbies': { 
    en: 'Apart from robotics, Chuwei loved computers as well. Many of his families\' and friends\' computers were personally built by him. Working on cars was another passion of Chuwei\'s. He did an extensive amount of modification to his beloved Mustang S550. He also loved playing video and board games, sharing many unforgettable moments of joy with his friends over many years.', 
    zh: '除了机器人，楚惟也热爱电脑。他的许多家人和朋友的电脑都是他亲手组装的。改装汽车是楚惟的另一个爱好。他对他心爱的Mustang S550进行了大量改装。他还喜欢玩电子游戏和桌游，多年来与朋友们分享了许多难忘的欢乐时光。' 
  },
  'bio.character': { 
    en: 'Chuwei was loved by everyone. He was kind, caring, and full of love for life and others. He is a light to his parents and friends.', 
    zh: '楚惟深受每个人的喜爱。他善良、体贴，对生活和他人充满热爱。他是父母和朋友心中的一道光。' 
  },
  'bio.wish': { 
    en: 'Chuwei once said in a casual conversation, that his biggest wish in life is to make sure everyone around him is cheerful and well cared of. It was a mission that he carried in his heart, and one he fulfilled every second of his life.', 
    zh: '楚惟曾在一次闲聊中说过，他人生最大的愿望就是确保身边的每个人都开心、被关怀。这是他心中的使命，也是他生命中每一秒都在践行的使命。' 
  },
  'bio.closing': { 
    en: 'Chuwei has led a beautiful life full of passion and love. His presence changed everyone around him, and he will forever be in the memories of his mom, dad, family, and his friends whom he loved deeply.', 
    zh: '楚惟度过了充满热情与爱的美好人生。他的存在改变了身边的每一个人，他将永远活在他深爱的父母、家人和朋友们的记忆中。' 
  },
  
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
