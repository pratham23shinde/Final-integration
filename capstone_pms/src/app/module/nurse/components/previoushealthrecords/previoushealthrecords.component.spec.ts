import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevioushealthrecordsComponent } from './previoushealthrecords.component';

describe('PrevioushealthrecordsComponent', () => {
  let component: PrevioushealthrecordsComponent;
  let fixture: ComponentFixture<PrevioushealthrecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevioushealthrecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevioushealthrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
