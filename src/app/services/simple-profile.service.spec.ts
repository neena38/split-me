import { TestBed } from '@angular/core/testing';

import { SimpleProfileService } from './simple-profile.service';

describe('SimpleProfileService', () => {
  let service: SimpleProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
