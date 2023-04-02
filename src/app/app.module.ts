import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { FoodItemPanelComponent } from './components/food-item-panel/food-item-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NameProfileComponent } from './components/name-profile/name-profile.component';
import { CreateProfileModalComponent } from './components/create-profile-modal/create-profile-modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdvancedProfileComponent } from './components/advanced-profile/advanced-profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from "@angular/material/menu";
@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    FoodItemPanelComponent,
    NameProfileComponent,
    CreateProfileModalComponent,
    AdvancedProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    DragDropModule,
    MatMenuModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
