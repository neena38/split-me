import { Component, ElementRef, ViewChild } from '@angular/core';
import { FoodItem } from './classes/food-item';
import { FoodPaletteService } from './services/food-palette.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('itemWrapper') myScrollContainer!: ElementRef;

  title = 'split-me';

  constructor(private foodPalette: FoodPaletteService) {}

  onAddFoodPalette() {
    this.foodPalette.add();

    // create a smoother transition for this or discard scroll effect
    setTimeout(
      () =>
        (this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer?.nativeElement.scrollHeight),
      50
    );
  }

  removeFoodTile(item: FoodItem) {
    this.foodPalette.remove(item);
  }

  get palettes() {
    return this.foodPalette.palettes;
  }
}
