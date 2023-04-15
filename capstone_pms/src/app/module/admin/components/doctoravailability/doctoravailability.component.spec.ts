import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoravailabilityComponent } from './doctoravailability.component';

describe('DoctoravailabilityComponent', () => {
  let component: DoctoravailabilityComponent;
  let fixture: ComponentFixture<DoctoravailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctoravailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctoravailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
