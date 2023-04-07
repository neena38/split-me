import { Injectable } from '@angular/core';
import { FoodPaletteService } from './food-palette.service';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  tax: number = 0;
  discount: number = 0;
  totalFoodAmount: number = 0;
  finalTotal: number = 0;
  constructor(private foodPalette: FoodPaletteService) {}

  calculateFinalTotal() {
    console.log('tax ' + this.tax);
    console.log('discount ' + this.discount);
    let totalFoodAmount = this.foodPalette.getTotalAmount();
    let ContributorsMap = this.foodPalette.getIndividualContributions();
    console.log(ContributorsMap); // without discount-tax
    let totalAmountMap = new Map<string, number>();
    let finalAmt:number=0;
    for (let [name, money] of ContributorsMap) {
      let taxAmt = (money / totalFoodAmount) * this.tax;
      let discAmt = (money / totalFoodAmount) * this.discount;

      let newAmount = Math.round((money + taxAmt - discAmt) * 100) / 100;
      finalAmt+=newAmount;
      totalAmountMap.set(name, newAmount);
    }
    console.log(totalAmountMap);
    this.finalTotal = finalAmt;
  }
}
