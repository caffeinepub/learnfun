import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';
import { selectSessionItems, getCategoriesForAge, type AgeGroupKey } from '../../lib/sortingClassificationSelection';
import type { SortingItem } from '../../lib/sortingClassificationItemPools';

interface SortingClassificationGameProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
  onComplete: (level: number) => void;
  restartTrigger?: number;
}

export default function SortingClassificationGame({ ageGroup, onBack, onComplete, restartTrigger }: SortingClassificationGameProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [items, setItems] = useState<SortingItem[]>([]);
  const [categories] = useState<string[]>(getCategoriesForAge(ageGroup as AgeGroupKey));
  const [sortedItems, setSortedItems] = useState<Record<string, string[]>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [remainingItems, setRemainingItems] = useState<SortingItem[]>([]);

  const initializeGame = () => {
    const sessionItems = selectSessionItems(ageGroup as AgeGroupKey);
    const shuffled = [...sessionItems].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setRemainingItems(shuffled);
    
    const initialSorted: Record<string, string[]> = {};
    categories.forEach(cat => {
      initialSorted[cat] = [];
    });
    setSortedItems(initialSorted);
    setSelectedItem(null);
  };

  useEffect(() => {
    initializeGame();
  }, [ageGroup, categories, restartTrigger]);

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
  };

  const handleCategoryClick = (category: string) => {
    if (!selectedItem) {
      toast.error(t.sortingSelectItem, { duration: 1500 });
      return;
    }

    const item = items.find(i => i.id === selectedItem);
    if (!item) return;

    if (item.category === category) {
      toast.success(t.sortingCorrect, { duration: 1500 });
      setSortedItems({
        ...sortedItems,
        [category]: [...sortedItems[category], selectedItem]
      });
      setRemainingItems(remainingItems.filter(i => i.id !== selectedItem));
      setSelectedItem(null);

      if (remainingItems.length === 1) {
        setTimeout(() => onComplete(1), 1000);
      }
    } else {
      toast.error(t.sortingIncorrect, { duration: 1500 });
      setSelectedItem(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          size="lg"
          className="bg-white/90 hover:bg-white text-fun-purple font-bold shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          {t.back}
        </Button>
        <div className="text-white text-xl md:text-2xl font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
          {t.sortingRemaining}: {remainingItems.length}
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-orange shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-fun-purple">
              {t.sortingGame}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-semibold">
              {t.sortingGameDesc}
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-fun-purple mb-4">{t.sortingItems}:</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {remainingItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      px-6 py-4 rounded-2xl border-4 transition-all text-2xl font-bold
                      ${selectedItem === item.id 
                        ? 'bg-fun-yellow border-fun-orange scale-110 shadow-2xl' 
                        : 'bg-white border-fun-purple hover:scale-105'}
                    `}
                  >
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <div className="text-sm">{item.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-fun-purple mb-4">{t.sortingCategories}:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="bg-gradient-to-br from-fun-purple to-fun-blue text-white p-6 rounded-2xl border-4 border-white hover:scale-105 transition-all shadow-xl"
                  >
                    <div className="text-xl font-bold mb-3 capitalize">
                      {t[`sorting${category.charAt(0).toUpperCase() + category.slice(1)}` as keyof typeof t] || category}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
                      {sortedItems[category]?.map((itemId) => {
                        const item = items.find(i => i.id === itemId);
                        return item ? (
                          <div key={itemId} className="text-3xl">
                            {item.emoji}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
