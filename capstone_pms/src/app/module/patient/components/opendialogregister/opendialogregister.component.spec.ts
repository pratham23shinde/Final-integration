import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpendialogregisterComponent } from './opendialogregister.component';

describe('OpendialogregisterComponent', () => {
  let component: OpendialogregisterComponent;
  let fixture: ComponentFixture<OpendialogregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpendialogregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpendialogregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
