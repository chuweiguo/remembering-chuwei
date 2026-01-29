import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/timeline', label: t('nav.timeline') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/tributes', label: t('nav.tributes') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold text-foreground">
            {t('common.name')}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="min-w-[80px]"
          >
            {language === 'en' ? '中文' : 'English'}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav className="md:hidden flex items-center justify-center gap-4 pb-3 border-t border-border/30">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "text-xs font-medium transition-colors hover:text-primary py-2",
              location.pathname === link.path
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
