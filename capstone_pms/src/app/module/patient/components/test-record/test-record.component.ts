import { Component } from '@angular/core';
import { PatientService } from '../../patient.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface TestList {
  testId: number;
  testName: string;
  result: string;
  testNotes: string;
}

@Component({
  selector: 'app-test-record',
  templateUrl: './test-record.component.html',
  styleUrls: ['./test-record.component.scss'],
})
export class TestRecordComponent {
  constructor(private patientService: PatientService) {}
  displayedColumns1: string[] = ['testName', 'result', 'testNotes']; //'testId',
  private _tests: TestList[] = [];
  public get tests(): TestList[] {
    return this._tests;
  }
  public set tests(value: TestList[]) {
    this._tests = value;
  }

  arr: string = JSON.parse(sessionStorage.getItem('data') || '{}');
  viewtest = sessionStorage.getItem('test');

  ngOnInit() {
    this.getTests();
  }

  try: any[] = [];
  show!:boolean;
  hide!:boolean;
  public getTests(): void {
    for (let mrunal of this.arr) {
      console.log('getTEst', Number(mrunal));
      this.patientService.getAllTests(Number(this.viewtest)).subscribe(
        (response: TestList[]) => {
          this.tests = response;
          sessionStorage.setItem('visitid', mrunal);
          var len = this.try.push(response);

          if(this.tests==null)
      {
        this.show=true;
        this.hide=false
      }else{
        this.show=false;
        this.hide=true;
      }

          // console.log(this.tests);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
}
