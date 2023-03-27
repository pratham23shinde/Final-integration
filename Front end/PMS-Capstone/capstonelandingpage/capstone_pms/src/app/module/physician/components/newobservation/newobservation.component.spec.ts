import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewobservationComponent } from './newobservation.component';

describe('NewobservationComponent', () => {
  let component: NewobservationComponent;
  let fixture: ComponentFixture<NewobservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewobservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewobservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
