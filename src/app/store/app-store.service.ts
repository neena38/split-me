import { Injectable } from '@angular/core';
import { Store, createStore, withProps } from '@ngneat/elf';
import { OperatorFunction } from 'rxjs';
import {
  Action,
  ActionType,
  LocalAction,
  LocalActionType,
} from '../classes/constants';
import { actionReducer } from './reducer';
import { IApplicationState, initialState } from './store';
import { localActionReducer } from './local-reducer';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private store: Store;
  constructor() {
    this.store = createStore(
      {
        name: 'AppStore',
      },
      withProps<IApplicationState>(initialState)
    );
  }

  dispatch(type: ActionType, payload: any) {
    this.update({ type: type, payload: payload });
  }

  localDispatch(type: LocalActionType, payload: any) {
    this.localUpdate({ type: type, payload: payload });
  }

  selector<T>(item: OperatorFunction<IApplicationState, T>) {
    return this.store.pipe(item);
  }

  private update(action: Action) {
    this.store.update((state) => actionReducer(state, action));
  }

  private localUpdate(action: LocalAction) {
    this.store.update((state) => localActionReducer(state, action));
  }

  getValue(): IApplicationState {
    return this.store.getValue();
  }
}
