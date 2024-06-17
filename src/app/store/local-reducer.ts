import { LocalAction, LocalActionType } from '../classes/constants';
import { FoodItem } from '../classes/food-item';
import { mockFoodPalettes } from '../classes/mock-data';
import { Participant } from '../classes/participant';
import { Profile } from '../classes/profile';
import { IApplicationState } from './store';

type ReducerFunction = (
  state: IApplicationState,
  payload: any
) => IApplicationState;

const reducerFunctions: { [key in LocalActionType]: ReducerFunction } = {
  [LocalActionType.SET_PROFILES]: setProfilesList,
  [LocalActionType.SET_STATE]: setAppState,
  [LocalActionType.SET_DUMMY_DATA]: setDummyData,
};

function setProfilesList(
  state: IApplicationState,
  payload: { profiles: Profile[] }
) {
  return {
    ...state,
    profiles: payload.profiles,
  };
}

function setAppState(
  state: IApplicationState,
  payload: { state: IApplicationState }
) {
  const newState = payload.state;
  //palettes creation
  const newPalettes = newState.palettes.map(
    (palette) =>
      new FoodItem(
        palette.name,
        palette.price,
        getParticipants(palette.participants),
        palette.id
      )
  );

  return {
    ...state,
    profiles: newState.profiles,
    palettes: newPalettes,
    modifiers: newState.modifiers,
  };
}

function setDummyData(state: IApplicationState, payload: {}) {
  return {
    ...state,
    palettes: mockFoodPalettes,
  };
}

export function localActionReducer(
  state: IApplicationState,
  action: LocalAction
) {
  const { type, payload } = action;
  const reducerFunction = reducerFunctions[type];
  if (reducerFunction) {
    return reducerFunction(state, payload);
  }
  return state;
}

// Utility Fns()

function getParticipants(parties: Participant[]) {
  return parties.map(
    (p) =>
      new Participant(
        new Profile(p.profile.name, p.profile.hue),
        p.contribution
      )
  );
}
