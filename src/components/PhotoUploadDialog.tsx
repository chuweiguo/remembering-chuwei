import { useState, useRef } from 'react';
import { Upload, X, ImagePlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const UPLOAD_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySydyo_OnE9NwXOrdoJu2fS_J-iRaiPitPBUti1oglmVHW3lt-gWJZAZp_sauk0GZR/exec';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function PhotoUploadDialog() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: t('gallery.upload.errorSize'),
        variant: 'destructive',
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: t('gallery.upload.errorType'),
        variant: 'destructive',
      });
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview) return;

    setUploading(true);
    try {
      const finalFileName = uploaderName 
        ? `${uploaderName.trim().replace(/\s+/g, '_')}_${Date.now()}.jpg`
        : `anonymous_${Date.now()}.jpg`;

      const response = await fetch(UPLOAD_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: preview,
          fileName: finalFileName,
        }),
      });

      // With no-cors, we can't read the response, so we assume success
      toast({
        title: t('gallery.upload.success'),
        description: t('gallery.upload.successDescription'),
      });
      
      setOpen(false);
      setPreview(null);
      setFileName('');
      setUploaderName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      toast({
        title: t('gallery.upload.error'),
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          {t('gallery.upload.button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('gallery.upload.title')}</DialogTitle>
          <DialogDescription>
            {t('gallery.upload.description')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="uploader-name">{t('gallery.upload.yourName')}</Label>
            <Input
              id="uploader-name"
              placeholder={t('gallery.upload.yourNamePlaceholder')}
              value={uploaderName}
              onChange={(e) => setUploaderName(e.target.value)}
              maxLength={50}
            />
          </div>

          {!preview ? (
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                {t('gallery.upload.dropzone')}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-lg max-h-64 object-contain bg-muted"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={clearPreview}
              >
                <X className="h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground mt-2 truncate">
                {fileName}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t('gallery.upload.cancel')}
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!preview || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t('gallery.upload.uploading')}
              </>
            ) : (
              t('gallery.upload.submit')
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
