import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameProfileComponent } from './name-profile.component';

describe('NameProfileComponent', () => {
  let component: NameProfileComponent;
  let fixture: ComponentFixture<NameProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
