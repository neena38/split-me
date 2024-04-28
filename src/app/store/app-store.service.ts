import { Injectable } from '@angular/core';
import { Store, createStore, select, withProps } from '@ngneat/elf';
import { IApplicationState, initialState } from './store';
import { Action } from '../classes/constants';
import { actionReducer } from './reducer';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {

  store: Store;
  constructor() {
    this.store = createStore({
      name: 'AppStore'
    }, withProps<IApplicationState>(initialState)
    );

    this.store.subscribe((data) => {
      console.log(data);

    })
  }


  update(action: Action) {
    this.store.update((state) => actionReducer(state, action));
  }
}
