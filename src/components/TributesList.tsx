import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, User, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Tribute {
  name: string;
  relationship: string;
  message: string;
  timestamp: string;
}

interface TributesListProps {
  sheetUrl?: string;
}

const TributesList = ({ sheetUrl }: TributesListProps) => {
  const { t, language } = useLanguage();
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTributes = async () => {
    if (!sheetUrl) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(sheetUrl);
      const text = await response.text();
      
      // Parse CSV data (skip header row)
      const rows = text.split('\n').slice(1);
      const parsedTributes: Tribute[] = rows
        .filter(row => row.trim())
        .map(row => {
          // Handle CSV parsing with quoted fields
          const matches = row.match(/("([^"]*)")|([^,]+)/g) || [];
          const values = matches.map(v => v.replace(/^"|"$/g, '').trim());
          
          return {
            timestamp: values[0] || '',
            name: values[1] || '',
            relationship: values[2] || '',
            message: values[3] || '',
          };
        })
        .filter(tribute => tribute.name && tribute.message)
        .reverse(); // Show newest first

      setTributes(parsedTributes);
    } catch (err) {
      console.error('Error fetching tributes:', err);
      setError(t('tributes.messages.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTributes();
  }, [sheetUrl]);

  const formatDate = (timestamp: string) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return timestamp;
    }
  };

  const getRelationshipLabel = (relationship: string) => {
    const relationshipMap: Record<string, string> = {
      family: t('tributes.form.relationship.family'),
      friend: t('tributes.form.relationship.friend'),
      classmate: t('tributes.form.relationship.classmate'),
      colleague: t('tributes.form.relationship.colleague'),
      other: t('tributes.form.relationship.other'),
    };
    return relationshipMap[relationship] || relationship;
  };

  if (!sheetUrl) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t('tributes.messages.configureHint')}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <Button variant="outline" onClick={fetchTributes}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {t('tributes.messages.retry')}
        </Button>
      </div>
    );
  }

  if (tributes.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-12 w-12 text-memorial-gold mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">{t('tributes.messages.empty')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={fetchTributes}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {t('tributes.messages.refresh')}
        </Button>
      </div>
      
      {tributes.map((tribute, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-6 animate-fade-in-up"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-memorial-gold/20 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-memorial-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground">{tribute.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {tribute.relationship && (
                  <>
                    <span>{getRelationshipLabel(tribute.relationship)}</span>
                    <span>•</span>
                  </>
                )}
                <span>{formatDate(tribute.timestamp)}</span>
              </div>
            </div>
          </div>
          <p className="text-foreground whitespace-pre-wrap leading-relaxed">
            {tribute.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TributesList;
