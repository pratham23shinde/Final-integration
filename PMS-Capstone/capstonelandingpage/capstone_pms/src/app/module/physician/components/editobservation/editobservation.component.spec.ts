import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditobservationComponent } from './editobservation.component';

describe('EditobservationComponent', () => {
  let component: EditobservationComponent;
  let fixture: ComponentFixture<EditobservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditobservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditobservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
