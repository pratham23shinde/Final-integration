import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianprofileComponent } from './physicianprofile.component';

describe('PhysicianprofileComponent', () => {
  let component: PhysicianprofileComponent;
  let fixture: ComponentFixture<PhysicianprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicianprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicianprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
