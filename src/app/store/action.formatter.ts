import { Action, ActionType } from '../classes/constants';

export function formatActions(action: Action) {
  switch (action.type) {
    case ActionType.UPDATE_PALETTE_FOODNAME:
      const name = action.payload.name;
      action.payload.name = `{socket}${name}`;
      break;
  }
}
