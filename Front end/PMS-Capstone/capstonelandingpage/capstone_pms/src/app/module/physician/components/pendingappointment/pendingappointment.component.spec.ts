import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingappointmentComponent } from './pendingappointment.component';

describe('PendingappointmentComponent', () => {
  let component: PendingappointmentComponent;
  let fixture: ComponentFixture<PendingappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingappointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
