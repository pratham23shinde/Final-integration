import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewprescriptionComponent } from 'src/app/module/patient/components/viewprescription/viewprescription.component';
import { NurseService } from '../../nurse.service';
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
   bpDiastolic:any;
   bpSystolic:any;
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
  selector: 'app-previoushealthrecords',
  templateUrl: './previoushealthrecords.component.html',
  styleUrls: ['./previoushealthrecords.component.scss']
})
export class PrevioushealthrecordsComponent {
  paginator: any;
  sort: MatSort | null | undefined;
  constructor(
    private service: NurseService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}
  displayedColumns1: string[] = ['testId', 'testName', 'result', 'testNotes'];

  arr: string = JSON.parse(sessionStorage.getItem('data') || '{}');
  appId: string = JSON.parse(sessionStorage.getItem('app') || '{}');


  ngOnInit() {
    
    this.getVisitId();
    console.log("VisitId",this.arr);
    this.getVisitDetailsByVisitId();
    
    this.getTests();
   
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
  

  num: any = sessionStorage.getItem('patientId');

  public getVisitId(): void {
    console.log("inside getVisitId",this.num);
    this.service.getAllVisitId(this.num).subscribe(
      (reponse: VisitId[]) => {
        this.visits = reponse;
        sessionStorage.setItem('data', JSON.stringify(reponse));
        console.log("visitId",this.visits);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  info(id:any){
    sessionStorage.setItem("pass",id);
    // console.log("IDDDD",id);

  }
  visitIdForDoctor = sessionStorage.getItem("pass");
  

  doctor = sessionStorage.getItem("appId");

  public getAppointment(): void {
      this.service.getAppointmentDetails(Number(this.doctor)).subscribe(
        (response: AppointmentDetails[]) => {
          this.appointmentDetails = response;
          console.log("APPoint",this.appointmentDetails);
          
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    
  }



  try: any[] = [];

  public getTests(): void {
    for (let mrunal of this.arr) {
      console.log('getTEst', Number(mrunal));
      this.service.getAllTests(Number(mrunal)).subscribe(
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
 

  openDialog(ashwin : any) {
    
    sessionStorage.setItem('view',ashwin);
    console.log("ASHWIN",ashwin)
    this.dialog.open(ViewprescriptionComponent);
  }

  

  eshu: any[] = [];
  getVisitDetailsByVisitId(): void {
    for (let a of this.arr) {
      this.service
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

  appointmentDetail: any[] = [];

  public getAppointmentDetails(x : number): void {
      this.service.getAppointmentDetails(x).subscribe(
        (response: AppointmentDetails[]) => {
          this.appointmentDetails = response;
          console.log('MMMMMMMMMMMMM', response);
          var fuck = this.appointmentDetail.push(response);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
}