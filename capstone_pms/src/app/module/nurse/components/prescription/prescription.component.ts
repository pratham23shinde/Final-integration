import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit,Component, OnInit, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { NurseService } from '../../nurse.service';


export interface PrescriptionList {

  prescriptionId: number;
  prescriptionName:string;
  dosage:string;
  prescriptionNotes:string;
  
  
}

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements AfterViewInit,OnInit {

  constructor(private prescriptionhistory: NurseService ){}

    
  displayedColumns: string[] = ['prescriptionId','prescriptionName','dosage', 'prescriptionNotes'];
    ngOnInit() {
      this.getPrescriptions();
    }
     private _prescriptions!: PrescriptionList[];
    public get prescriptions(): PrescriptionList[] {
      return this._prescriptions;
    }
    public set prescriptions(value: PrescriptionList[]) {
      this._prescriptions = value;
    }
    isLoading = false;
    
    dataSource = new MatTableDataSource<PrescriptionList>();

    ngAfterViewInit(): void {
      this.getPrescriptions();
       this.dataSource=new MatTableDataSource<PrescriptionList>(this.prescriptions);
     
     }

     //getting previous appoitment visitid from sessionstrorage
     previousVisitId = sessionStorage.getItem('previousVisitId');
     public getPrescriptions():void{
      //console.log(this.previousVisitId);
      this.prescriptionhistory.getAllPrescription(Number(this.previousVisitId)).subscribe(
        (response:PrescriptionList[])=>{
          this.prescriptions=response;
          //console.log(this.prescriptions);
          
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        }
        
        )
      
    }
}