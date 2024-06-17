import { FoodItem } from './food-item';
import { Participant } from './participant';
import { Profile } from './profile';

export const mockFoodPalettes: FoodItem[] = [
  new FoodItem('Grilled Fish', 200, [
    new Participant(new Profile('markus', 240), 200),
    new Participant(new Profile('emily', 120), 200),
    new Participant(new Profile('olivia', 190), 200),
  ]),
  new FoodItem('Chicken Sandwich', 180, [
    new Participant(new Profile('markus', 240), 90),
    new Participant(new Profile('ava', 45), 90),
  ]),
  new FoodItem('Mixed Noodles', 200, [
    new Participant(new Profile('isabella'), 100),
    new Participant(new Profile('jordan'), 100),
    new Participant(new Profile('lucas', 12), 100),
    new Participant(new Profile('martin'), 100),
  ]),
  new FoodItem('Orange Juice', 50, [
    new Participant(new Profile('markus', 240), 50),
    new Participant(new Profile('olivia', 190), 50),
    new Participant(new Profile('ava', 45), 50),
    new Participant(new Profile('emily', 120), 50),
    new Participant(new Profile('lucas', 12), 50),
    new Participant(new Profile('rodrick'), 50),
    new Participant(new Profile('maria'), 50),
  ]),
];
