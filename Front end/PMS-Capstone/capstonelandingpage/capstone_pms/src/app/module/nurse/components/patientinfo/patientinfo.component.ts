import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Route } from '@angular/router';


import { NurseService } from '../../nurse.service';

@Component({
  selector: 'app-patientinfo',
  templateUrl: './patientinfo.component.html',
  styleUrls: ['./patientinfo.component.scss']
})
export class PatientinfoComponent implements OnInit {
  public patientId : number=0;
  constructor(private patientInfoService: NurseService,private route:ActivatedRoute ) { }
  
  ngOnInit(): void {
  this.getPatientbyId() ;
  console.log(this.route);
  this.route.params.subscribe((param) =>{
   this.patientId=param['patientId'];
    console.log(this.patientId);
  });

  }
 
  patientbyIdData:any
  getPatientbyId() {
  
    this.patientInfoService.getPatientbyId(1).subscribe(response => {
      this.patientbyIdData = response;
      console.log(this.patientbyIdData)
    })
  }

}