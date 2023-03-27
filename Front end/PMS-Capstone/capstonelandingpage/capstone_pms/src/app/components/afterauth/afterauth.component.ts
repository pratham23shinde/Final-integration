import { User } from './../../module/patient/components/register/register.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-afterauth',
  templateUrl: './afterauth.component.html',
  styleUrls: ['./afterauth.component.scss'],
})
export class AfterauthComponent implements OnInit {
  profileJson: string = 'none';
  ShowRole = false;
  roleOfUSer:any;



  constructor(public auth: AuthService) {}
  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => {
        (this.profileJson = JSON.stringify(profile, null, 2));
       
        
      }

    
    );
    
   


  }

  getRole() {
    
    this.ShowRole = !this.ShowRole;
  }


  

}
