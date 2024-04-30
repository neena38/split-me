import { LocalAction, LocalActionType } from '../classes/constants';
import { Profile } from '../classes/profile';
import { IApplicationState } from './store';

type ReducerFunction = (
  state: IApplicationState,
  payload: any
) => IApplicationState;

const reducerFunctions: { [key in LocalActionType]: ReducerFunction } = {
  [LocalActionType.SET_PROFILES]: setProfilesList,
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
