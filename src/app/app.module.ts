import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from "@angular/material/menu";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvancedProfileComponent } from './components/advanced-profile/advanced-profile.component';
import { CreateProfileModalComponent } from './components/create-profile-modal/create-profile-modal.component';
import { DetailsPanelComponent } from './components/details-panel/details-panel.component';
import { FoodItemPanelComponent } from './components/food-item-panel/food-item-panel.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { NameProfileComponent } from './components/name-profile/name-profile.component';
import { TaxDiscountPanelComponent } from './components/tax-discount-panel/tax-discount-panel.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    FoodItemPanelComponent,
    NameProfileComponent,
    CreateProfileModalComponent,
    AdvancedProfileComponent,
    TaxDiscountPanelComponent,
    DetailsPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    DragDropModule,
    MatMenuModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
