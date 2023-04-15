import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitdialogComponent } from './submitdialog.component';

describe('SubmitdialogComponent', () => {
  let component: SubmitdialogComponent;
  let fixture: ComponentFixture<SubmitdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
