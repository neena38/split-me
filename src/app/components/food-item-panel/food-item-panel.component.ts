import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodItem } from 'src/app/classes/food-item';

@Component({
  selector: 'app-food-item-panel',
  templateUrl: './food-item-panel.component.html',
  styleUrls: ['./food-item-panel.component.scss'],
})
export class FoodItemPanelComponent {
  @Input() foodData: FoodItem;
  @Output() removePanel  = new EventEmitter<FoodItem>();

  constructor() {
    this.foodData = new FoodItem('', 0, []);
  }

  changes(){
    console.log("changed");
    console.log(this.foodData);    
  }
  removePalette() {
    this.removePanel.emit(this.foodData);
    
  }
}
