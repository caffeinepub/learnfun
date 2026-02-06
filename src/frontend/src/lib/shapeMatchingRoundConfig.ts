// Round configuration for Shape Matching Game
export interface RoundConfig {
  pairCount: number;
  shapeTypes: string[];
  useStrokeStyle: boolean;
  useRotation: boolean;
  useSize: boolean;
  allowedRules: string[];
}

export function getRoundConfig(
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15',
  level: number
): RoundConfig {
  switch (ageGroup) {
    case '3-5':
      return {
        pairCount: Math.min(2 + Math.floor(level / 2), 3),
        shapeTypes: ['circle', 'square', 'triangle'],
        useStrokeStyle: false,
        useRotation: false,
        useSize: false,
        allowedRules: level === 1 ? ['matchExact'] : ['matchExact', 'matchShapeOnly'],
      };
    
    case '6-8':
      return {
        pairCount: Math.min(3 + Math.floor(level / 2), 5),
        shapeTypes: ['circle', 'square', 'triangle', 'star', 'heart'],
        useStrokeStyle: false,
        useRotation: false,
        useSize: false,
        allowedRules: ['matchExact', 'matchShapeOnly', 'matchColorOnly', 'matchShapeDifferentColor'],
      };
    
    case '9-12':
      return {
        pairCount: Math.min(4 + Math.floor(level / 2), 6),
        shapeTypes: ['circle', 'square', 'triangle', 'star', 'heart', 'hexagon', 'diamond', 'pentagon'],
        useStrokeStyle: true,
        useRotation: false,
        useSize: level > 2,
        allowedRules: ['matchExact', 'matchShapeOnly', 'matchColorOnly', 'matchStrokeStyle'],
      };
    
    case '13-15':
      return {
        pairCount: Math.min(5 + Math.floor(level / 2), 8),
        shapeTypes: ['circle', 'square', 'triangle', 'star', 'heart', 'hexagon', 'diamond', 'pentagon', 'oval', 'crescent'],
        useStrokeStyle: true,
        useRotation: true,
        useSize: true,
        allowedRules: ['matchExact', 'matchShapeOnly', 'matchColorOnly', 'matchStrokeStyle', 'matchRotation', 'matchSize'],
      };
    
    default:
      return {
        pairCount: 2,
        shapeTypes: ['circle', 'square', 'triangle'],
        useStrokeStyle: false,
        useRotation: false,
        useSize: false,
        allowedRules: ['matchExact'],
      };
  }
}
