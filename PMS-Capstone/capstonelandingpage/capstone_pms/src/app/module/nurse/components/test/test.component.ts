import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { NurseService } from '../../nurse.service';

export interface TestList {


  testId: number;
  testName:string;
  result:string;
  testNotes:string;
 
  
  
}

const testsData: TestList[] = [];
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  implements AfterViewInit,OnInit {
  constructor(private testhistory:NurseService
    ){}

  displayedColumns: string[] = ['testId','testName','result', 'testNotes'];
  
  ngOnInit() {
    this.getTests();
  }
  private _tests!: TestList[];
  public get tests(): TestList[] {
    return this._tests;
  }
  public set tests(value: TestList[]) {
    this._tests = value;
  }
  isLoading = false;
  
  dataSource = new MatTableDataSource<TestList>();
  


  ngAfterViewInit(): void {
   this.getTests();
    this.dataSource=new MatTableDataSource<TestList>(this.tests);
    
  
  }

 
//getting previous appoitment visitid from sessionstrorage
  previousVisitId = sessionStorage.getItem('previousVisitId');

  public getTests():void{
    console.log("previousI in test"+this.previousVisitId);
    this.testhistory.getAllTests(Number(this.previousVisitId)).subscribe(
      (response:TestList[])=>{
        this.tests=response;
        console.log(this.tests);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
      
      )
    
  }

}