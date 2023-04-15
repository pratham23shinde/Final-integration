import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getPatientbyId();
  }

  num: any = sessionStorage.getItem('patientid');

  patientbyIdData: any;
  getPatientbyId() {
    console.log(this.num);
    this.patientService.getPatientbyId(this.num).subscribe((response) => {
      this.patientbyIdData = response;
      console.log(this.patientbyIdData);
    });
  }

}
