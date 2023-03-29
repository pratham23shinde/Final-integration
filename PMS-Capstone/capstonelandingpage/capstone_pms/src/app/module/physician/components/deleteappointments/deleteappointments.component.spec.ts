import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteappointmentsComponent } from './deleteappointments.component';

describe('DeleteappointmentsComponent', () => {
  let component: DeleteappointmentsComponent;
  let fixture: ComponentFixture<DeleteappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteappointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
