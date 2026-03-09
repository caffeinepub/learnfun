// Rule definitions for Shape Matching Game
export type RuleType = 
  | 'matchExact'
  | 'matchShapeOnly'
  | 'matchColorOnly'
  | 'matchShapeDifferentColor'
  | 'matchStrokeStyle'
  | 'matchRotation'
  | 'matchSize';

export interface MatchingRule {
  id: RuleType;
  instructionKey: string;
  evaluate: (shape1: ExtendedShape, shape2: ExtendedShape) => boolean;
  minAgeGroup: '3-5' | '6-8' | '9-12' | '13-15';
}

export interface ExtendedShape {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'hexagon' | 'diamond' | 'pentagon' | 'oval' | 'crescent';
  color: string;
  strokeStyle?: 'solid' | 'dashed';
  strokeColor?: string;
  rotation?: number;
  size?: number;
}

export const matchingRules: MatchingRule[] = [
  {
    id: 'matchExact',
    instructionKey: 'ruleMatchExact',
    evaluate: (s1, s2) => 
      s1.type === s2.type && 
      s1.color === s2.color &&
      (s1.strokeStyle || 'solid') === (s2.strokeStyle || 'solid') &&
      (s1.rotation || 0) === (s2.rotation || 0),
    minAgeGroup: '3-5',
  },
  {
    id: 'matchShapeOnly',
    instructionKey: 'ruleMatchShapeOnly',
    evaluate: (s1, s2) => s1.type === s2.type,
    minAgeGroup: '3-5',
  },
  {
    id: 'matchColorOnly',
    instructionKey: 'ruleMatchColorOnly',
    evaluate: (s1, s2) => s1.color === s2.color,
    minAgeGroup: '6-8',
  },
  {
    id: 'matchShapeDifferentColor',
    instructionKey: 'ruleMatchShapeDifferentColor',
    evaluate: (s1, s2) => s1.type === s2.type && s1.color !== s2.color,
    minAgeGroup: '6-8',
  },
  {
    id: 'matchStrokeStyle',
    instructionKey: 'ruleMatchStrokeStyle',
    evaluate: (s1, s2) => 
      (s1.strokeStyle || 'solid') === (s2.strokeStyle || 'solid'),
    minAgeGroup: '9-12',
  },
  {
    id: 'matchRotation',
    instructionKey: 'ruleMatchRotation',
    evaluate: (s1, s2) => (s1.rotation || 0) === (s2.rotation || 0),
    minAgeGroup: '13-15',
  },
  {
    id: 'matchSize',
    instructionKey: 'ruleMatchSize',
    evaluate: (s1, s2) => (s1.size || 1) === (s2.size || 1),
    minAgeGroup: '13-15',
  },
];

export function getRulesForAgeGroup(ageGroup: '3-5' | '6-8' | '9-12' | '13-15'): MatchingRule[] {
  const ageOrder = ['3-5', '6-8', '9-12', '13-15'];
  const currentIndex = ageOrder.indexOf(ageGroup);
  
  return matchingRules.filter(rule => {
    const ruleIndex = ageOrder.indexOf(rule.minAgeGroup);
    return ruleIndex <= currentIndex;
  });
}
