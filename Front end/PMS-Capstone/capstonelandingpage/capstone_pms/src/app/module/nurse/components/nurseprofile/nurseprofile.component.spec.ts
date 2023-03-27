import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseprofileComponent } from './nurseprofile.component';

describe('NurseprofileComponent', () => {
  let component: NurseprofileComponent;
  let fixture: ComponentFixture<NurseprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
