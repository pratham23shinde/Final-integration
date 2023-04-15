import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseinfoComponent } from './nurseinfo.component';

describe('NurseinfoComponent', () => {
  let component: NurseinfoComponent;
  let fixture: ComponentFixture<NurseinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
