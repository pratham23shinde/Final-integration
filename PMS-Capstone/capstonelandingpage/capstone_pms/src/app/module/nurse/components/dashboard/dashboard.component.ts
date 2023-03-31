import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NurseService } from '../../nurse.service';

import {FormControl} from '@angular/forms';
// import { VisitDetails } from '../addvisitdetails/visitDetails.model';

export interface AppointmentList {
  appointmentId: number;
  patientId: number;
  date: string;
  reason: string;
  info: boolean;
}

const appointment_data: AppointmentList[] = [];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  constructor(
    private appointmentData: NurseService,
    private _liveAnnouncer: LiveAnnouncer,
    private datepipe:DatePipe
  ) {}

  ///to set nurseEmail
  // public visitDetails: VisitDetails =new VisitDetails() ;
  VisitDetailsnurseEmail = sessionStorage.getItem('currentUserEmail');
  ngOnInit(): void {
   // this.getAppointments();
   this.getTodaysAppointment() 
    console.log("nurse email",this.VisitDetailsnurseEmail);
  }
  private _appointments!: AppointmentList[];
  public get appointments(): AppointmentList[] {
    return this._appointments;
  }
  public set appointments(value: AppointmentList[]) {
    this._appointments = value;
  }
  isLoading = false;
  displayedColumns: string[] = [
    'appointmentId',
    'patientId',
    'date',
    'reason',
    'info',
  ];
  dataSource = new MatTableDataSource<AppointmentList>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizes = [3, 5, 7];
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    //this.getAppointments();
    
   
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  sendAppointmentData(physicianEmail: any, appointmentId: any, patientId: any) {
    sessionStorage.setItem('physicianEmail', physicianEmail);
    sessionStorage.setItem('appointmentId', appointmentId);
    sessionStorage.setItem('patientId', patientId);
   
  }


  todayDate: Date = new Date();
  currentDate: DatePipe = new DatePipe('en-us');
  
  todaysAppointment: any;
  transformdate: any;
  email = 'aakash.solanke@gmail.com';
  status = 'acceptance=Accepted';

  formattedDate: any;
  onDateSelected(selectedDate: string) {
    this.formattedDate = this.datepipe.transform(selectedDate, 'dd-MM-yyyy');
    console.log(this.formattedDate);
    this.appointmentData
      .getTodaysAppointment( this.formattedDate, this.status)
      .subscribe((response) => {
        this.todaysAppointment = response;

        console.log(this.transformdate);

        this.dataSource = new MatTableDataSource(this.todaysAppointment);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  getTodaysAppointment() {
    var date = new Date();
    this.transformdate = this.currentDate.transform(date, 'dd-MM-YYYY');
    console.log(this.transformdate);
    this.appointmentData
      .getTodaysAppointment( this.transformdate, this.status)
      .subscribe((response ) => {
        this.todaysAppointment = response;
        console.log(this.todaysAppointment);
        console.log( "appoitment for patientId",this.todaysAppointment[0].patientId);
         this.getPatientbyId(this.todaysAppointment[0].patientId)
        this.dataSource = new MatTableDataSource(this.todaysAppointment);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }


  // currentPatientId:any=sessipatientbyIdData:any
  patientbyIdData:any;
  getPatientbyId(patientId:number) {
    this.appointmentData.getPatientbyId(patientId).subscribe(response => {
      this.patientbyIdData = response;
      console.log(this.patientbyIdData)
    })
  }
  
}