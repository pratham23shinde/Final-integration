import { Component, OnInit } from '@angular/core';
import { PhysicianService } from '../../physician.service';

@Component({
  selector: 'app-physicianprofile',
  templateUrl: './physicianprofile.component.html',
  styleUrls: ['./physicianprofile.component.scss']
})
export class PhysicianprofileComponent implements OnInit{
  constructor(private service:PhysicianService){}
  ngOnInit(): void {
    this.getAllPhysicianData();
    throw new Error('Method not implemented.');
  }

  physicianInfo:any;
  email:any=sessionStorage.getItem("currentUserEmail");
  getAllPhysicianData(){
    this.service.getAllPhysicianInfo(this.email).subscribe(response=>{
      this.physicianInfo=response;
      console.log("physician info ",this.physicianInfo);

    })
  }

}
