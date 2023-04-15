import { PatientData } from './../../../admin/components/patientinfo/patientinfo.component';
import { Component } from '@angular/core';
import { PatientService } from '../../patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';

export interface PrescriptionList {
  prescriptionId: number;
  prescriptionName: string;
  dosage: string;
  prescriptionNotes: string;
  visitId: number;
}
const prescriptionData: PrescriptionList[] = [];
@Component({
  selector: 'app-viewprescription',
  templateUrl: './viewprescription.component.html',
  styleUrls: ['./viewprescription.component.scss']
})
export class ViewprescriptionComponent {
  constructor(private patientService: PatientService) {}
  viewpre = sessionStorage.getItem("view");
  displayedColumns: string[] = [
    'prescriptionName',
    'dosage',
    'prescriptionNotes',
  ];
  
  
  ngOnInit() {
    this.getPrescriptions();
    console.log("VIEWPRE",this.viewpre,typeof(this.viewpre));
  }

  show!:boolean;
  hide!:boolean;
  private _prescriptions: PrescriptionList[] = [];
  public get prescriptions(): PrescriptionList[] {
    return this._prescriptions;
  }
  public set prescriptions(value: PrescriptionList[]) {
    this._prescriptions = value;
  }
  isLoading = false;

  dataSource = new MatTableDataSource<PrescriptionList>();
  ngAfterViewInit(): void {
    //this.getPrescriptions();
    this.dataSource = new MatTableDataSource<PrescriptionList>(
      this.prescriptions
    );
  }
  
  public getPrescriptions(): void {
    
      this.patientService.getAllPrescription(Number(this.viewpre)).subscribe(
        (response: PrescriptionList[]) => {
          this.prescriptions = response;
          if(this.prescriptions==null)
      {
        this.show=true;
        this.hide=false
      }else{
        this.show=false;
        this.hide=true;
      }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
}
