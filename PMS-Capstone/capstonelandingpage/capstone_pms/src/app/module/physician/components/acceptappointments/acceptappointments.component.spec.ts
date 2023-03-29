import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptappointmentsComponent } from './acceptappointments.component';

describe('AcceptappointmentsComponent', () => {
  let component: AcceptappointmentsComponent;
  let fixture: ComponentFixture<AcceptappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptappointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
