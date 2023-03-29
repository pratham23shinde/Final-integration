import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelowherocardComponent } from './belowherocard.component';

describe('BelowherocardComponent', () => {
  let component: BelowherocardComponent;
  let fixture: ComponentFixture<BelowherocardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BelowherocardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BelowherocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
