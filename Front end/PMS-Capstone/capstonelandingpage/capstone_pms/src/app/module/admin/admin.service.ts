import { Injectable } from '@angular/core';
import { PatientData } from './components/patientinfo/patientinfo.component';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DoctorData } from './components/doctoravailability/doctoravailability.component';
import { NurseData } from './components/nurseinfo/nurseinfo.component';
import { AdminData } from './components/admininfo/admininfo.component';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public myVar: any;

 
  private apiServerDoctor = 'http://localhost:9007/api/v1';

  constructor(private http: HttpClient) {}

  // auto-refresh
  private refresh = new Subject<void>();
  get refreshNeeded() {
    return this.refresh;
  }

  public getPatients(): Observable<PatientData[]> {
    return this.http.get<PatientData[]>('http://localhost:9006/api/v1/patient');
  }

  public getNurses(): Observable<NurseData[]> {
    return this.http.get<NurseData[]>('http://localhost:9005/api/v1/nurses');
  }

  public getAdmins(): Observable<AdminData[]> {
    return this.http.get<AdminData[]>('http://localhost:9005/api/v1/admins');
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
  public availablePhysiciansdelete(doctor: string): Observable<string[]> {
    return this.http.delete<string[]>(
      `${this.apiServerDoctor}/physician-availability/{doctor}`
    );
  }

  public setThatVar(sangeeta: string) {
    this.myVar = sangeeta;
  }

  public getThatVar() {
    return this.myVar;
  }


  public addDoctorUser(): Observable<DoctorData[]> {
    
    return this.http.get<DoctorData[]>('http://localhost:9007/api/v1/addDoctors');
  }

  addAdminUser(): Observable<DoctorData[]> {
    return this.http.get<DoctorData[]>('http://localhost:9005/api/v1/addAdmins');
  }

  addNurseUser(): Observable<DoctorData[]> {
    return this.http.get<DoctorData[]>('http://localhost:9005/api/v1/addNurses');
  }


}