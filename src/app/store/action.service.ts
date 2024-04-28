import { Injectable } from '@angular/core';
import { AppStoreService } from './app-store.service';
import { Action, ActionType } from '../classes/constants';
import { select } from '@ngneat/elf';
import { IApplicationState } from './store';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  public profiles$ = this.store.store.pipe(select((state) => state.profiles))
  constructor(private store: AppStoreService) { }

  dispatch(type: ActionType, payload: any) {
    this.store.update({ type: type, payload: payload })
  }

  getProfiles() {
    const state: IApplicationState = this.store.store.getValue();
    const profiles =state.profiles;
    console.log(profiles);
    
    return state.profiles;
  }
}
