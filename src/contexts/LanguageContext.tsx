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
  'home.subtitle': { en: 'August 7, 2000 – January 20, 2026', zh: '2000年8月7日 – 2026年1月20日' },
  'home.biography.title': { en: 'His Story', zh: '生平纪略' },
  'home.music.title': { en: 'Songs He Loved', zh: '他喜爱的歌曲' },
  'home.music.description': { 
    en: 'Background music is selected directly from Chuwei\'s personal playlist. These are some of his favorite songs, and music that his friends remember him by.', 
    zh: '背景音乐直接选自楚惟的个人播放列表。这些是他最喜欢的歌曲，也是朋友们怀念他时会想起的音乐。' 
  },
  'home.music.hint': {
    en: 'Click the speaker icon to listen',
    zh: '点击扬声器图标收听'
  },
  
  // Biography sections
  'bio.intro': { 
    en: 'Chuwei Guo, 25, left us on January 20, 2026, with his friends by his side at Breckenridge, Colorado.', 
    zh: '郭楚惟，25岁，于2026年1月20日在美国科罗拉多州布雷肯里奇离世，离世时挚友陪伴在侧。' 
  },
  'bio.early': { 
    en: 'Chuwei was born on August 7, 2000, in Nanjing, China, to Ms. Chen and Mr. Guo. He moved to Bellevue, Washington in 2013, where he attended Tyee Middle School and later Newport High School. At Newport, he served as the Vice President of Programming in the Newport Robotics Group. After graduating in 2018, he went on to study computer science at NYU, where he founded NYU UltraViolet, a robotics club which now has over 100 members. He graduated in 2022 and moved to Atlanta, Georgia to begin working at a robotics startup, Mujin. In 2025, he moved to Berkeley, California and joined another robotics startup, Ambi Robotics. In both companies, he served as an engineer in robotics, an area he found his passion when he was very young.', 
    zh: '楚惟于2000年8月7日出生于中国南京，父母为陈女士与郭先生。2013年，他随家人移居美国华盛顿州贝尔维尤市，就读于 Tyee 中学，后进入 Newport 高中。在 Newport 高中期间，他曾担任 Newport 机器人社团副社长。2018年高中毕业后，楚惟前往纽约大学攻读计算机科学专业，并创立了 NYU UltraViolet 机器人社团，该社团如今已发展成为拥有百余名成员的学生组织。2022年毕业后，他移居美国亚特兰大，加入机器人初创公司 Mujin，从事机器人相关工程工作。2025年，他迁居加州伯克利，加入机器人初创公司 Ambi Robotics。在上述两家公司中，楚惟均以机器人工程师的身份工作。机器人是他自幼便热爱的领域，也是他一生倾注热情的事业所在。' 
  },
  'bio.hobbies': { 
    en: 'Apart from robotics, Chuwei loved computers as well. Many of his families\' and friends\' computers were personally built by him. Working on cars was another passion of Chuwei\'s. He did an extensive amount of modification to his beloved Mustang S550. He also loved playing video and board games, sharing many unforgettable moments of joy with his friends over many years.', 
    zh: '除机器人之外，楚惟十分热爱计算机。许多亲友所使用的电脑，皆由他亲手组装与维护。汽车亦是他的重要兴趣之一，他曾对自己心爱的 Mustang S550 进行了大量改装。此外，他还热衷于电子游戏与桌游，多年来与朋友们共同留下了许多珍贵而难忘的欢乐回忆。' 
  },
  'bio.character': { 
    en: 'Chuwei was loved by everyone. He was kind, caring, and full of love for life and others. He is a light to his parents and friends.', 
    zh: '楚惟为人谦和善良，真诚体贴，深受亲友爱戴。他热爱生活，也关怀他人，是父母与朋友心中温暖而明亮的存在。' 
  },
  'bio.wish': { 
    en: 'Chuwei once said in a casual conversation, that his biggest wish in life is to make sure everyone around him is cheerful and well cared of. It was a mission that he carried in his heart, and one he fulfilled every second of his life.', 
    zh: '楚惟曾在一次轻松的交谈中提到，他一生最大的心愿，是让身边的每一个人都能快乐，并得到妥善的关怀。这份心愿他始终铭记于心，并在生命的每一刻身体力行。' 
  },
  'bio.closing': { 
    en: 'Chuwei has led a beautiful life full of passion and love. His presence changed everyone around him, and he will forever be in the memories of his mom, dad, family, and his friends whom he loved deeply.', 
    zh: '楚惟的一生充满热情与爱。他的存在深深影响了身边的每一个人，他将永远被铭记于母亲、父亲、家人，以及他所深爱、亦深爱着他的朋友们心中。' 
  },
  
  // Timeline page
  'timeline.title': { en: 'Life Journey', zh: '生命旅程' },
  'timeline.subtitle': { en: 'Milestones and cherished moments', zh: '里程碑和珍贵时刻' },
  
  // Gallery page
  'gallery.title': { en: 'Photo Gallery', zh: '相册' },
  'gallery.subtitle': { en: 'Treasured memories captured in time', zh: '定格的珍贵记忆' },
  'gallery.empty': { en: 'No photos yet. Be the first to share a memory.', zh: '暂无照片，成为第一个分享回忆的人。' },
  'gallery.noMore': { en: 'You\'ve seen all photos', zh: '已显示全部照片' },
  
  // Gallery upload
  'gallery.upload.button': { en: 'Share a Photo', zh: '分享照片' },
  'gallery.upload.title': { en: 'Share a Photo', zh: '分享照片' },
  'gallery.upload.description': { en: 'Upload a photo of Chuwei. It will be reviewed before appearing in the gallery.', zh: '上传楚惟的照片。审核后将显示在相册中。' },
  'gallery.upload.yourName': { en: 'Your Name (optional)', zh: '您的姓名（可选）' },
  'gallery.upload.yourNamePlaceholder': { en: 'Enter your name', zh: '请输入姓名' },
  'gallery.upload.dropzone': { en: 'Click to select an image', zh: '点击选择图片' },
  'gallery.upload.cancel': { en: 'Cancel', zh: '取消' },
  'gallery.upload.submit': { en: 'Upload', zh: '上传' },
  'gallery.upload.uploading': { en: 'Uploading...', zh: '上传中...' },
  'gallery.upload.success': { en: 'Photo uploaded!', zh: '照片已上传！' },
  'gallery.upload.successDescription': { en: 'Thank you for sharing. Your photo will appear after review.', zh: '感谢分享，照片将在审核后显示。' },
  'gallery.upload.error': { en: 'Upload failed. Please try again.', zh: '上传失败，请重试。' },
  'gallery.upload.errorSize': { en: 'File is too large. Maximum size is 10MB.', zh: '文件过大，最大允许10MB。' },
  'gallery.upload.errorType': { en: 'Please select an image file.', zh: '请选择图片文件。' },
  'gallery.placeholder': { en: 'Photos will be added here. Upload your photos to Cloudinary and add the URLs to the gallery data file.', zh: '照片将在此处添加。请将照片上传到Cloudinary并将URL添加到相册数据文件中。' },
  
  // Tributes page
  'tributes.title': { en: 'Tributes & Messages', zh: '留言悼念' },
  'tributes.subtitle': { en: 'Share your memories and messages of love', zh: '分享您的回忆和爱的留言' },
  'tributes.form.title': { en: 'Leave a Message', zh: '留言' },
  'tributes.messages.title': { en: 'Messages from Friends & Family', zh: '亲友留言' },
  
  // Tribute form
  'tributes.form.name': { en: 'Your Name', zh: '您的姓名' },
  'tributes.form.name.placeholder': { en: 'Enter your name', zh: '请输入姓名' },
  'tributes.form.relationship': { en: 'Relationship to Chuwei', zh: '与楚惟的关系' },
  'tributes.form.relationship.placeholder': { en: 'Select relationship', zh: '请选择关系' },
  'tributes.form.relationship.family': { en: 'Family', zh: '家人' },
  'tributes.form.relationship.friend': { en: 'Friend', zh: '朋友' },
  'tributes.form.relationship.classmate': { en: 'Classmate', zh: '同学' },
  'tributes.form.relationship.colleague': { en: 'Colleague', zh: '同事' },
  'tributes.form.relationship.other': { en: 'Other', zh: '其他' },
  'tributes.form.message': { en: 'Your Message', zh: '您的留言' },
  'tributes.form.message.placeholder': { en: 'Share your memory or message...', zh: '分享您的回忆或留言...' },
  'tributes.form.submit': { en: 'Submit Tribute', zh: '提交留言' },
  'tributes.form.submitting': { en: 'Submitting...', zh: '提交中...' },
  'tributes.form.success': { en: 'Thank you for your tribute. It will appear shortly.', zh: '感谢您的留言，稍后将会显示。' },
  'tributes.form.error.required': { en: 'Please fill in your name and message.', zh: '请填写姓名和留言。' },
  'tributes.form.error.submit': { en: 'Failed to submit. Please try again.', zh: '提交失败，请重试。' },
  'tributes.form.error.notConfigured': { en: 'Tribute submission is not yet configured.', zh: '留言提交尚未配置。' },
  'tributes.form.configureHint': { en: 'Google Apps Script URL not configured yet.', zh: 'Google Apps Script URL 尚未配置。' },
  
  // Tribute messages
  'tributes.messages.empty': { en: 'No tributes yet. Be the first to share a message.', zh: '暂无留言，成为第一个留言者。' },
  'tributes.messages.error': { en: 'Failed to load tributes.', zh: '加载留言失败。' },
  'tributes.messages.retry': { en: 'Try Again', zh: '重试' },
  'tributes.messages.refresh': { en: 'Refresh', zh: '刷新' },
  'tributes.messages.sortNewest': { en: 'Newest First', zh: '最新优先' },
  'tributes.messages.sortOldest': { en: 'Oldest First', zh: '最早优先' },
  'tributes.messages.configureHint': { en: 'Connect a Google Sheet to display tributes.', zh: '连接 Google Sheet 以显示留言。' },
  
  // Common
  'common.loading': { en: 'Loading...', zh: '加载中...' },
  'common.name': { en: 'Chuwei Guo', zh: '郭楚惟' },
  
  // Music controls
  'music.skip': { en: 'Next song', zh: '下一首' },
  'music.play': { en: 'Play', zh: '播放' },
  'music.pause': { en: 'Pause', zh: '暂停' },
  'music.clickToPlay': { en: 'Click to play music', zh: '点击播放音乐' },
  'music.openPlaylist': { en: 'Open full playlist', zh: '打开完整播放列表' },
  'music.noSound': { en: 'No sound?', zh: '没有声音？' },
  'music.signInRequired': { en: 'Sign in to YouTube Music', zh: '请登录 YouTube Music' },
  'music.signInDescription': { en: 'If you can\'t hear audio, please sign in to YouTube Music in your browser.', zh: '如果您听不到音频，请在浏览器中登录 YouTube Music。' },
  'music.signIn': { en: 'Sign in', zh: '登录' },
  'music.dismiss': { en: 'Dismiss', zh: '关闭' },
  
  // Contact
  'contact.title': { en: 'Contact Creator', zh: '联系创建者' },
  'contact.description': { en: 'Having issues or suggestions? Feel free to reach out.', zh: '有问题或建议？欢迎联系我。' },
  'contact.email': { en: 'Email', zh: '邮箱' },
  'contact.name': { en: 'Created by a friend of Chuwei', zh: '由楚惟的朋友创建' },
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
