import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  constructor(private router: Router) { }
  login(value: string) {
    sessionStorage.setItem("KEY", value)
  }

 logout(){
    sessionStorage.removeItem("KEY");
    this.router.navigateByUrl("/patient/login");
  }
  isAuthenticated(): boolean {
    let value = sessionStorage.getItem("PATIENT_EMAIL");
    console.log(value);
    
    
    
    if (value != null) {
      let key = sessionStorage.getItem("KEY")
      console.log(key);
      if (value == key)
        return true;
      else
        return false;
    }
    else
      return false;
  }}
