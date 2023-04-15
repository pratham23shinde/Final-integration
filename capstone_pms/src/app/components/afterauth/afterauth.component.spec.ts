import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterauthComponent } from './afterauth.component';

describe('AfterauthComponent', () => {
  let component: AfterauthComponent;
  let fixture: ComponentFixture<AfterauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterauthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
