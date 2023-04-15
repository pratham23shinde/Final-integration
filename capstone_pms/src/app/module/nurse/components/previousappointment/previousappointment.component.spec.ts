import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousappointmentComponent } from './previousappointment.component';

describe('PreviousappointmentComponent', () => {
  let component: PreviousappointmentComponent;
  let fixture: ComponentFixture<PreviousappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousappointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
