import type { AgeGroup } from '../App';

export interface FallbackTemplate {
  id: string;
  name: string;
  imageUrl: string;
  ageGroup: Exclude<AgeGroup, null>;
}

type AgeGroupKey = Exclude<AgeGroup, null>;

const fallbackTemplates: Record<AgeGroupKey, FallbackTemplate[]> = {
  '3-5': [
    {
      id: 'fallback-3-5-kitten',
      name: 'Cute Kitten',
      imageUrl: '/assets/generated/coloring-3-5-01-kitten.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-train',
      name: 'Toy Train',
      imageUrl: '/assets/generated/coloring-3-5-02-train.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-puppy',
      name: 'Smiling Puppy',
      imageUrl: '/assets/generated/coloring-3-5-03-puppy.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-turtle',
      name: 'Friendly Turtle',
      imageUrl: '/assets/generated/coloring-3-5-04-turtle.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-car',
      name: 'Happy Balloon Car',
      imageUrl: '/assets/generated/coloring-3-5-05-car.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-bunny',
      name: 'Cute Smiling Bunny',
      imageUrl: '/assets/generated/coloring-3-5-06-bunny.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-dolphin',
      name: 'Friendly Baby Dolphin',
      imageUrl: '/assets/generated/coloring-3-5-07-dolphin.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-teddy',
      name: 'Happy Teddy Bear',
      imageUrl: '/assets/generated/coloring-3-5-08-teddy.dim_2048x2048.png',
      ageGroup: '3-5',
    },
  ],
  '6-8': [
    {
      id: 'fallback-6-8-elephant',
      name: 'Friendly Elephant',
      imageUrl: '/assets/generated/coloring-6-8-01-elephant.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-rocket',
      name: 'Rocket Ship',
      imageUrl: '/assets/generated/coloring-6-8-02-rocket.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-giraffe',
      name: 'Friendly Giraffe',
      imageUrl: '/assets/generated/coloring-6-8-03-giraffe.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-submarine',
      name: 'Cute Submarine',
      imageUrl: '/assets/generated/coloring-6-8-04-submarine.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-wizard-hat',
      name: 'Wizard Hat Character',
      imageUrl: '/assets/generated/coloring-6-8-05-wizard-hat.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-panda',
      name: 'Playful Panda',
      imageUrl: '/assets/generated/coloring-6-8-06-panda.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-hot-air-balloon',
      name: 'Cute Hot Air Balloon',
      imageUrl: '/assets/generated/coloring-6-8-07-hot-air-balloon.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-castle',
      name: 'Smiling Castle',
      imageUrl: '/assets/generated/coloring-6-8-08-castle.dim_2048x2048.png',
      ageGroup: '6-8',
    },
  ],
  '9-12': [
    {
      id: 'fallback-9-12-dinosaur',
      name: 'Cheerful Dinosaur',
      imageUrl: '/assets/generated/coloring-9-12-01-dinosaur.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-robot',
      name: 'Friendly Robot',
      imageUrl: '/assets/generated/coloring-9-12-02-robot.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-unicorn',
      name: 'Cheerful Unicorn',
      imageUrl: '/assets/generated/coloring-9-12-03-unicorn.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-astronaut',
      name: 'Space Explorer',
      imageUrl: '/assets/generated/coloring-9-12-04-astronaut.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-camera',
      name: 'Vintage Camera',
      imageUrl: '/assets/generated/coloring-9-12-05-camera.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-octopus',
      name: 'Friendly Octopus',
      imageUrl: '/assets/generated/coloring-9-12-06-octopus.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-planet',
      name: 'Cute Smiling Planet',
      imageUrl: '/assets/generated/coloring-9-12-07-planet.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-skateboard',
      name: 'Cheerful Skateboard',
      imageUrl: '/assets/generated/coloring-9-12-08-skateboard.dim_2048x2048.png',
      ageGroup: '9-12',
    },
  ],
  '13-15': [
    {
      id: 'fallback-13-15-dragon',
      name: 'Fantasy Dragon',
      imageUrl: '/assets/generated/coloring-13-15-01-dragon.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-reading-corner',
      name: 'Reading Corner',
      imageUrl: '/assets/generated/coloring-13-15-02-reading-corner.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-phoenix',
      name: 'Phoenix Bird',
      imageUrl: '/assets/generated/coloring-13-15-03-phoenix.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-study-desk',
      name: 'Cozy Study Desk',
      imageUrl: '/assets/generated/coloring-13-15-04-study-desk.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-steampunk-robot',
      name: 'Steampunk Robot',
      imageUrl: '/assets/generated/coloring-13-15-05-steampunk-robot.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-fox',
      name: 'Friendly Fox',
      imageUrl: '/assets/generated/coloring-13-15-06-fox.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-spaceship',
      name: 'Sci-Fi Spaceship',
      imageUrl: '/assets/generated/coloring-13-15-07-spaceship.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-knight-helmet',
      name: 'Fantasy Knight Helmet',
      imageUrl: '/assets/generated/coloring-13-15-08-knight-helmet.dim_2048x2048.png',
      ageGroup: '13-15',
    },
  ],
};

export function getFallbackTemplates(ageGroup: AgeGroup): FallbackTemplate[] {
  if (!ageGroup) return [];
  return fallbackTemplates[ageGroup] || [];
}
