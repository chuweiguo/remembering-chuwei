import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, User, RefreshCw, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Tribute {
  name: string;
  relationship: string;
  message: string;
  timestamp: string;
}

interface TributesListProps {
  sheetUrl?: string;
  refreshTrigger?: number;
}

const ITEMS_PER_PAGE = 3;

const TributesList = ({ sheetUrl, refreshTrigger }: TributesListProps) => {
  const { t, language } = useLanguage();
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortNewestFirst, setSortNewestFirst] = useState(false);

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
        .filter(tribute => tribute.name && tribute.message);

      setTributes(parsedTributes);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error fetching tributes:', err);
      setError(t('tributes.messages.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTributes();
  }, [sheetUrl, refreshTrigger]);

  const sortedTributes = useMemo(() => {
    const sorted = [...tributes];
    if (sortNewestFirst) {
      sorted.reverse();
    }
    return sorted;
  }, [tributes, sortNewestFirst]);

  const totalPages = Math.ceil(sortedTributes.length / ITEMS_PER_PAGE);
  const paginatedTributes = sortedTributes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

  const handleSortToggle = () => {
    setSortNewestFirst(!sortNewestFirst);
    setCurrentPage(1);
  };

  if (!sheetUrl) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t('tributes.messages.configureHint')}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-3">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchTributes}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {t('tributes.messages.retry')}
        </Button>
      </div>
    );
  }

  if (tributes.length === 0) {
    return (
      <div className="text-center py-8">
        <Heart className="h-10 w-10 text-memorial-gold mx-auto mb-3 opacity-50" />
        <p className="text-muted-foreground">{t('tributes.messages.empty')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={handleSortToggle}>
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {sortNewestFirst ? t('tributes.messages.sortOldest') : t('tributes.messages.sortNewest')}
        </Button>
        <Button variant="ghost" size="sm" onClick={fetchTributes}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {t('tributes.messages.refresh')}
        </Button>
      </div>
      
      {/* Tributes */}
      <div className="space-y-3">
        {paginatedTributes.map((tribute, index) => (
          <div
            key={`${tribute.timestamp}-${index}`}
            className="bg-card rounded-lg border border-border p-4 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-memorial-gold/20 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-memorial-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm">{tribute.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
            <p className="text-foreground text-sm whitespace-pre-wrap leading-relaxed pl-11">
              {tribute.message}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground px-3">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TributesList;