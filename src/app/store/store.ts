import { FoodItem } from "../classes/food-item";
import { Profile } from "../classes/profile";

export interface IApplicationState {
    profiles: Profile[];
    palettes: FoodItem[];
    tax: number;
    discount: number;
  }      

export const initialState: IApplicationState = {
    profiles: [],
    palettes: [],
    tax: 0,
    discount: 0
}