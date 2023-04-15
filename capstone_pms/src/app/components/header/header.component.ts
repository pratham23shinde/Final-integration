import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isCollapsed = true;
  email: any;
 

  constructor(
    private router:Router,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(result=>{
      console.log(result);
      if (result?.['role'][0] == 'Doctor'){
        this.email = result.email;
        console.log("Doctor");
        sessionStorage.setItem("physician_email", this.email);
        this.router.navigateByUrl("/physician")
      }
      else if (result?.['role'][0] == 'Admin'){
        this.router.navigateByUrl("/admin")
      }
      else if(result?.['role'] == 'Nurse'){
        this.router.navigateByUrl("/nurse")
      }
    })
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  // logout() {
  //   this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  // }
}
