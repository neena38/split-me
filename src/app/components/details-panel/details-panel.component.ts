import { Component } from '@angular/core';
import { FoodPaletteService } from 'src/app/services/food-palette.service';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss']
})
export class DetailsPanelComponent {

  constructor(private foodPalette:FoodPaletteService){

  }
  get totalFoodBill() {
    return this.foodPalette.getTotalAmount();
  }
}
