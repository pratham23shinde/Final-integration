import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterprescriptionComponent } from './enterprescription.component';

describe('EnterprescriptionComponent', () => {
  let component: EnterprescriptionComponent;
  let fixture: ComponentFixture<EnterprescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterprescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
