import { Injectable } from '@angular/core';
import { FoodItem } from '../classes/food-item';
import { IorderDetails } from '../classes/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FoodPaletteService {
  genRand = (len: number) => {
    return Math.random()
      .toString(36)
      .substring(2, len + 2);
  };
  palettes: FoodItem[] = [];
  paletteIDs: string[] = [];

  constructor() {
    this.updatePanelIds();
  }

  add(palette: FoodItem = new FoodItem('', 0, [])): string {
    if (!palette.name) {
      palette.name = 'item ' + palette.foodID;
    }
    this.palettes.push(palette);
    this.updatePanelIds();
    return palette.id;
  }

  remove(item: FoodItem) {
    this.palettes = this.palettes.filter((x) => x.id !== item.id);
    this.updatePanelIds();
  }

  updatePanelIds() {
    this.paletteIDs = this.palettes.map((x) => x.ID);
  }

  getTotalAmount() {
    let total: number = 0;
    this.palettes.forEach((item) => {
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

    for (let i = 0; i < this.palettes.length; i++) {
      const participants = this.palettes[i].participants;

      for (let j = 0; j < participants.length; j++) {
        const participant = participants[j];
        const name = participant.name;
        const contribution = participant.contribution;

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

    for (let i = 0; i < this.palettes.length; i++) {
      const dish = this.palettes[i];
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
}
