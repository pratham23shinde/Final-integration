import { PhysicianService } from './../../physician.service';

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ViewprescriptionComponent } from '../viewprescription/viewprescription.component';


export interface PeriodicElement {
  testId: number;
  testName: string;
  result: string;
  testNotes: string;
  visitId: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-viewpetienthistory',
  templateUrl: './viewpetienthistory.component.html',
  styleUrls: ['./viewpetienthistory.component.scss']
})
export class ViewpetienthistoryComponent implements AfterViewInit{
  displayedColumns: string[] = ['testId', 'testName', 'result', 'testNotes'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private matDialog: MatDialog,
    private service: PhysicianService
  ) {}

  ngOnInit(): void {
    this.getPatientbyId();
    this.getAppointmenthHistoryDetailsById();
    this.previousVisitDetailsById();
    this.getPreviousTestData();
    // this.getAppointmentHistoryDetailsById();
    // this.getPrevioushealthrecordsBypatientId();
    // this.getAllTestByVisitId();

    throw new Error('Method not implemented.');
  }

  patientid: any = sessionStorage.getItem('patientId');
  patientbyIdData: any;
  getPatientbyId() {
    console.log('this is patientid in history component ', this.patientid);
    this.service.getPatientbyId(this.patientid).subscribe((response) => {
      this.patientbyIdData = response;
      console.log('this is history', this.patientbyIdData);
    });
  }

  visisthistorydetailsdata: any;
  getAppointmenthHistoryDetailsById() {
    console.log(
      'this is patient id in getvisit history detailsby id for history',
      this.patientid
    );

    this.service
      .getAppointmentHistoryDetailsById(this.patientid)
      .subscribe((response) => {
        this.visisthistorydetailsdata = response;
        console.log(
          'Appointment History Details By Id IN Update component',
          this.visisthistorydetailsdata
        );
      });
  }

  visitId: any;
  previousVisitData: any;
  previousVisitDetailsById() {
    this.service
      .getPreviousVisistRecordsByPatientId(this.patientid)
      .subscribe((response) => {
        this.previousVisitData = response;
        console.log('aaaaaa', this.previousVisitData.visitId);
        sessionStorage.setItem('visitId', this.previousVisitData.visitId);
        console.log(
          'previous visit details by patient id ',
          this.previousVisitData
        );
      });
  }

  testData: any;
  getPreviousTestData() {
    this.visitId = sessionStorage.getItem('visitId');
    this.service.getPrevTests(this.visitId).subscribe((response) => {
      this.testData = response;
      console.log('this is prvious visit test data ', this.testData);
    });
  }

  

  openDialogViewPrescription() {
    this.matDialog.open(ViewprescriptionComponent),
      {
        Width: '800px',
      };
  }

}
