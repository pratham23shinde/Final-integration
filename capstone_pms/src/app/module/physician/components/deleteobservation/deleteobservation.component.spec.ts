import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteobservationComponent } from './deleteobservation.component';

describe('DeleteobservationComponent', () => {
  let component: DeleteobservationComponent;
  let fixture: ComponentFixture<DeleteobservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteobservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteobservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
