import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprescriptionhistoryComponent } from './viewprescriptionhistory.component';

describe('ViewprescriptionhistoryComponent', () => {
  let component: ViewprescriptionhistoryComponent;
  let fixture: ComponentFixture<ViewprescriptionhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewprescriptionhistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewprescriptionhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
