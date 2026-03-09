import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';
import { getRoundConfig } from '../../lib/shapeMatchingRoundConfig';
import { getRulesForAgeGroup, type ExtendedShape, type MatchingRule } from '../../lib/shapeMatchingRules';
import { playSound } from '../../services/audio';

interface ShapeMatchingGameProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
  onComplete: (level: number) => void;
  restartTrigger?: number;
}

const colorPalette = [
  '#FF6B6B', '#4ECDC4', '#FFD93D', '#A8E6CF', '#FFB6C1', '#C7CEEA',
  '#FF8C42', '#6C5CE7', '#00D2D3', '#FD79A8', '#FDCB6E', '#74B9FF',
  '#A29BFE', '#55EFC4', '#FF7675', '#DFE6E9', '#00B894', '#E17055'
];

const strokeColors = ['#000000', '#FF0000', '#0000FF', '#00FF00', '#FF00FF'];

export default function ShapeMatchingGame({ ageGroup, onBack, onComplete, restartTrigger }: ShapeMatchingGameProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [level, setLevel] = useState(1);
  const [shapes, setShapes] = useState<ExtendedShape[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [matchedShapes, setMatchedShapes] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [currentRule, setCurrentRule] = useState<MatchingRule | null>(null);
  const [totalPairs, setTotalPairs] = useState(0);

  const initializeGame = (currentLevel: number) => {
    const config = getRoundConfig(ageGroup, currentLevel);
    const availableRules = getRulesForAgeGroup(ageGroup).filter(rule => 
      config.allowedRules.includes(rule.id)
    );
    
    const selectedRule = availableRules[Math.floor(Math.random() * availableRules.length)];
    setCurrentRule(selectedRule);
    
    const generatedShapes = generateShapes(config, selectedRule);
    const shuffled = [...generatedShapes].sort(() => Math.random() - 0.5);
    
    setShapes(shuffled);
    setSelectedShapes([]);
    setMatchedShapes([]);
    setMoves(0);
    setTotalPairs(config.pairCount);
  };

  const generateShapes = (config: any, rule: MatchingRule): ExtendedShape[] => {
    const shapes: ExtendedShape[] = [];
    const usedCombos = new Set<string>();
    
    for (let i = 0; i < config.pairCount; i++) {
      let shape1: ExtendedShape;
      let shape2: ExtendedShape;
      let combo: string;
      
      do {
        const baseType = config.shapeTypes[Math.floor(Math.random() * config.shapeTypes.length)] as ExtendedShape['type'];
        const baseColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        const strokeStyle = config.useStrokeStyle ? (Math.random() > 0.5 ? 'dashed' : 'solid') as 'solid' | 'dashed' : 'solid';
        const strokeColor = config.useStrokeStyle ? strokeColors[Math.floor(Math.random() * strokeColors.length)] : '#000000';
        const rotation = config.useRotation ? Math.floor(Math.random() * 4) * 90 : 0;
        const size = config.useSize ? (Math.random() > 0.5 ? 0.8 : 1.2) : 1;
        
        shape1 = {
          id: `${i * 2 + 1}`,
          type: baseType,
          color: baseColor,
          strokeStyle,
          strokeColor,
          rotation,
          size,
        };
        
        // Generate matching pair based on rule
        shape2 = generateMatchingShape(shape1, rule, config);
        shape2.id = `${i * 2 + 2}`;
        
        combo = `${shape1.type}-${shape1.color}-${shape1.strokeStyle}-${shape1.rotation}-${shape2.type}-${shape2.color}`;
      } while (usedCombos.has(combo));
      
      usedCombos.add(combo);
      shapes.push(shape1, shape2);
    }
    
    return shapes;
  };

  const generateMatchingShape = (base: ExtendedShape, rule: MatchingRule, config: any): ExtendedShape => {
    const match: ExtendedShape = { ...base };
    
    switch (rule.id) {
      case 'matchExact':
        // Keep everything the same
        break;
      
      case 'matchShapeOnly':
        // Same shape, different color
        match.color = colorPalette.filter(c => c !== base.color)[Math.floor(Math.random() * (colorPalette.length - 1))];
        break;
      
      case 'matchColorOnly':
        // Same color, different shape
        const differentShapes = config.shapeTypes.filter((s: string) => s !== base.type);
        match.type = differentShapes[Math.floor(Math.random() * differentShapes.length)];
        break;
      
      case 'matchShapeDifferentColor':
        // Same shape, explicitly different color
        match.color = colorPalette.filter(c => c !== base.color)[Math.floor(Math.random() * (colorPalette.length - 1))];
        break;
      
      case 'matchStrokeStyle':
        // Same stroke style, can vary other attributes
        if (Math.random() > 0.5) {
          match.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        }
        break;
      
      case 'matchRotation':
        // Same rotation, can vary other attributes
        if (Math.random() > 0.5) {
          match.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        }
        break;
      
      case 'matchSize':
        // Same size, can vary other attributes
        if (Math.random() > 0.5) {
          match.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        }
        break;
    }
    
    return match;
  };

  useEffect(() => {
    setLevel(1);
    initializeGame(1);
  }, [ageGroup, restartTrigger]);

  const handleShapeClick = (shapeId: string) => {
    if (selectedShapes.length === 2 || matchedShapes.includes(shapeId)) return;

    // Play tap sound
    playSound('tap_click');

    const newSelected = [...selectedShapes, shapeId];
    setSelectedShapes(newSelected);

    if (newSelected.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newSelected;
      
      if (first === second) {
        playSound('match_fail');
        toast.error(t.tryAgainShort, { duration: 1500 });
        setTimeout(() => setSelectedShapes([]), 1000);
        return;
      }
      
      const firstShape = shapes.find(s => s.id === first);
      const secondShape = shapes.find(s => s.id === second);

      if (firstShape && secondShape && currentRule) {
        const isMatch = currentRule.evaluate(firstShape, secondShape);
        
        if (isMatch) {
          playSound('match_success');
          toast.success(t.greatMatch, { duration: 1500 });
          const newMatched = [...matchedShapes, first, second];
          setMatchedShapes(newMatched);
          setSelectedShapes([]);

          if (newMatched.length === shapes.length) {
            setTimeout(() => {
              playSound('level_complete');
              onComplete(level);
              setLevel(level + 1);
              initializeGame(level + 1);
            }, 1000);
          }
        } else {
          playSound('match_fail');
          toast.error(t.tryAgainShort, { duration: 1500 });
          setTimeout(() => setSelectedShapes([]), 1000);
        }
      }
    }
  };

  const renderShape = (shape: ExtendedShape) => {
    const baseSize = 80;
    const size = baseSize * (shape.size || 1);
    const centerX = baseSize / 2;
    const centerY = baseSize / 2;
    
    const commonProps = {
      fill: shape.color,
      stroke: shape.strokeColor || '#fff',
      strokeWidth: 3,
      strokeDasharray: shape.strokeStyle === 'dashed' ? '5,5' : undefined,
    };

    let shapeElement;
    switch (shape.type) {
      case 'circle':
        shapeElement = <circle cx={centerX} cy={centerY} r={size/3} {...commonProps} />;
        break;
      case 'square':
        shapeElement = <rect x={centerX - size/3} y={centerY - size/3} width={size*2/3} height={size*2/3} {...commonProps} />;
        break;
      case 'triangle':
        shapeElement = <polygon points={`${centerX},${centerY - size/3} ${centerX + size/3},${centerY + size/3} ${centerX - size/3},${centerY + size/3}`} {...commonProps} />;
        break;
      case 'star':
        shapeElement = <polygon points={`${centerX},${centerY - size/3} ${centerX + size/6},${centerY - size/12} ${centerX + size/3},${centerY - size/12} ${centerX + size/6},${centerY + size/12} ${centerX + size/4},${centerY + size/3} ${centerX},${centerX + size/6} ${centerX - size/4},${centerY + size/3} ${centerX - size/6},${centerY + size/12} ${centerX - size/3},${centerY - size/12} ${centerX - size/6},${centerY - size/12}`} {...commonProps} />;
        break;
      case 'heart':
        shapeElement = <path d={`M ${centerX} ${centerY + size/3} C ${centerX} ${centerY + size/3}, ${centerX - size/3} ${centerY + size/12}, ${centerX - size/3} ${centerY - size/12} C ${centerX - size/3} ${centerY - size/3}, ${centerX - size/6} ${centerY - size/3}, ${centerX} ${centerY - size/12} C ${centerX + size/6} ${centerY - size/3}, ${centerX + size/3} ${centerY - size/3}, ${centerX + size/3} ${centerY - size/12} C ${centerX + size/3} ${centerY + size/12}, ${centerX} ${centerY + size/3}, ${centerX} ${centerY + size/3}`} {...commonProps} />;
        break;
      case 'hexagon':
        shapeElement = <polygon points={`${centerX},${centerY - size/3} ${centerX + size/3},${centerY - size/6} ${centerX + size/3},${centerY + size/6} ${centerX},${centerY + size/3} ${centerX - size/3},${centerY + size/6} ${centerX - size/3},${centerY - size/6}`} {...commonProps} />;
        break;
      case 'diamond':
        shapeElement = <polygon points={`${centerX},${centerY - size/3} ${centerX + size/3},${centerY} ${centerX},${centerY + size/3} ${centerX - size/3},${centerY}`} {...commonProps} />;
        break;
      case 'pentagon':
        shapeElement = <polygon points={`${centerX},${centerY - size/3} ${centerX + size/3},${centerY - size/12} ${centerX + size/4},${centerY + size/3} ${centerX - size/4},${centerY + size/3} ${centerX - size/3},${centerY - size/12}`} {...commonProps} />;
        break;
      case 'oval':
        shapeElement = <ellipse cx={centerX} cy={centerY} rx={size/3} ry={size/4} {...commonProps} />;
        break;
      case 'crescent':
        shapeElement = (
          <>
            <circle cx={centerX} cy={centerY} r={size/3} {...commonProps} />
            <circle cx={centerX + size/6} cy={centerY} r={size/3} fill="#fff" stroke="none" />
          </>
        );
        break;
      default:
        shapeElement = <circle cx={centerX} cy={centerY} r={size/3} {...commonProps} />;
    }

    return (
      <g transform={`rotate(${shape.rotation || 0}, ${centerX}, ${centerY})`}>
        {shapeElement}
      </g>
    );
  };

  const gridCols = ageGroup === '3-5' ? 'grid-cols-2' : 
                   ageGroup === '6-8' ? 'grid-cols-3' : 
                   ageGroup === '9-12' ? 'grid-cols-4' : 'grid-cols-4';

  const pairsFound = matchedShapes.length / 2;

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
        <div className="flex gap-4">
          <div className="text-white text-xl md:text-2xl font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            {t.level}: {level}
          </div>
          <div className="text-white text-xl md:text-2xl font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            {t.moves}: {moves}
          </div>
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-orange shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-fun-purple">
              {t.shapeMatching}
            </h2>
            {currentRule && (
              <div className="bg-fun-yellow/20 border-2 border-fun-yellow rounded-xl p-4">
                <p className="text-lg md:text-xl text-gray-800 font-bold">
                  {t[currentRule.instructionKey as keyof typeof t] || currentRule.instructionKey}
                </p>
              </div>
            )}
            <div className="flex justify-center gap-8 text-lg font-semibold text-gray-700">
              <span>{t.pairsFound}: {pairsFound} / {totalPairs}</span>
            </div>
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
