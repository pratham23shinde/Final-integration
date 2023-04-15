import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  loginEmail:any=sessionStorage.getItem('currentUserEmail');

  details:any;

  constructor(private service : AdminService){}
  ngOnInit(): void {
    console.log("session", this.loginEmail);
    this.loginDetails();
  }


loginDetails(){
  this.service.getloginDetails(this.loginEmail).subscribe(
    (response)=>{
      this.details=response;
      console.log("details login",this.details);
    });

}


}