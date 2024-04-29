import { Action, ActionType } from '../classes/constants';
import { FoodItem } from '../classes/food-item';
import { IApplicationState } from './store';

export function actionReducer(state: IApplicationState, action: Action) {
  const payload = action.payload;
  switch (action.type) {
    case ActionType.ADD_PROFILE:
      const profile = payload.profile;
      if (profile && profile.name) {
        return { ...state, profiles: [...state.profiles, profile] };
      }
      break;
    case ActionType.REMOVE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter((x) => x.name !== payload.name),
      };
    case ActionType.ADD_PALETTE:
      if (payload.id) {
        const foodItem = new FoodItem('-', 0, [], payload.id);
        return {
          ...state,
          palettes: [...state.palettes, foodItem],
        };
      }
  }
  return { state };
}
