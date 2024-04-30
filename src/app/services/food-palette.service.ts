import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionType } from '../classes/constants';
import { FoodItem } from '../classes/food-item';
import { IorderDetails } from '../classes/interfaces';
import { getID } from '../classes/uuid';
import { AppStoreService } from '../store/app-store.service';
import { palettesIdSelector, palettesSelector } from '../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class FoodPaletteService {
  palettes$: Observable<FoodItem[]>;
  paletteIds$: Observable<string[]>;

  constructor(private store: AppStoreService) {
    this.palettes$ = this.store.selector(palettesSelector);
    this.paletteIds$ = this.store.selector(palettesIdSelector);
  }

  add() {
    this.store.dispatch(ActionType.ADD_PALETTE, { id: getID() });
  }

  remove(item: FoodItem) {
    this.store.dispatch(ActionType.REMOVE_PALETTE, { id: item.id });
  }

  getTotalAmount() {
    const palettes = this.getCurrentPalettes();
    let total: number = 0;
    palettes.forEach((item) => {
      total += item.totalContributions;
    });
    return Math.round(total * 100) / 100;
  }

  /**
   *
   * @returns the sum of contribution from every dish of an individual
   */
  getIndividualContributions(): Map<string, number> {
    const contMap = new Map<string, number>();

    const palettes = this.getCurrentPalettes();
    for (let i = 0; i < palettes.length; i++) {
      const participants = palettes[i].participants;
      for (let j = 0; j < participants.length; j++) {
        const participant = participants[j];
        const name = participant.name;
        contMap.set(name, (contMap.get(name) || 0) + participant.contribution);
      }
    }
    return contMap;
  }

  /**
   * @returns list of orders from every food pallete the individual is a participant of
   */
  getIndividualOrders(): Map<string, IorderDetails[]> {
    const indDetailsMap = new Map<string, IorderDetails[]>();
    const palettes = this.getCurrentPalettes();

    for (let i = 0; i < palettes.length; i++) {
      const dish = palettes[i];
      const participants = dish.participants;

      for (let j = 0; j < participants.length; j++) {
        const participant = participants[j];
        const name = participant.name;

        const detail: IorderDetails = {
          food_name: dish.logo + ' ' + dish.name,
          contribution: participant.contribution,
          quantity: participant.contribution / dish.price,
        };
        const orders = indDetailsMap.get(name) || [];
        orders.push(detail);
        indDetailsMap.set(name, orders);
      }
    }
    return indDetailsMap;
  }

  getCurrentPalettes() {
    return this.store.getValue().palettes;
  }
}
