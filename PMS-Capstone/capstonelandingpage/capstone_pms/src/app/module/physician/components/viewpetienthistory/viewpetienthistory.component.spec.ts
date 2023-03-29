import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpetienthistoryComponent } from './viewpetienthistory.component';

describe('ViewpetienthistoryComponent', () => {
  let component: ViewpetienthistoryComponent;
  let fixture: ComponentFixture<ViewpetienthistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpetienthistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpetienthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
