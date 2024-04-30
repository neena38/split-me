import { Action, ActionType } from '../classes/constants';
import { FoodItem } from '../classes/food-item';
import { Profile } from '../classes/profile';
import { IApplicationState } from './store';
//////////////////////////////////
type ReducerFunction = (
  state: IApplicationState,
  payload: any
) => IApplicationState;

const reducerFunctions: { [key in ActionType]: ReducerFunction } = {
  [ActionType.ADD_PROFILE]: addProfile,
  [ActionType.REMOVE_PROFILE]: removeProfile,
  [ActionType.ADD_PALETTE]: addPalette,
  [ActionType.REMOVE_PALETTE]: removePalette,
  [ActionType.DEFAULT]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
  [ActionType.ADD_PARTICIPANT]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
  [ActionType.REMOVE_PARTICIPANT]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
  [ActionType.UPDATE_DISH_PRICE]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
  [ActionType.UPDATE_PARTICIPANT_PRICE]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
  [ActionType.UPDATE_TAX_DISCOUNT]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
  [ActionType.UPDATE_PALETTE_FOODNAME]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
  [ActionType.SPLIT_EVENLY]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
  [ActionType.RESET_PALETTE_DEFAULT_PRICE]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
  [ActionType.CLEAR_PALETTE_PARTICIPANTS]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
  [ActionType.SCAN_RECEIPT_ACTION]: function (
    state: IApplicationState,
    payload: any
  ): IApplicationState {
    throw new Error('Function not implemented.');
  },
};

export function actionReducer(state: IApplicationState, action: Action) {
  const { type, payload } = action;
  const reducerFunction = reducerFunctions[type];
  if (reducerFunction) {
    return reducerFunction(state, payload);
  }
  return state;
}

// Reducer Functions

function addProfile(
  state: IApplicationState,
  payload: { name: string; hue: number }
): IApplicationState {
  const { name, hue } = payload;
  const profile = new Profile(name, hue);
  return { ...state, profiles: [...state.profiles, profile] };
}

function removeProfile(
  state: IApplicationState,
  payload: { name: string }
): IApplicationState {
  const { name } = payload;
  return {
    ...state,
    profiles: state.profiles.filter((x) => x.name !== name),
  };
}

function addPalette(
  state: IApplicationState,
  payload: { id: string }
): IApplicationState {
  const { id } = payload;
  if (id) {
    const foodItem = new FoodItem('-', 0, [], id);
    return {
      ...state,
      palettes: [...state.palettes, foodItem],
    };
  }
  return state;
}

function removePalette(
  state: IApplicationState,
  payload: { id: string }
): IApplicationState {
  const { id } = payload;
  if (id) {
    return {
      ...state,
      palettes: state.palettes.filter((x) => x.id !== id),
    };
  }
  return state;
}

//////////////////////////////////

function getPalette(id: string, palettes: FoodItem[]): FoodItem | undefined {
  return palettes.find((palette) => palette.id === id);
}
