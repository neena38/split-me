import { Component } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { FoodPaletteService } from 'src/app/services/food-palette.service';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss'],
})
export class DetailsPanelComponent {
  constructor(
    private foodPalette: FoodPaletteService,
    private details: DetailsService
  ) {}

  calcFinalTotal(){
    this.details.calculateFinalTotal();
  }


  get totalFoodBill() {
    return this.foodPalette.getTotalAmount();
  }

  get finalTotal(){
    return this.details.finalTotal;
  }

}
