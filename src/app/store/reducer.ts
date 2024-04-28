import { arrayAdd, arrayUpdate } from "@ngneat/elf/src/lib/props-array-factory";
import { Action, ActionType } from "../classes/constants";
import { IApplicationState } from "./store";

export function actionReducer(state: IApplicationState, action: Action) {
    const payload = action.payload;
    switch (action.type) {
        case ActionType.ADD_PROFILE:
            const profile = payload.profile;
            if (profile && profile.name) {
                return { ...state, profiles: [...state.profiles, profile] }
            }
            break;
        case ActionType.REMOVE_PROFILE:
            return {
                ...state, profiles:
                    state.profiles.filter((x) => x.name !== payload.name)
            }

    }
    return { state }

}
