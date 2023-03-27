import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvisitdetailsComponent } from './addvisitdetails.component';

describe('AddvisitdetailsComponent', () => {
  let component: AddvisitdetailsComponent;
  let fixture: ComponentFixture<AddvisitdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvisitdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddvisitdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
