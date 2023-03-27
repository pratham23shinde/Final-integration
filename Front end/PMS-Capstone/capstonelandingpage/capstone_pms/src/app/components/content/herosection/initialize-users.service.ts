import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitializeUsersService {
  constructor(private http: HttpClient) {}

  addDoctorUser() {
    console.log('In service');
    console.log('Work');
    this.http.get('http://localhost:9007/api/v1/addDoctors');
    
  }

  addAdminUser() {
    this.http.get('http://localhost:9007/api/v1/addAdmins');
  }

  addNurseUser() {
    this.http.get('http://localhost:9007/api/v1/addNurses');
  }
}
