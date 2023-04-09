import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPalettesBoxComponent } from './food-palettes-box.component';

describe('FoodPalettesBoxComponent', () => {
  let component: FoodPalettesBoxComponent;
  let fixture: ComponentFixture<FoodPalettesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodPalettesBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodPalettesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
