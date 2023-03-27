import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit{

  public patientId : number=0;
  constructor(private patientService: PatientService,private route:ActivatedRoute ) { }
  
  ngOnInit(): void {
  this.getPatientbyId() ;
  console.log(this.route);
  this.route.params.subscribe((param) =>{
   this.patientId=param['patientId'];
    console.log(this.patientId);
  });

  }
  num: any = sessionStorage.getItem('patientid');
  patientbyIdData:any
  getPatientbyId() {
    console.log(this.num);
    this.patientService.getPatientbyId(this.num).subscribe(response => {
      this.patientbyIdData = response;
      console.log(this.patientbyIdData)
    })
  }

}
