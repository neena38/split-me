import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemPanelComponent } from './food-item-panel.component';

describe('FoodItemPanelComponent', () => {
  let component: FoodItemPanelComponent;
  let fixture: ComponentFixture<FoodItemPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodItemPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodItemPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
