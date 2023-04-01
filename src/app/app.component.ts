import { Component, ElementRef, ViewChild } from '@angular/core';
import { FoodItem } from './classes/food-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  genRand = (len:number) => {
    return Math.random().toString(36).substring(2,len+2);
  }

  @ViewChild('itemWrapper') myScrollContainer!: ElementRef;
  title = 'split-me';
  palettes: FoodItem[] = [new FoodItem(this.genRand(5),0,[])];

  constructor() {
    //this.myScrollContainer = null;
  }
 

  onAddFoodPalette() {
    console.log(this.palettes);
    

    this.palettes.push(new FoodItem(this.genRand(5),0,[]));
    // create a smoother transition for this or discard scroll effect
    setTimeout(
      () =>
        (this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer?.nativeElement.scrollHeight),
      50
    );
  }

  removeFoodTile(item:FoodItem){
    this.palettes = this.palettes.filter((x)=>x!==item)
    console.log(item);
    
  }
}
