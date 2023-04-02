import { Injectable } from '@angular/core';
import { FoodItem } from '../classes/food-item';

@Injectable({
  providedIn: 'root',
})
export class FoodPaletteService {
  genRand = (len: number) => {
    return Math.random()
      .toString(36)
      .substring(2, len + 2);
  };
  palettes: FoodItem[] = [new FoodItem(this.genRand(5), 0, [])];

  constructor() {}

  add() {
    let item: FoodItem = new FoodItem(this.genRand(5), 0, []);
    console.log(item.ID);
    this.palettes.push(item);
  }

  remove(item: FoodItem){
    this.palettes = this.palettes.filter((x) => x !== item);
  }
}
