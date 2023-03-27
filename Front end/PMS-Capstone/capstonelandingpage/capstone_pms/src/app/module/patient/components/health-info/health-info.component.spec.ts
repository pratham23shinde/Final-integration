import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInfoComponent } from './health-info.component';

describe('HealthInfoComponent', () => {
  let component: HealthInfoComponent;
  let fixture: ComponentFixture<HealthInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
