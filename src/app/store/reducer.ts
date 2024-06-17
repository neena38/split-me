import { getMessage } from '../classes/actionMessage';
import { Action, ActionType } from '../classes/constants';
import { FoodItem } from '../classes/food-item';
import { IBillEntry } from '../classes/interfaces';
import { Participant } from '../classes/participant';
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
  [ActionType.IMPORT_PROFILE_SET]: importProfileSet,
  [ActionType.ADD_PALETTE]: addPalette,
  [ActionType.REMOVE_PALETTE]: removePalette,
  [ActionType.ADD_PARTICIPANT]: addParticipants,
  [ActionType.REMOVE_PARTICIPANT]: removeParticipant,
  [ActionType.UPDATE_DISH_PRICE]: updateDishPrice,
  [ActionType.UPDATE_PARTICIPANT_PRICE]: updateParticipantPrice,
  [ActionType.UPDATE_TAX_DISCOUNT]: updateTaxDiscount,
  [ActionType.UPDATE_PALETTE_FOODNAME]: updatePaletteName,
  [ActionType.SPLIT_EVENLY]: paletteSplitEvenly,
  [ActionType.RESET_PALETTE_DEFAULT_PRICE]: paletteResetDefaultPrice,
  [ActionType.CLEAR_PALETTE_PARTICIPANTS]: paletteClearParticipants,
  [ActionType.SCAN_RECEIPT_ACTION]: scanReceipt,
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
function importProfileSet(
  state: IApplicationState,
  payload: { profiles: Profile[] }
): IApplicationState {
  const { profiles } = payload;
  return {
    ...state,
    profiles: profiles,
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

function addParticipants(
  state: IApplicationState,
  payload: { profiles: Profile[]; id: string }
): IApplicationState {
  const palette = getPalette(payload.id, state.palettes);
  if (palette && payload.profiles) {
    const existingParticipantNames = new Set(
      palette.participants.map((participant) => participant.profile.name)
    );
    const newParticipants = payload.profiles
      .filter((profile) => !existingParticipantNames.has(profile.name))
      .map((profile) => {
        const participant = new Participant(profile, palette.price);
        participant.profile.hue = profile.hue;
        return participant;
      });
    palette.participants.push(...newParticipants);
    const updatedPalettes = state.palettes.map((p) =>
      p.id === payload.id ? palette : p
    );
    return {
      ...state,
      palettes: updatedPalettes,
    };
  }
  return state;
}

function removeParticipant(
  state: IApplicationState,
  payload: { name: string; id: string }
): IApplicationState {
  const palette = getPalette(payload.id, state.palettes);
  if (palette) {
    palette.participants = palette.participants.filter(
      (x) => x.name !== payload.name
    );
    const updatedPalettes = state.palettes.map((p) =>
      p.id === payload.id ? palette : p
    );
    return {
      ...state,
      palettes: updatedPalettes,
    };
  }
  return state;
}

function updateDishPrice(
  state: IApplicationState,
  payload: { price: number; id: string }
): IApplicationState {
  const palette = getPalette(payload.id, state.palettes);
  if (palette) {
    palette.price = payload.price;
    palette.updatePrices();
    const updatedPalettes = state.palettes.map((p) =>
      p.id === payload.id ? palette : p
    );
    return {
      ...state,
      palettes: updatedPalettes,
    };
  }
  return state;
}

function updateParticipantPrice(
  state: IApplicationState,
  payload: { id: string; name: string; contribution: number }
): IApplicationState {
  const palette = getPalette(payload.id, state.palettes);
  if (palette) {
    const participant = palette.participants.find(
      (p) => p.name === payload.name
    );
    if (participant) {
      participant.contribution = payload.contribution;
      const updatedPalettes = state.palettes.map((p) =>
        p.id === payload.id ? palette : p
      );
      return {
        ...state,
        palettes: updatedPalettes,
      };
    }
  }
  return state;
}

function updateTaxDiscount(
  state: IApplicationState,
  payload: { tax: number; discount: number }
): IApplicationState {
  return {
    ...state,
    modifiers: {
      tax: payload.tax,
      discount: payload.discount,
    },
  };
}

function updatePaletteName(
  state: IApplicationState,
  payload: { id: string; name: string }
): IApplicationState {
  const palette = getPalette(payload.id, state.palettes);
  if (palette && payload.name) {
    palette.name = payload.name;
    const updatedPalettes = state.palettes.map((p) =>
      p.id === payload.id ? palette : p
    );
    return {
      ...state,
      palettes: updatedPalettes,
    };
  }
  return state;
}

function paletteSplitEvenly(
  state: IApplicationState,
  payload: { id: string }
): IApplicationState {
  const palette = getPalette(payload.id, state.palettes);
  if (palette) {
    palette.splitEvenly();
    const updatedPalettes = state.palettes.map((p) =>
      p.id === payload.id ? palette : p
    );
    return {
      ...state,
      palettes: updatedPalettes,
    };
  }
  return state;
}

function paletteResetDefaultPrice(
  state: IApplicationState,
  payload: { id: string }
): IApplicationState {
  const palette = getPalette(payload.id, state.palettes);
  if (palette) {
    palette.resetDefaultPrice();
    const updatedPalettes = state.palettes.map((p) =>
      p.id === payload.id ? palette : p
    );
    return {
      ...state,
      palettes: updatedPalettes,
    };
  }
  return state;
}

function paletteClearParticipants(
  state: IApplicationState,
  payload: { id: string }
): IApplicationState {
  const palette = getPalette(payload.id, state.palettes);
  if (palette) {
    palette.removeAllParticipants();
    const updatedPalettes = state.palettes.map((p) =>
      p.id === payload.id ? palette : p
    );
    return {
      ...state,
      palettes: updatedPalettes,
    };
  }
  return state;
}

function scanReceipt(
  state: IApplicationState,
  payload: { result: IBillEntry[]; ids: string[] }
): IApplicationState {
  const palettes: FoodItem[] = [];
  const items = payload.result;
  const ids = payload.ids;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const palette = new FoodItem(item.item, item.amount, [], ids[i]);
    palettes.push(palette);
  }
  return {
    ...state,
    palettes: palettes,
  };
}

//////////////////////////////////

function getPalette(id: string, palettes: FoodItem[]): FoodItem | undefined {
  return palettes.find((palette) => palette.id === id);
}

export function generateMessage(action: Action, palettes: FoodItem[]) {
  return getMessage(action, getPalette(action.payload.id, palettes));
}
