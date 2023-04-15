import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnurseComponent } from './addnurse.component';

describe('AddnurseComponent', () => {
  let component: AddnurseComponent;
  let fixture: ComponentFixture<AddnurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnurseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
