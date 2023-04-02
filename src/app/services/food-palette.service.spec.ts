import { TestBed } from '@angular/core/testing';

import { FoodPaletteService } from './food-palette.service';

describe('FoodPaletteService', () => {
  let service: FoodPaletteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodPaletteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
