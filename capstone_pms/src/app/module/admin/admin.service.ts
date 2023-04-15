import { Injectable } from '@angular/core';
import { PatientData } from './components/patientinfo/patientinfo.component';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DoctorData } from './components/doctoravailability/doctoravailability.component';
import { NurseData } from './components/nurseinfo/nurseinfo.component';
import { AdminData } from './components/admininfo/admininfo.component';
import { tap } from 'rxjs/operators';
import { AddAdmin } from './components/addadmin/addadmin.component';
import { AddDoctor } from './components/adddoctor/adddoctor.component';
import { AddNurse } from './components/addnurse/addnurse.component';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  getloginDetails(email: any) {
    return this.http.get<any>(
      `http://localhost:9001/patient-health-records-service/admin/${email}`
    );
  }

  public myVar: any;

  public currentRole: any;
  private apiServerDoctor =
    'http://localhost:9001/physician-availability-service';

  constructor(private http: HttpClient) {}

  // auto-refresh
  private refresh = new Subject<void>();
  get refreshNeeded() {
    return this.refresh;
  }

  //set and roles for deletion
  public setRole(role: string) {
    this.currentRole = role;
  }
  public getRole() {
    return this.currentRole;
  }

  public getPatients(): Observable<PatientData[]> {
    return this.http.get<PatientData[]>(
      'http://localhost:9001/patient-info-service/patient'
    );
  }

  public getNurses(): Observable<NurseData[]> {
    return this.http.get<NurseData[]>(
      'http://localhost:9001/patient-health-records-service/nurses'
    );
  }

  public getAdmins(): Observable<AdminData[]> {
    return this.http.get<AdminData[]>(
      'http://localhost:9001/patient-health-records-service/admins'
    );
  }

  //Physician Availability List
  public availablePhysicians(): Observable<DoctorData[]> {
    return this.http.get<DoctorData[]>(
      `${this.apiServerDoctor}/physician-availability`
    );
  }

  //update
  public updatePhysicianAvailability(
    doctor: DoctorData
  ): Observable<DoctorData> {
    return (
      this.http
        .put<DoctorData>(
          `${this.apiServerDoctor}/physician-availability`,
          doctor
        )
        //auto-refresh
        .pipe(
          tap(() => {
            this.refresh.next();
          })
        )
    );
  }

  public availablePhysiciansUpdate(
    doctor: DoctorData
  ): Observable<DoctorData[]> {
    return this.http.put<DoctorData[]>(
      `${this.apiServerDoctor}/physician-availability`,
      doctor
    );
  }

  public deletePhysicianAvailability(doctorEmail: string): Observable<void> {
    return this.http
      .delete<void>(
        `${this.apiServerDoctor}/physician-availability/${doctorEmail}`
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  public deleteNurseDatabase(nurseEmail: string): Observable<void> {
    return this.http
      .delete<void>(
        `http://localhost:9001/patient-health-records-service/deleteNurse/${nurseEmail}`
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  public deleteAdminFromDatabase(adminEmail: string): Observable<void> {
    return this.http
      .delete<void>(
        `http://localhost:9001/patient-health-records-service/deleteAdmin/${adminEmail}`
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  public deleteDoctor(doctorEmail: string): Observable<void> {
    return this.http
      .delete<void>(
        `http://localhost:9001/auth0-service/deleteUser/${doctorEmail}`
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  public deleteNurse(nurseEmail: string): Observable<void> {
    return this.http
      .delete<void>(
        `http://localhost:9001/auth0-service/deleteUser/${nurseEmail}`
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  public deleteAdmin(adminEmail: string): Observable<void> {
    return this.http
      .delete<void>(
        `http://localhost:9001/auth0-service/deleteUser/${adminEmail}`
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  addPhysicianService(adddoc: AddDoctor): Observable<Object> {
    console.log('service data: ', adddoc);
    return this.http.post(
      `http://localhost:9001/auth0-service/addUser`,
      adddoc
    );
  }

  addAdminService(addadmin: AddAdmin): Observable<Object> {
    return this.http.post(
      `http://localhost:9001/auth0-service/addUser`,
      addadmin
    );
  }

  addNurseService(addnurse: AddNurse): Observable<Object> {
    return this.http.post(
      `http://localhost:9001/auth0-service/addUser`,
      addnurse
    );
  }

  // public availablePhysiciansdelete(doctor: string): Observable<string[]> {
  //   return this.http.delete<string[]>(
  //     `${this.apiServerDoctor}/physician-availability/{doctor}`
  //   );
  // }

  public setThatVar(sangeeta: string) {
    this.myVar = sangeeta;
  }

  public getThatVar() {
    return this.myVar;
  }

  public addDoctorUser(): Observable<DoctorData[]> {
    return this.http
      .get<DoctorData[]>(
        'http://localhost:9001/physician-availability-service/addDoctors'
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  addAdminUser(): Observable<DoctorData[]> {
    return this.http
      .get<DoctorData[]>(
        'http://localhost:9001/patient-health-records-service/addAdmins'
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  addNurseUser(): Observable<DoctorData[]> {
    return this.http
      .get<DoctorData[]>(
        'http://localhost:9001/patient-health-records-service/addNurses'
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  //Sangeeta
  public getAppointmentCount(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:9001/appointment-service/appointmentCount'
    );
  }

  public getDoctorCount(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:9001/physician-availability-service/doctorCount'
    );
  }

  public getPatientCount(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:9001/patient-info-service/patientCount'
    );
  }

  public getNurseCount(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:9001/patient-health-records-service/nurseCount'
    );
  }
}
