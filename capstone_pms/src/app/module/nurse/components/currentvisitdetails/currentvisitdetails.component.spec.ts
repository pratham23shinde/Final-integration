import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentvisitdetailsComponent } from './currentvisitdetails.component';

describe('CurrentvisitdetailsComponent', () => {
  let component: CurrentvisitdetailsComponent;
  let fixture: ComponentFixture<CurrentvisitdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentvisitdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentvisitdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
