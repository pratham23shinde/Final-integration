import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AdminService } from 'src/app/module/admin/admin.service';
import { InitializeUsersService } from './initialize-users.service';

@Component({
  selector: 'app-herosection',
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.scss'],
})
export class HerosectionComponent {
  profileJson: string = 'none';
  ShowRole = false;
  roleOfUSer: any;

  constructor(public auth: AuthService,private addUsers:AdminService) {}
  index=0
  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => {
        (this.profileJson = JSON.stringify(profile, null, 2));
        

        let i=0;
        for( i=0;i<this.profileJson.length;i++){
          if(this.profileJson[i]=="["){
            this.index=i;
            break;
          }
        }
        this.index=this.index+7;
        
        
        if(this.index>8){
          if(this.profileJson[this.index]=="A"){
            this.roleOfUSer="Admin";
            this.adminAddMethod();
            this.doctorAddMethod();
            this.nurseAddMethod();
            console.log("Admin");
          }else if(this.profileJson[this.index]=="D"){
              console.log("Doctor");
              this.roleOfUSer="Doctor";
              this.doctorAddMethod();
          }else if(this.profileJson[this.index]=="N"){
            this.roleOfUSer="Nurse";
            this.nurseAddMethod();
            console.log("Nurse")
          }
        }

       
      }

   );

      
    
    
  }

  getRole() {
    this.ShowRole = !this.ShowRole;
  }

 

  doctorAddMethod() {
    
    this.addUsers.addDoctorUser() ;
    
  }

  adminAddMethod() {
    this.addUsers.addAdminUser ;
    
  }

  nurseAddMethod() {
    this.addUsers.addNurseUser ;
    
  }
}
