import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FoodItem } from './classes/food-item';
import { CreateProfileModalComponent } from './components/create-profile-modal/create-profile-modal.component';

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
  @ViewChild('ProfileModal') profileModal: CreateProfileModalComponent;
  title = 'split-me';
  palettes: FoodItem[] = [new FoodItem(this.genRand(5),0,[])];
  profiles: string[] = ['sachin','yogesh','neena',];

  constructor(private fb: FormBuilder) {
    this.profileModal = new CreateProfileModalComponent(fb);
  }
 

  onAddFoodPalette() {
    this.palettes.push(new FoodItem(this.genRand(5),0,[]));
    // create a smoother transition for this or discard scroll effect
    setTimeout(
      () =>
        (this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer?.nativeElement.scrollHeight),
      50
    );
  }

  onAddProfile(){
    this.profileModal.showModal();
  }

  removeFoodTile(item:FoodItem){
    this.palettes = this.palettes.filter((x)=>x!==item)
  }

  removeProfile(profile:string){
    console.log(profile);
    
    this.profiles = this.profiles.filter((x)=>x!==profile) 
  }

  addNewProfile(profile:string){
    this.profiles.push(profile)

  }
}
