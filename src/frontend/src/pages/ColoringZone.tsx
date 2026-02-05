import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Palette, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../lib/translations';
import { useColoringTemplates } from '../hooks/useQueries';
import type { AgeGroup } from '../App';
import ColoringCanvas from '../components/coloring/ColoringCanvas';
import type { ColoringTemplateWithData } from '../backend';
import { getFallbackTemplates, type FallbackTemplate } from '../lib/coloringFallbackTemplates';

interface ColoringZoneProps {
  ageGroup: AgeGroup;
  onBack: () => void;
}

type TemplateItem = ColoringTemplateWithData | FallbackTemplate;

function isFallbackTemplate(template: TemplateItem): template is FallbackTemplate {
  return 'imageUrl' in template;
}

export default function ColoringZone({ ageGroup, onBack }: ColoringZoneProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { data: backendTemplates, isLoading } = useColoringTemplates(ageGroup);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Use backend templates if available, otherwise use fallback templates
  const templates: TemplateItem[] = 
    backendTemplates && backendTemplates.length > 0 
      ? backendTemplates 
      : getFallbackTemplates(ageGroup);

  const handleImageError = (templateId: string) => {
    setFailedImages(prev => new Set(prev).add(templateId));
  };

  const isImageFailed = (templateId: string) => failedImages.has(templateId);

  if (selectedTemplate) {
    return (
      <ColoringCanvas
        template={selectedTemplate}
        onBack={() => setSelectedTemplate(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="bg-white/90 hover:bg-white border-4 border-fun-purple text-fun-purple font-bold text-lg shadow-lg"
        >
          <ArrowLeft className="mr-2 h-6 w-6" />
          {t.back}
        </Button>
        <div className="flex items-center gap-3 bg-white/90 px-6 py-3 rounded-2xl border-4 border-fun-pink shadow-lg">
          <Palette className="w-8 h-8 text-fun-pink" />
          <h1 className="text-2xl md:text-3xl font-black text-fun-purple">
            {t.coloringZone}
          </h1>
        </div>
      </div>

      {/* Templates Grid */}
      <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-pink shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-fun-purple mb-2">
              {t.chooseTemplate}
            </h2>
            <p className="text-lg text-gray-700">
              {t.selectTemplateToColor}
            </p>
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-fun-pink"></div>
              <p className="mt-4 text-xl font-semibold text-fun-purple">{t.loading}</p>
            </div>
          )}

          {!isLoading && templates.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => {
                const templateId = isFallbackTemplate(template) ? template.id : template.id;
                const imageUrl = isFallbackTemplate(template) 
                  ? template.imageUrl 
                  : template.template.getDirectURL();
                const isFailed = isImageFailed(templateId);

                return (
                  <Card
                    key={templateId}
                    className={`border-4 ${
                      isFailed 
                        ? 'border-gray-300 opacity-60 cursor-not-allowed' 
                        : 'border-fun-orange hover:border-fun-pink hover:scale-105 cursor-pointer'
                    } transition-all shadow-lg group`}
                    onClick={() => !isFailed && setSelectedTemplate(template)}
                  >
                    <CardContent className="p-6">
                      <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4 border-2 border-gray-200 relative">
                        {isFailed ? (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <AlertCircle className="w-16 h-16 mb-2" />
                            <p className="text-sm font-semibold">Image unavailable</p>
                          </div>
                        ) : (
                          <img
                            src={imageUrl}
                            alt={`Template ${templateId}`}
                            className="w-full h-full object-contain"
                            onError={() => handleImageError(templateId)}
                          />
                        )}
                      </div>
                      <Button
                        disabled={isFailed}
                        className={`w-full font-bold text-lg shadow-lg transition-transform ${
                          isFailed
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-fun-pink to-fun-purple hover:from-fun-purple hover:to-fun-pink text-white group-hover:scale-105'
                        }`}
                      >
                        <Palette className="mr-2 h-5 w-5" />
                        {isFailed ? 'Unavailable' : t.startColoring}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {!isLoading && templates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl font-semibold text-gray-600">{t.noTemplatesAvailable}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
