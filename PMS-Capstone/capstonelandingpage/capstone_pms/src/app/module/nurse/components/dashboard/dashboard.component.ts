import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NurseService } from '../../nurse.service';
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
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ///to set nurseEmail
  // public visitDetails: VisitDetails =new VisitDetails() ;
  VisitDetailsnurseEmail = sessionStorage.getItem('currentUserEmail');
  ngOnInit(): void {
    this.getAppointments();
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
    this.getAppointments();
    
   
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
  //arr for patientId
  arr :[] =[]
  public getAppointments(): void {
    this.appointmentData.getAllAppointment().subscribe(
      (response: AppointmentList[]) => {
        this.appointments = response;
        console.log('All accepted appoitments', this.appointments);
        this.dataSource = new MatTableDataSource<AppointmentList>(
         this.appointments
          //var length = this.arr.push(response.patientId);
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //for sending appointment data like  patientId
  sendAppointmentData(physicianEmail: any, appointmentId: any, patientId: any) {
    sessionStorage.setItem('physicianEmail', physicianEmail);
    sessionStorage.setItem('appointmentId', appointmentId);
    sessionStorage.setItem('patientId', patientId);
    
    
    
  }
}