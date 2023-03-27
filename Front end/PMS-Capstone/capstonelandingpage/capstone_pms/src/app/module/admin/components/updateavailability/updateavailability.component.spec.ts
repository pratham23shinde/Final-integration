import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateavailabilityComponent } from './updateavailability.component';

describe('UpdateavailabilityComponent', () => {
  let component: UpdateavailabilityComponent;
  let fixture: ComponentFixture<UpdateavailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateavailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
