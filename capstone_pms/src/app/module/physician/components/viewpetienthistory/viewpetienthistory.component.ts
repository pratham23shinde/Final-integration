import { PhysicianService } from './../../physician.service';

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import {
  PeriodicElement,
  ViewprescriptionComponent,
} from '../viewprescription/viewprescription.component';
import { ViewprescriptionhistoryComponent } from '../viewprescriptionhistory/viewprescriptionhistory.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';

export interface TestList {
  testId: number;
  testName: string;
  result: string;
  testNotes: string;
}
export interface VisitId {
  visitId: number;
}
export interface AllAppointments {
  appointmentId: number;
}
export interface AppointmentDetails {
  acceptance: string;
  appointmentId: number;
  date: string;
  drFirstName: string;
  drLastName: string;
  patientId: number;
  physicianEmail: string;
  reason: string;
  submissionDate: string;
}
export interface VisitDetails {
  height: number;
  weight: any;
  BPdiastolic: any;
  BPsystolic: any;
  bloodGroup: any;
  bodyTemperature: any;
  patientId: any;
  appointmentId: any;
  nurseEmail: any;
  physicianEmail: any;
  allergyName: any;
  repirationRate: any;
  keyNotes: any;
  daignosis: any;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-viewpetienthistory',
  templateUrl: './viewpetienthistory.component.html',
  styleUrls: ['./viewpetienthistory.component.scss'],
})
export class ViewpetienthistoryComponent implements AfterViewInit {
  paginator: any;
  sort: MatSort | null | undefined;
  constructor(
    private Service: PhysicianService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}
  displayedColumns1: string[] = ['testId', 'testName', 'result', 'testNotes'];

  arr: string = JSON.parse(sessionStorage.getItem('data') || '{}');
  appId: string = JSON.parse(sessionStorage.getItem('app') || '{}');

  ngOnInit() {
    this.getVisitId();
    console.log('VisitId', this.arr);

    this.getTests();
  }
  nums: number[] = [];

  ngAfterViewInit(): void {
    this.dataSource1 = new MatTableDataSource<TestList>(this.tests);
    this.dataSource1.paginator = this.paginator;
    // this.dataSource1.sort = this.sort;
  }
  private _tests: TestList[] = [];
  private _visits: VisitId[] = [];
  private _appointments: AllAppointments[] = [];
  private _visitDetails: VisitDetails[] = [];
  private _appointmentDetails: AppointmentDetails[] = [];

  public get tests(): TestList[] {
    return this._tests;
  }
  public set tests(value: TestList[]) {
    this._tests = value;
  }
  public get visits(): VisitId[] {
    return this._visits;
  }
  public set visits(value: VisitId[]) {
    this._visits = value;
  }
  public get appointments(): AllAppointments[] {
    return this._appointments;
  }
  public set appointments(value: AllAppointments[]) {
    this._appointments = value;
  }
  public set appointmentDetails(value: AppointmentDetails[]) {
    this._appointmentDetails = value;
  }
  public get appointmentDetails() {
    return this._appointmentDetails;
  }
  public get visitDetails(): VisitDetails[] {
    return this._visitDetails;
  }
  public set visitDetails(value: VisitDetails[]) {
    this._visitDetails = value;
  }
  isLoading = false;

  dataSource1 = new MatTableDataSource<TestList>();
  // pageSizes = [3, 5, 7];
  // @ViewChild(MatSort) sort: MatSort;

  num: any = sessionStorage.getItem('patientId');
  showdata: any;
  showtext: any;
  public getVisitId(): void {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.num);
    this.Service.getAllVisitId(this.num).subscribe(
      (reponse: VisitId[]) => {
        this.visits = reponse;
        sessionStorage.setItem('data', JSON.stringify(reponse));
        console.log('All visitId in history', this.visits);
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    console.log(this.visits.length);
    if (this.visits.length === 0) {
      console.log("dat will be printed");
      
      this.showdata = true;
      
    } else {
      console.log("text will be printed");
      
      this.showtext = true;
      
    }
  }

  info(id: any) {
    sessionStorage.setItem('pass', id);
    // console.log("IDDDD",id);
  }
  visitIdForDoctor = sessionStorage.getItem('pass');

  doctor = sessionStorage.getItem('appId');

  public getAppointment(): void {
    this.Service.getAppointmentDetails(Number(this.doctor)).subscribe(
      (response: AppointmentDetails[]) => {
        this.appointmentDetails = response;
        console.log('Appointment details', this.appointmentDetails);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // previousTestData: any[] = [];
  // public getTests1() {
  //   for (var i = 0; i < this.arr.length - 1; i++) {
  //     console.log('tests', this.arr[i]);
  //     this.Service.getAllTests(Number(this.arr[i])).subscribe(
  //       (response: TestList[]) => {
  //         this.tests = response;
  //         sessionStorage.setItem('visitid', this.arr[i]);
  //         var len = this.previousTestData.push(response);
  //         console.log("sssssss",this.tests);
  //       },
  //       (error: HttpErrorResponse) => {
  //         alert(error.message);
  //       }
  //     );
  //   }
  // }

  previousTestData: any[] = [];
  public getTests(): void {
    for (let mrunal of this.arr) {
      console.log('getTEst', Number(mrunal));
      this.Service.getAllTests(Number(mrunal)).subscribe(
        (response: TestList[]) => {
          this.tests = response;
          sessionStorage.setItem('visitid', mrunal);
          console.log('33333', mrunal);
          var len = this.previousTestData.push(response);
          console.log(this.tests);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  openDialog(previousvisitid: any) {
    sessionStorage.setItem('previousvisitId', previousvisitid);
    console.log('previousvisitId', previousvisitid);
    this.dialog.open(ViewprescriptionhistoryComponent);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
}
