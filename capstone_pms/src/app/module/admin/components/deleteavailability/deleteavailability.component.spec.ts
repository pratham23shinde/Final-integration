import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteavailabilityComponent } from './deleteavailability.component';

describe('DeleteavailabilityComponent', () => {
  let component: DeleteavailabilityComponent;
  let fixture: ComponentFixture<DeleteavailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteavailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
