import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssoicatecardComponent } from './assoicatecard.component';

describe('AssoicatecardComponent', () => {
  let component: AssoicatecardComponent;
  let fixture: ComponentFixture<AssoicatecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssoicatecardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssoicatecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
