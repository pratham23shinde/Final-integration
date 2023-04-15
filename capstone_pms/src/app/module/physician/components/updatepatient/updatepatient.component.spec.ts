import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepatientComponent } from './updatepatient.component';

describe('UpdatepatientComponent', () => {
  let component: UpdatepatientComponent;
  let fixture: ComponentFixture<UpdatepatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatepatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatepatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
