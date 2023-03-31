import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from '../../patient.service';

import { ViewprescriptionComponent } from '../viewprescription/viewprescription.component';
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
appointmentId : number;
date : string;
drFirstName : string;
drLastName : string;
patientId : number;
physicianEmail : string;
reason : string;
submissionDate : string;
}
export interface VisitDetails{
  height:number;
   weight:any;
   BPdiastolic:any;
   BPsystolic:any;
   bloodGroup:any;
   bodyTemperature:any;
   patientId :any;
   appointmentId :any;
   nurseEmail :any;
   physicianEmail :any;
  allergyName:any;
   repirationRate:any;
   keyNotes:any;
   daignosis:any;
}
@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss'],
})
export class ObservationsComponent {
  paginator: any;
  sort: MatSort | null | undefined;
  constructor(
    private patientService: PatientService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}
  displayedColumns1: string[] = ['testId', 'testName', 'result', 'testNotes'];

  arr: string = JSON.parse(sessionStorage.getItem('data') || '{}');
  appId: string = JSON.parse(sessionStorage.getItem('app') || '{}');


  ngOnInit() {
    
    this.getVisitId();
    console.log("VisitId",this.arr);
    
    this.getTests();
    this.getVisitDetailsByVisitId();
    // this.getVisitDetailsByVisitId();
    // this.getAppointment();
    // console.log("Rushi",this.visitIdForDoctor);
    // this.getAppointmentId();
    // this.getPeviousAppointment();
    // this.getPeviousAppointmentVisitHistory();

    // this.getAppointment();
    // console.log("final",this.no);
  }
  nums: number[] = [];

  ngAfterViewInit(): void {

    this.dataSource1 = new MatTableDataSource<TestList>(this.tests);
    this.dataSource1.paginator = this.paginator;
    // this.dataSource1.sort = this.sort;
  }
  private _tests: TestList[]=[];
  private _visits: VisitId[] = [];
  private _appointments: AllAppointments[] = [];
  private _visitDetails: VisitDetails[]=[];
  private _appointmentDetails: AppointmentDetails[]=[];

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

  num: any = sessionStorage.getItem('patientid');

  public getVisitId(): void {
    console.log(this.num);
    this.patientService.getAllVisitId(this.num).subscribe(
      (reponse: VisitId[]) => {
        this.visits = reponse;
        sessionStorage.setItem('data', JSON.stringify(reponse));
        console.log("visitId",this.visits);
        if(this.visits===null){
          this.show=false;
        }
        else{
          this.show=true;
        }

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // info(id:any){
  //   sessionStorage.setItem("pass",id);
  //   // console.log("IDDDD",id);

  // }
  visitIdForDoctor = sessionStorage.getItem("pass");
  // getVisitDetailsByVisitId():void{
  //   this.patientService.getVisitDetails(Number(this.visitIdForDoctor)).subscribe(
  //     (response:VisitDetails[])=>{
  //       this.visitDetails = response;
  //       console.log("doctorDetails",this.visitDetails);
  //       console.log("appointmentId",this.visitDetails[0].appointmentId);

  //       sessionStorage.setItem("appId",this.visitDetails[0].appointmentId);
  //     }
  //   )

  // }
  eshu: any[] = [];
  getVisitDetailsByVisitId(): void {
    for (let a of this.arr) {
      this.patientService
        .getVisitDetails(Number(a))
        .subscribe((response: VisitDetails[]) => {
          this.visitDetails = response;
          console.log('EEEEEEEE', response);
          // sessionStorage.setItem('appId', JSON.stringify(response));
          var len2 = this.eshu.push(response[0].appointmentId);
          this.getAppointmentDetails(response[0].appointmentId);
        });
    }
  }

  doctor: any[] = [];

  public getAppointmentDetails(x : number): void {
      this.patientService.getAppointmentDetails(x).subscribe(
        (response: AppointmentDetails[]) => {
          this.appointmentDetails = response;
          console.log('MMMMMMMMMMMMM', response);
          var len4 = this.doctor.push(response);
          
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }


  try: any[] = [];
show!:boolean

  public getTests(): void {
    for (let mrunal of this.arr) {
      console.log('getTEst', Number(mrunal));
      this.patientService.getAllTests(Number(mrunal)).subscribe(
        (response: TestList[]) => {
          this.tests = response;
          
          sessionStorage.setItem('visitid', mrunal);
          var len = this.try.push(response);
          // console.log(this.tests);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  // perviousAppointmentIdData: any;
  
  openDialog(ashwin : any) {
    
    sessionStorage.setItem('view',ashwin);
    console.log("ASHWIN",ashwin)
    this.dialog.open(ViewprescriptionComponent);
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
  }}