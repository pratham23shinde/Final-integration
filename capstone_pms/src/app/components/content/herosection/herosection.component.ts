import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AdminService } from 'src/app/module/admin/admin.service';

@Component({
  selector: 'app-herosection',
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.scss'],
})
export class HerosectionComponent {
  profileJson: string = 'none';
  ShowRole = false;
  roleOfUSer: any;
  emaildOfUser: any;
  currentUserEmail: any;
  constructor(public auth: AuthService, private addUsers: AdminService) {}
  index = 0;
  ngOnInit() {
    this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.stringify(profile, null, 2);
      this.currentUserEmail = profile?.email;
      sessionStorage.setItem('currentUserEmail', this.currentUserEmail);

      let i = 0;
      for (i = 0; i < this.profileJson.length; i++) {
        if (this.profileJson[i] == '[') {
          this.index = i;
          break;
        }
      }
      this.index = this.index + 7;

      if (this.index > 8) {
        if (this.profileJson[this.index] == 'A') {
          this.adminAddMethod();
          this.doctorAddMethod();
          this.nurseAddMethod();
        } else if (this.profileJson[this.index] == 'D') {
          this.doctorAddMethod();
        } else if (this.profileJson[this.index] == 'N') {
          this.doctorAddMethod();
          this.nurseAddMethod();
        }
      }
    });
  }

  getRole() {
    this.ShowRole = !this.ShowRole;
  }

  public doctorAddMethod(): void {
    this.addUsers.addDoctorUser().subscribe();
  }

  adminAddMethod(): void {
    this.addUsers.addAdminUser().subscribe();
  }

  nurseAddMethod(): void {
    this.addUsers.addNurseUser().subscribe();
  }
}
