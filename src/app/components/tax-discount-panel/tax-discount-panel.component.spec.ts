import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDiscountPanelComponent } from './tax-discount-panel.component';

describe('TaxDiscountPanelComponent', () => {
  let component: TaxDiscountPanelComponent;
  let fixture: ComponentFixture<TaxDiscountPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxDiscountPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxDiscountPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
