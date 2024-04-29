import { FoodItem } from '../classes/food-item';
import { Profile } from '../classes/profile';

export interface IApplicationState {
  profiles: Profile[];
  palettes: FoodItem[];
  modifiers: {
    tax: number;
    discount: number;
  };
}

export const initialState: IApplicationState = {
  profiles: [],
  palettes: [],
  modifiers: {
    tax: 0,
    discount: 0,
  },
};
