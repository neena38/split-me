import { Injectable } from '@angular/core';
import { SimpleProfileService } from './simple-profile.service';
import { FoodPaletteService } from './food-palette.service';
import { DetailsService } from './details.service';
import { IAppState } from '../components/header/header.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { FoodItem } from '../classes/food-item';
import { Participant } from '../classes/participant';
import { Profile } from '../classes/profile';
import { Action, ActionType } from '../classes/constants';
import { getMessage } from '../classes/actionMessage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  state!: IAppState;
  private stateSubject: BehaviorSubject<Action>;
  public state$: Observable<Action>;
  constructor(
    private profile: SimpleProfileService,
    private palette: FoodPaletteService,
    private details: DetailsService,
    private toastr: ToastrService
  ) {
    this.state = {
      profiles: this.profile.profiles,
      palettes: this.palette.palettes,
      tax: this.details.tax,
      discount: this.details.discount,
    };
    this.stateSubject = new BehaviorSubject<Action>({
      type: ActionType.DEFAULT,
      payload: null,
    });
    this.state$ = this.stateSubject.asObservable();
  }

  notifyAppState(action: Action) {
    this.stateSubject.next(action);
  }

  clearState() {
    this.palette.palettes = [];
    this.palette.updatePanelIds();
    this.details.tax = 0;
    this.details.discount = 0;

    this.toastr.info('You have left the room', undefined, {
      titleClass: 'socket-title',
      toastClass: 'socket-toast',
    });
  }

  //STORE ACTIONS

  fireAction(type: ActionType, payload: any) {
    this.notifyAppState({ type: type, payload: payload });
  }

  handleAction(action: Action, username: string) {
    const payload = action.payload;
    const palette = this.getPalette(payload.id);

    switch (action.type) {
      case ActionType.ADD_PARTICIPANT:
        if (palette) {
          const participants = this.getParticipantsFromProfiles(
            palette,
            payload.profiles
          );
          palette.participants.push(...participants);
        }
        break;

      case ActionType.REMOVE_PARTICIPANT:
        if (palette)
          palette.participants = palette.participants.filter(
            (x) => x.name !== payload.name
          );
        break;

      case ActionType.ADD_PALETTE:
        if (payload.id) {
          const foodItem = new FoodItem('-', 0, [], payload.id);
          this.palette.add(foodItem);
        }
        break;

      case ActionType.REMOVE_PALETTE:
        if (palette) this.palette.remove(palette);
        break;

      case ActionType.UPDATE_PALETTE_FOODNAME:
        if (palette && payload.name) palette.name = `{socket}${payload.name}`;
        break;

      case ActionType.UPDATE_DISH_PRICE:
        if (palette) {
          palette.price = payload.price;
          palette.updatePrices();
        }
        break;

      case ActionType.UPDATE_PARTICIPANT_PRICE:
        if (palette) {
          const participant = palette.participants.find(
            (p) => p.name === payload.name
          );
          if (participant) participant.contribution = payload.contribution;
        }
        break;

      case ActionType.RESET_PALETTE_DEFAULT_PRICE:
        if (palette) palette.resetDefaultPrice();
        break;

      case ActionType.SPLIT_EVENLY:
        if (palette) palette.splitEvenly();
        break;

      case ActionType.CLEAR_PALETTE_PARTICIPANTS:
        if (palette) palette.removeAllParticipants();
        break;

      case ActionType.ADD_PROFILE:
        const profile = payload.profile;
        if (profile && profile.name) {
          const newProfile = this.profile.add(profile.name);
          newProfile.hue = profile.hue;
        }
        break;

      case ActionType.REMOVE_PROFILE:
        this.profile.remove(payload.name);
        break;

      case ActionType.UPDATE_TAX_DISCOUNT:
        this.details.tax = payload.tax;
        this.details.discount = payload.discount;
        break;

      case ActionType.SCAN_RECEIPT_ACTION:
        this.palette.palettes = this.paletteCreation(payload.palettes);
        this.palette.updatePanelIds();
        break;
    }

    const toastMessage = getMessage(action, palette);
    this.toastr.info(toastMessage, username, {
      titleClass: 'socket-title',
      toastClass: 'socket-toast',
      timeOut: 3000,
    });
  }

  //initial load
  loadCloudState(newState: IAppState) {
    this.profile.profiles = newState.profiles;
    this.palette.palettes = this.paletteCreation(newState.palettes);
    this.palette.updatePanelIds();
    this.details.tax = newState.tax;
    this.details.discount = newState.discount;
  }
  paletteCreation(storeItem: FoodItem[]) {
    let palettes: FoodItem[] = [];
    storeItem.forEach((pal) => {
      const palette = new FoodItem(
        pal.name,
        pal.price,
        this.getParticipants(pal.participants),
        pal.id
      );
      palettes.push(palette);
    });
    return palettes;
  }

  getParticipants(parties: Participant[]) {
    let participants: Participant[] = [];
    parties.forEach((par) => {
      const participant = new Participant(
        new Profile(par.profile.name),
        par.contribution
      );
      participant.profile.hue = par.profile.hue;
      participants.push(participant);
    });
    return participants;
  }

  getPalette(id: string): FoodItem | undefined {
    return this.palette.palettes.find((palette) => palette.id === id);
  }

  getParticipantsFromProfiles(palette: FoodItem, profiles: Profile[]) {
    const existingParticipantNames = new Set(
      palette.participants.map((participant) => participant.profile.name)
    );
    const newParticipants = profiles
      .filter((profile) => !existingParticipantNames.has(profile.name))
      .map((profile) => {
        const participant = new Participant(profile, palette.price);
        participant.profile.hue = profile.hue;
        return participant;
      });
    return newParticipants;
  }
}
