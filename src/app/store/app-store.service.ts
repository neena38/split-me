import { Injectable } from '@angular/core';
import { Store, createStore, withProps } from '@ngneat/elf';
import { OperatorFunction } from 'rxjs';
import { Action, ActionType } from '../classes/constants';
import { actionReducer } from './reducer';
import { IApplicationState, initialState } from './store';

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

    this.store.subscribe((data) => {
      console.log(data);
    });
  }

  dispatch(type: ActionType, payload: any) {
    this.update({ type: type, payload: payload });
  }

  selector<T>(item: OperatorFunction<IApplicationState, T>) {
    return this.store.pipe(item);
  }

  private update(action: Action) {
    this.store.update((state) => actionReducer(state, action));
  }

  getValue() : IApplicationState {
   return this.store.getValue();
  }
}
