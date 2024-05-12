import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionType } from '../classes/constants';
import { FoodItem } from '../classes/food-item';
import { IBillEntry, IorderDetails } from '../classes/interfaces';
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

  scannedReceipt(result: IBillEntry[]) {
    const ids = Array.from({ length: result.length }, () => getID());
    this.store.dispatch(ActionType.SCAN_RECEIPT_ACTION, {
      result: result,
      ids: ids,
    });
  }

  remove(item: FoodItem) {
    this.store.dispatch(ActionType.REMOVE_PALETTE, { id: item.id });
  }

  getTotalAmount() {
    const palettes = this.getCurrentPalettes();
    return palettes.reduce((total, item) => total + item.totalContributions, 0);
  }

  /**
   *
   * @returns the sum of contribution from every dish of an individual
   */
  getIndividualContributions(): Map<string, number> {
    const contMap = new Map<string, number>();
    const palettes = this.getCurrentPalettes();
    for (const palette of palettes) {
      for (const participant of palette.participants) {
        const { name, contribution } = participant;
        contMap.set(name, (contMap.get(name) || 0) + contribution);
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

    for (const palette of palettes) {
      const { logo, name, price, participants } = palette;
      for (const participant of participants) {
        const { name: participantName, contribution } = participant;
        const detail: IorderDetails = {
          food_name: `${logo} ${name}`,
          contribution: contribution,
          quantity: contribution / price,
        };
        const orders = indDetailsMap.get(participantName) || [];
        orders.push(detail);
        indDetailsMap.set(participantName, orders);
      }
    }
    return indDetailsMap;
  }

  getCurrentPalettes() {
    return this.store.getValue().palettes;
  }
}
