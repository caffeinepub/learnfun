import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';

interface ShapeMatchingGameProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
  onComplete: (level: number) => void;
}

type Shape = {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'hexagon';
  color: string;
};

const shapes3to5: Shape[] = [
  { id: '1', type: 'circle', color: '#FF6B6B' },
  { id: '2', type: 'square', color: '#4ECDC4' },
  { id: '3', type: 'circle', color: '#FF6B6B' },
  { id: '4', type: 'square', color: '#4ECDC4' },
];

const shapes6to8: Shape[] = [
  { id: '1', type: 'circle', color: '#FF6B6B' },
  { id: '2', type: 'square', color: '#4ECDC4' },
  { id: '3', type: 'triangle', color: '#FFD93D' },
  { id: '4', type: 'circle', color: '#FF6B6B' },
  { id: '5', type: 'square', color: '#4ECDC4' },
  { id: '6', type: 'triangle', color: '#FFD93D' },
];

const shapes9to12: Shape[] = [
  { id: '1', type: 'circle', color: '#FF6B6B' },
  { id: '2', type: 'square', color: '#4ECDC4' },
  { id: '3', type: 'triangle', color: '#FFD93D' },
  { id: '4', type: 'star', color: '#A8E6CF' },
  { id: '5', type: 'heart', color: '#FFB6C1' },
  { id: '6', type: 'hexagon', color: '#C7CEEA' },
  { id: '7', type: 'circle', color: '#FF6B6B' },
  { id: '8', type: 'square', color: '#4ECDC4' },
  { id: '9', type: 'triangle', color: '#FFD93D' },
  { id: '10', type: 'star', color: '#A8E6CF' },
  { id: '11', type: 'heart', color: '#FFB6C1' },
  { id: '12', type: 'hexagon', color: '#C7CEEA' },
];

const shapes13to15: Shape[] = [
  { id: '1', type: 'circle', color: '#FF6B6B' },
  { id: '2', type: 'square', color: '#4ECDC4' },
  { id: '3', type: 'triangle', color: '#FFD93D' },
  { id: '4', type: 'star', color: '#A8E6CF' },
  { id: '5', type: 'heart', color: '#FFB6C1' },
  { id: '6', type: 'hexagon', color: '#C7CEEA' },
  { id: '7', type: 'circle', color: '#FF6B6B' },
  { id: '8', type: 'square', color: '#4ECDC4' },
  { id: '9', type: 'triangle', color: '#FFD93D' },
  { id: '10', type: 'star', color: '#A8E6CF' },
  { id: '11', type: 'heart', color: '#FFB6C1' },
  { id: '12', type: 'hexagon', color: '#C7CEEA' },
  { id: '13', type: 'circle', color: '#8B5CF6' },
  { id: '14', type: 'square', color: '#EC4899' },
];

export default function ShapeMatchingGame({ ageGroup, onBack, onComplete }: ShapeMatchingGameProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [matchedShapes, setMatchedShapes] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shapeSet = ageGroup === '3-5' ? shapes3to5 : ageGroup === '6-8' ? shapes6to8 : ageGroup === '9-12' ? shapes9to12 : shapes13to15;
    const shuffled = [...shapeSet].sort(() => Math.random() - 0.5);
    setShapes(shuffled);
  }, [ageGroup]);

  const handleShapeClick = (shapeId: string) => {
    if (selectedShapes.length === 2 || matchedShapes.includes(shapeId)) return;

    const newSelected = [...selectedShapes, shapeId];
    setSelectedShapes(newSelected);

    if (newSelected.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newSelected;
      const firstShape = shapes.find(s => s.id === first);
      const secondShape = shapes.find(s => s.id === second);

      if (firstShape && secondShape && firstShape.type === secondShape.type && first !== second) {
        toast.success(t.greatMatch, { duration: 1500 });
        setMatchedShapes([...matchedShapes, first, second]);
        setSelectedShapes([]);

        if (matchedShapes.length + 2 === shapes.length) {
          setTimeout(() => onComplete(1), 1000);
        }
      } else {
        toast.error(t.tryAgainShort, { duration: 1500 });
        setTimeout(() => setSelectedShapes([]), 1000);
      }
    }
  };

  const renderShape = (shape: Shape) => {
    const size = 80;
    const commonProps = {
      fill: shape.color,
      stroke: '#fff',
      strokeWidth: 3,
    };

    switch (shape.type) {
      case 'circle':
        return <circle cx={size/2} cy={size/2} r={size/3} {...commonProps} />;
      case 'square':
        return <rect x={size/6} y={size/6} width={size*2/3} height={size*2/3} {...commonProps} />;
      case 'triangle':
        return <polygon points={`${size/2},${size/6} ${size*5/6},${size*5/6} ${size/6},${size*5/6}`} {...commonProps} />;
      case 'star':
        return <polygon points={`${size/2},${size/6} ${size*3/5},${size*2/5} ${size*5/6},${size*2/5} ${size*2/3},${size*3/5} ${size*3/4},${size*5/6} ${size/2},${size*2/3} ${size/4},${size*5/6} ${size/3},${size*3/5} ${size/6},${size*2/5} ${size*2/5},${size*2/5}`} {...commonProps} />;
      case 'heart':
        return <path d={`M ${size/2} ${size*5/6} C ${size/2} ${size*5/6}, ${size/6} ${size*3/5}, ${size/6} ${size*2/5} C ${size/6} ${size/6}, ${size*2/5} ${size/6}, ${size/2} ${size*2/5} C ${size*3/5} ${size/6}, ${size*5/6} ${size/6}, ${size*5/6} ${size*2/5} C ${size*5/6} ${size*3/5}, ${size/2} ${size*5/6}, ${size/2} ${size*5/6}`} {...commonProps} />;
      case 'hexagon':
        return <polygon points={`${size/2},${size/6} ${size*5/6},${size/3} ${size*5/6},${size*2/3} ${size/2},${size*5/6} ${size/6},${size*2/3} ${size/6},${size/3}`} {...commonProps} />;
    }
  };

  const gridCols = ageGroup === '3-5' ? 'grid-cols-2' : ageGroup === '6-8' ? 'grid-cols-3' : ageGroup === '9-12' ? 'grid-cols-4' : 'grid-cols-4';

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
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
          {t.moves}: {moves}
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-orange shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-fun-purple">
              {t.shapeMatching}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-semibold">
              {t.findMatchingShapes}
            </p>
          </div>

          <div className={`grid ${gridCols} gap-4`}>
            {shapes.map((shape) => {
              const isSelected = selectedShapes.includes(shape.id);
              const isMatched = matchedShapes.includes(shape.id);

              return (
                <button
                  key={shape.id}
                  onClick={() => handleShapeClick(shape.id)}
                  disabled={isMatched}
                  className={`
                    aspect-square rounded-2xl border-4 transition-all
                    ${isMatched ? 'bg-green-100 border-green-400 opacity-50' : 'bg-white border-fun-purple hover:scale-110'}
                    ${isSelected ? 'scale-110 border-fun-yellow shadow-2xl' : ''}
                  `}
                >
                  <svg viewBox="0 0 80 80" className="w-full h-full p-2">
                    {renderShape(shape)}
                  </svg>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
