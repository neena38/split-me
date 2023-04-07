import { Injectable } from '@angular/core';
import { FoodItem } from '../classes/food-item';
import { Participant } from '../classes/participant';

@Injectable({
  providedIn: 'root',
})
export class FoodPaletteService {
  genRand = (len: number) => {
    return Math.random()
      .toString(36)
      .substring(2, len + 2);
  };
  palettes: FoodItem[] = [
    new FoodItem(this.genRand(5), 350, [new Participant('dinesh', 350)]),
  ];
  paletteIDs: string[] = [];

  constructor() {
    this.updatePanelIds();
  }

  add() {
    let item: FoodItem = new FoodItem(this.genRand(5), 0, []);
    console.log(item.ID);
    this.palettes.push(item);
    this.updatePanelIds();
  }

  remove(item: FoodItem) {
    this.palettes = this.palettes.filter((x) => x !== item);
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
}
