import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodItem } from 'src/app/classes/food-item';
import { Participant } from 'src/app/classes/participant';

@Component({
  selector: 'app-food-item-panel',
  templateUrl: './food-item-panel.component.html',
  styleUrls: ['./food-item-panel.component.scss'],
})
export class FoodItemPanelComponent {
  @Input() foodData: FoodItem;
  @Output() removePanel = new EventEmitter<FoodItem>();
  totalRate: number = 0;

  constructor() {
    this.foodData = new FoodItem('undefined', 0, []);
  }

  changes(type: string) {
    console.log('changed');
    console.log(this.foodData);
    if (type === 'price') {
      this.foodData.updatePrices();
    }
  }
  removePalette() {
    this.removePanel.emit(this.foodData);
  }
  removeParticipant(p: Participant) {
    this.foodData.participants = this.foodData.participants.filter(
      (x) => x !== p
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    let participant = new Participant(event.item.data, this.foodData.price);
    this.foodData.addParticipant(participant);
  }

  get participants() {
    return this.foodData.participants;
  }
}
