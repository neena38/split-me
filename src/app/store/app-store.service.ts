import { Injectable } from '@angular/core';
import { Store, createStore, withProps } from '@ngneat/elf';
import { OperatorFunction, Subject } from 'rxjs';
import {
  Action,
  ActionType,
  LocalAction,
  LocalActionType,
} from '../classes/constants';
import { formatActions } from './action.formatter';
import { localActionReducer } from './local-reducer';
import { actionReducer, generateMessage } from './reducer';
import { IApplicationState, initialState } from './store';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private store: Store;
  private actionSubject: Subject<Action> = new Subject<Action>();
  firedAction$ = this.actionSubject.asObservable();
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

  localDispatch(type: LocalActionType, payload: any) {
    this.localUpdate({ type: type, payload: payload });
  }

  selector<T>(item: OperatorFunction<IApplicationState, T>) {
    return this.store.pipe(item);
  }

  private update(action: Action) {
    this.store.update((state) => actionReducer(state, action));
    this.actionSubject.next(action);
  }

  cloudDispatch(action: Action, username: string) {
    formatActions(action);
    this.store.update((state) => actionReducer(state, action));
    const message = generateMessage(action, this.store.getValue().palettes);
    console.log(message);
  }

  private localUpdate(action: LocalAction) {
    this.store.update((state) => localActionReducer(state, action));
  }

  clearState() {
    //TODO Implement this with Elf way
    this.store.reset();
  }

  setState(data: IApplicationState) {
    //TODO Implement this with Elf Way
    this.store.update((state) => data);
  }

  getValue(): IApplicationState {
    return this.store.getValue();
  }
}
