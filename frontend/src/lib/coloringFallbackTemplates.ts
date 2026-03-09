import type { AgeGroup } from '../App';

export interface FallbackTemplate {
  id: string;
  name: string;
  imageUrl: string;
  ageGroup: Exclude<AgeGroup, null>;
}

type AgeGroupKey = Exclude<AgeGroup, null>;

/**
 * Fallback coloring templates for offline/static use.
 * 
 * IMPORTANT: All templates MUST follow strict outline-only policy:
 * - Black thick contours only (no grayscale, shading, texture, or shadows)
 * - Pure white background with no patterns or decorations
 * - No text, labels, or watermarks
 * - Clean, closed contours suitable for digital coloring
 * - Simple shapes appropriate for the target age group
 */
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
    {
      id: 'fallback-3-5-turtle-new',
      name: 'Cheerful Turtle',
      imageUrl: '/assets/generated/coloring-3-5-09-turtle.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-elephant-new',
      name: 'Baby Elephant',
      imageUrl: '/assets/generated/coloring-3-5-10-elephant.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-ladybug',
      name: 'Cute Ladybug',
      imageUrl: '/assets/generated/coloring-3-5-11-ladybug.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-snail',
      name: 'Friendly Snail',
      imageUrl: '/assets/generated/coloring-3-5-12-snail.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-penguin',
      name: 'Happy Penguin',
      imageUrl: '/assets/generated/coloring-3-5-13-penguin.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-sun',
      name: 'Smiling Sun',
      imageUrl: '/assets/generated/coloring-3-5-14-sun.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-ice-cream',
      name: 'Sweet Ice Cream',
      imageUrl: '/assets/generated/coloring-3-5-15-ice-cream.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-fish',
      name: 'Cute Fish',
      imageUrl: '/assets/generated/coloring-3-5-16-fish.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-duck',
      name: 'Smiling Duck',
      imageUrl: '/assets/generated/coloring-3-5-17-duck.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-dino',
      name: 'Friendly Dinosaur',
      imageUrl: '/assets/generated/coloring-3-5-18-dino.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-cupcake',
      name: 'Happy Cupcake',
      imageUrl: '/assets/generated/coloring-3-5-19-cupcake.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-bee',
      name: 'Cute Smiling Bee',
      imageUrl: '/assets/generated/coloring-3-5-20-bee.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-baby-dino',
      name: 'Friendly Baby Dinosaur',
      imageUrl: '/assets/generated/coloring-3-5-21-baby-dino.dim_2048x2048.png',
      ageGroup: '3-5',
    },
    {
      id: 'fallback-3-5-sailboat',
      name: 'Happy Little Sailboat',
      imageUrl: '/assets/generated/coloring-3-5-22-sailboat.dim_2048x2048.png',
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
    {
      id: 'fallback-6-8-dinosaur',
      name: 'Friendly Dinosaur',
      imageUrl: '/assets/generated/coloring-6-8-09-dinosaur.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-fire-truck',
      name: 'Fire Truck',
      imageUrl: '/assets/generated/coloring-6-8-10-fire-truck.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-rocket-new',
      name: 'Space Rocket',
      imageUrl: '/assets/generated/coloring-6-8-11-rocket.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-koala',
      name: 'Cute Koala',
      imageUrl: '/assets/generated/coloring-6-8-12-koala.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-airplane',
      name: 'Flying Airplane',
      imageUrl: '/assets/generated/coloring-6-8-13-airplane.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-cactus',
      name: 'Happy Cactus',
      imageUrl: '/assets/generated/coloring-6-8-14-cactus.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-whale',
      name: 'Friendly Whale',
      imageUrl: '/assets/generated/coloring-6-8-15-whale.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-alien-ufo',
      name: 'Alien UFO',
      imageUrl: '/assets/generated/coloring-6-8-16-alien-ufo.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-monkey',
      name: 'Playful Monkey',
      imageUrl: '/assets/generated/coloring-6-8-17-monkey.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-bicycle',
      name: 'Smiling Bicycle',
      imageUrl: '/assets/generated/coloring-6-8-18-bicycle.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-octopus',
      name: 'Friendly Octopus',
      imageUrl: '/assets/generated/coloring-6-8-19-octopus.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-astronaut',
      name: 'Cute Astronaut Waving',
      imageUrl: '/assets/generated/coloring-6-8-20-astronaut.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-friendly-dragon',
      name: 'Friendly Dragon',
      imageUrl: '/assets/generated/coloring-6-8-21-friendly-dragon.dim_2048x2048.png',
      ageGroup: '6-8',
    },
    {
      id: 'fallback-6-8-ice-cream-truck',
      name: 'Smiling Ice Cream Truck',
      imageUrl: '/assets/generated/coloring-6-8-22-ice-cream-truck.dim_2048x2048.png',
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
    {
      id: 'fallback-9-12-sea-turtle',
      name: 'Sea Turtle',
      imageUrl: '/assets/generated/coloring-9-12-09-sea-turtle.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-robot-new',
      name: 'Cool Robot',
      imageUrl: '/assets/generated/coloring-9-12-10-robot.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-dragon',
      name: 'Friendly Dragon',
      imageUrl: '/assets/generated/coloring-9-12-11-dragon.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-castle-tower',
      name: 'Castle Tower',
      imageUrl: '/assets/generated/coloring-9-12-12-castle-tower.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-robot-dog',
      name: 'Robot Dog',
      imageUrl: '/assets/generated/coloring-9-12-13-robot-dog.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-mountain',
      name: 'Mountain Landscape',
      imageUrl: '/assets/generated/coloring-9-12-14-mountain.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-helmet',
      name: 'Adventure Helmet',
      imageUrl: '/assets/generated/coloring-9-12-15-helmet.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-dragon-egg',
      name: 'Dragon Egg',
      imageUrl: '/assets/generated/coloring-9-12-16-dragon-egg.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-robot-cat',
      name: 'Robot Cat',
      imageUrl: '/assets/generated/coloring-9-12-17-robot-cat.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-satellite',
      name: 'Space Satellite',
      imageUrl: '/assets/generated/coloring-9-12-18-satellite.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-helmet-stickers',
      name: 'Helmet with Stickers',
      imageUrl: '/assets/generated/coloring-9-12-19-helmet-stickers.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-robot-cat-new',
      name: 'Robot Cat Character',
      imageUrl: '/assets/generated/coloring-9-12-20-robot-cat.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-camper-van',
      name: 'Mountain Camper Van',
      imageUrl: '/assets/generated/coloring-9-12-21-camper-van.dim_2048x2048.png',
      ageGroup: '9-12',
    },
    {
      id: 'fallback-9-12-ringed-planet',
      name: 'Space Planet with Ring',
      imageUrl: '/assets/generated/coloring-9-12-22-ringed-planet.dim_2048x2048.png',
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
    {
      id: 'fallback-13-15-owl',
      name: 'Wise Owl',
      imageUrl: '/assets/generated/coloring-13-15-09-owl.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-camera',
      name: 'Vintage Camera',
      imageUrl: '/assets/generated/coloring-13-15-10-camera.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-sailboat',
      name: 'Sailboat',
      imageUrl: '/assets/generated/coloring-13-15-11-sailboat.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-dragon-crystal',
      name: 'Dragon with Crystal',
      imageUrl: '/assets/generated/coloring-13-15-17-dragon-crystal.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-handheld-console',
      name: 'Handheld Game Console',
      imageUrl: '/assets/generated/coloring-13-15-18-handheld-console.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-headphones',
      name: 'Cozy Headphones',
      imageUrl: '/assets/generated/coloring-13-15-19-headphones.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-owl-goggles',
      name: 'Steampunk Owl with Goggles',
      imageUrl: '/assets/generated/coloring-13-15-20-owl-goggles.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-hoverboard',
      name: 'Sci-Fi Hoverboard',
      imageUrl: '/assets/generated/coloring-13-15-21-hoverboard.dim_2048x2048.png',
      ageGroup: '13-15',
    },
    {
      id: 'fallback-13-15-cozy-desk',
      name: 'Cozy Desk Setup',
      imageUrl: '/assets/generated/coloring-13-15-22-cozy-desk.dim_2048x2048.png',
      ageGroup: '13-15',
    },
  ],
};

export function getFallbackTemplates(ageGroup: AgeGroup): FallbackTemplate[] {
  if (!ageGroup) return [];
  return fallbackTemplates[ageGroup] || [];
}
