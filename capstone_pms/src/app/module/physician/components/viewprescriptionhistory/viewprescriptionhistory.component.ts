import { MatPaginator } from '@angular/material/paginator';
import { PhysicianService } from './../../physician.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  prescriptionId: number;
  prescriptionName: string;
  dosage: string;
  prescriptionNotes: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-viewprescriptionhistory',
  templateUrl: './viewprescriptionhistory.component.html',
  styleUrls: ['./viewprescriptionhistory.component.scss'],
})
export class ViewprescriptionhistoryComponent {
  constructor(private service: PhysicianService) {}

  ngOnInit() {
    this.getallPrescriptionbyvisitid();
  }
  displayedColumns: string[] = [
    'prescriptionId',
    'prescriptionName',
    'dosage',
    'prescriptionNotes',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  dataSource: any;
  visitId: any = sessionStorage.getItem('previousvisitId');
  prescriptiondata: any;
  getallPrescriptionbyvisitid() {
    this.service
      .getallPrescriptionbyvisitiddata(this.visitId)
      .subscribe((response) => {
        this.prescriptiondata = response;
        this.dataSource = new MatTableDataSource(this.prescriptiondata);
        this.dataSource.paginator = this.paginator;
        console.log(this.prescriptiondata);
      });
  }
}
