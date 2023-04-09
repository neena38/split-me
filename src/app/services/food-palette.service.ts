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
    new FoodItem('cb half', 89, [
      new Participant('jobel', 89),
      new Participant('arathy', 89 / 2),
      new Participant('manju', 89 / 2),
      new Participant('athul', 89),
      new Participant('yogesh', 89),
      new Participant('arshith', 89),
    ]),
    new FoodItem('veg biriyani', 103, [
      new Participant('thomas', 103),
      new Participant('john', 103),
    ]),
    new FoodItem('cb full', 153, [new Participant('jithin', 153)]),
    new FoodItem('beef roast', 139, [
      new Participant('joel', 69.5),
      new Participant('sidharth', 69.5),
    ]),
    new FoodItem('chapathi', 12, [new Participant('sidharth', 12 * 3)]),
    new FoodItem('porotta', 12, [new Participant('joel', 12 * 2)]),
  ];
  paletteIDs: string[] = [];

  constructor() {
    this.updatePanelIds();
  }

  add() {
    let item: FoodItem = new FoodItem('', 0, []);
    console.log(item.ID);
    item.name='item '+item.foodID;
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

  getIndividualContributions(): Map<string, number> {
    let contMap = new Map<string, number>();
    this.palettes.forEach((dish) => {
      dish.participants.forEach((participant: Participant) => {
        if (contMap.has(participant.name)) {
          contMap.set(
            participant.name,
            contMap.get(participant.name)! + participant.contribution
          );
        } else {
          contMap.set(participant.name, participant.contribution);
        }
      });
    });
    return contMap;
  }
}
