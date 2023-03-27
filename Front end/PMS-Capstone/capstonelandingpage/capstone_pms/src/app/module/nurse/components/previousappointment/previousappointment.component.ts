import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NurseService } from '../../nurse.service';

@Component({
  selector: 'app-previousappointment',
  templateUrl: './previousappointment.component.html',
  styleUrls: ['./previousappointment.component.scss']
})
export class PreviousappointmentComponent implements OnInit{
  



  constructor(private appointmnetService:NurseService ,private route:ActivatedRoute ) { }
  ngOnInit(): void {
    this.getPeviousAppointment();
    this.getPeviousAppointmentVisitHistory();
  }
  
  patientId=sessionStorage.getItem("patientID")
  perviousAppointmentIdData:any
  getPeviousAppointment() {
  
    this.appointmnetService.getPeviousAppointment(Number(this.patientId)).subscribe(response => {
      this.perviousAppointmentIdData = response;
    })
  }

 //for previous appoitmentdate and doctor name
  perviousAppointmentVisitHistory:any
  getPeviousAppointmentVisitHistory() {
    console.log(this.perviousAppointmentIdData.appointmentId);
    this.appointmnetService.getPeviousAppointmentVisitHistory(this.perviousAppointmentIdData.appointmentId).subscribe(response => {
      this.perviousAppointmentVisitHistory = response;
    })
  }


 //for previous appoitment diagnosis
 diagnosis= sessionStorage.getItem('previousDiagnosis');
}