import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FoodItem } from './classes/food-item';
import { CreateProfileModalComponent } from './components/create-profile-modal/create-profile-modal.component';
import { FoodPaletteService } from './services/food-palette.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('itemWrapper') myScrollContainer!: ElementRef;
  @ViewChild('ProfileModal') profileModal: CreateProfileModalComponent;
  title = 'split-me';

  profiles: string[] = ['sachin', 'yogesh', 'neena'];

  constructor(
    private fb: FormBuilder,
    private foodPalette: FoodPaletteService
  ) {
    this.profileModal = new CreateProfileModalComponent(fb);
  }

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

  onAddProfile() {
    this.profileModal.showModal();
  }

  removeFoodTile(item: FoodItem) {
    this.foodPalette.remove(item);
  }

  removeProfile(profile: string) {
    console.log(profile);

    this.profiles = this.profiles.filter((x) => x !== profile);
  }

  addNewProfile(profile: string) {
    this.profiles.push(profile);
  }

  get palettes(){
    return this.foodPalette.palettes;
  }
}
