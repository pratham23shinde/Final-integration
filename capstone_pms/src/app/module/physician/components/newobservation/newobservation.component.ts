import { MatDialogRef } from '@angular/material/dialog';
import { PhysicianService } from './../../physician.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class Test {
  testId: any;
  testName: any;
  result: any;
  testNotes: any;
  visitId: any;
}

@Component({
  selector: 'app-newobservation',
  templateUrl: './newobservation.component.html',
  styleUrls: ['./newobservation.component.scss'],
})
export class NewobservationComponent {
  myGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

    private service: PhysicianService,
    private matdialogRef: MatDialogRef<NewobservationComponent>
  ) {

    this.myGroup = this.formBuilder.group(
      {
              testInput: ['', [Validators.required]],
        testResultInput: ['', [Validators.required]],
        testNotesInput: ['', [Validators.required]],
  });
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  test: Test = new Test();
  visitId = sessionStorage.getItem('newVisitId');

  saveObservation() {
    console.log(this.test);
    console.log(this.visitId);
    this.service
      .addObservation(this.test, this.visitId)
      .subscribe((response) => {
        console.log(this.test);
        this.matdialogRef.close();
      });
  }

  onSubmit() {
    if (this.myGroup.valid) {
      this.saveObservation();
  }
  }}
