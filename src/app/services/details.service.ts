import { Injectable } from '@angular/core';
import { FoodPaletteService } from './food-palette.service';
import { DoughnutEntries, IContributors } from '../classes/interfaces';
import { IndividualSummary } from '../classes/individual-summary';
import { AppStoreService } from '../store/app-store.service';
import { Observable } from 'rxjs';
import {
  finalAmountSelector,
  modifiersSelector,
  totalAmountSelector,
} from '../store/selectors';
import { ActionType } from '../classes/constants';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  totalFoodAmount: number = 0;
  finalTotal: number = 0;
  participantsCount: number = 0;
  dishesCount: number = 0;
  contributorsMap: Map<string, number>;
  totalAmountMap: Map<string, number>;
  individualSummaries: IndividualSummary[] = [];
  modifiers$: Observable<{ tax: number; discount: number }>;
  totalAmount$: Observable<number>;
  finalAmount$: Observable<number>;
  constructor(
    private foodPalette: FoodPaletteService,
    private store: AppStoreService
  ) {
    this.modifiers$ = this.store.selector(modifiersSelector);
    this.totalAmount$ = this.store.selector(totalAmountSelector);
    this.finalAmount$ = this.store.selector(finalAmountSelector);
    this.contributorsMap = new Map<string, number>();
    this.totalAmountMap = new Map<string, number>();
  }

  calculateFinalTotal() {
    const modifiers = this.getCurrentModifiers();
    this.totalFoodAmount = this.foodPalette.getTotalAmount();
    this.contributorsMap = this.foodPalette.getIndividualContributions();
    this.participantsCount = this.contributorsMap.size;
    this.dishesCount = this.foodPalette.getCurrentPalettes().length;
    this.totalAmountMap = new Map<string, number>();
    let finalAmt: number = 0;
    for (let [name, money] of this.contributorsMap) {
      let taxAmt = (money / this.totalFoodAmount) * modifiers.tax;
      let discAmt = (money / this.totalFoodAmount) * modifiers.discount;

      let newAmount = Math.round((money + taxAmt - discAmt) * 100) / 100;
      finalAmt += money + taxAmt - discAmt;
      this.totalAmountMap.set(name, newAmount);
    }

    this.finalTotal = Math.round(finalAmt * 100) / 100;
  }

  updateModifiers(tax: number, discount: number) {
    this.store.dispatch(ActionType.UPDATE_TAX_DISCOUNT, {
      tax: tax,
      discount: discount,
    });
  }

  generateDataSourceMap(): IContributors[] {
    let ContributorsMap: IContributors[] = [];
    if (this.contributorsMap && this.totalAmountMap) {
      for (let [name, money] of this.contributorsMap) {
        let entry: IContributors = {
          name: name,
          food_amount: money,
          split_amount: this.totalAmountMap.get(name)!,
        };
        ContributorsMap.push(entry);
      }
    }

    return ContributorsMap;
  }

  getNameAmountDistribution(): DoughnutEntries[] {
    let dataMap: DoughnutEntries[] = [];

    if (this.contributorsMap && this.totalAmountMap) {
      for (let name of this.contributorsMap.keys()) {
        let entry: DoughnutEntries = {
          item: name,
          value: this.totalAmountMap.get(name)!,
        };
        dataMap.push(entry);
      }
    }
    return dataMap;
  }

  getDishAmountDistribution(): DoughnutEntries[] {
    let dataMap: DoughnutEntries[] = [];
    for (let palette of this.foodPalette.getCurrentPalettes()) {
      let entry: DoughnutEntries = {
        item: palette.logo + ' ' + palette.name,
        value: palette.totalContributions,
      };
      dataMap.push(entry);
    }
    return dataMap;
  }

  generateIndividualSummary() {
    let indivualOrders = this.foodPalette.getIndividualOrders();
    this.individualSummaries = [];
    for (let [name, orders] of indivualOrders.entries()) {
      let summary = new IndividualSummary(
        name,
        orders,
        this.contributorsMap.get(name)!,
        this.totalAmountMap.get(name)!
      );
      this.individualSummaries.push(summary);
    }
  }

  getCurrentModifiers() {
    return this.store.getValue().modifiers;
  }
}
