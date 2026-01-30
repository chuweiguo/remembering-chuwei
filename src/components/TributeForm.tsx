import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';

interface TributeFormProps {
  scriptUrl?: string;
  onSubmitSuccess?: () => void;
}

const TributeForm = ({ scriptUrl, onSubmitSuccess }: TributeFormProps) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error(t('tributes.form.error.required'));
      return;
    }

    if (!scriptUrl) {
      toast.error(t('tributes.form.error.notConfigured'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          relationship: formData.relationship || t('tributes.form.relationship.other'),
          message: formData.message.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      // With no-cors, we can't read the response, so we assume success
      toast.success(t('tributes.form.success'));
      setFormData({ name: '', relationship: '', message: '' });
      
      // Trigger refresh after a short delay to allow Google Sheets to update
      if (onSubmitSuccess) {
        setTimeout(onSubmitSuccess, 2000);
      }
    } catch (error) {
      console.error('Error submitting tribute:', error);
      toast.error(t('tributes.form.error.submit'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const relationships = [
    { value: 'family', labelKey: 'tributes.form.relationship.family' },
    { value: 'friend', labelKey: 'tributes.form.relationship.friend' },
    { value: 'classmate', labelKey: 'tributes.form.relationship.classmate' },
    { value: 'colleague', labelKey: 'tributes.form.relationship.colleague' },
    { value: 'other', labelKey: 'tributes.form.relationship.other' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">{t('tributes.form.name')} *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={t('tributes.form.name.placeholder')}
          disabled={isSubmitting}
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="relationship">{t('tributes.form.relationship')}</Label>
        <Select
          value={formData.relationship}
          onValueChange={(value) => setFormData({ ...formData, relationship: value })}
          disabled={isSubmitting}
        >
          <SelectTrigger id="relationship">
            <SelectValue placeholder={t('tributes.form.relationship.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {relationships.map((rel) => (
              <SelectItem key={rel.value} value={rel.value}>
                {t(rel.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t('tributes.form.message')} *</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={t('tributes.form.message.placeholder')}
          disabled={isSubmitting}
          rows={5}
          maxLength={2000}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !scriptUrl}
        className="w-full bg-memorial-gold hover:bg-memorial-gold/90 text-memorial-dark"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('tributes.form.submitting')}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {t('tributes.form.submit')}
          </>
        )}
      </Button>

      {!scriptUrl && (
        <p className="text-sm text-muted-foreground text-center">
          {t('tributes.form.configureHint')}
        </p>
      )}
    </form>
  );
};

export default TributeForm;
