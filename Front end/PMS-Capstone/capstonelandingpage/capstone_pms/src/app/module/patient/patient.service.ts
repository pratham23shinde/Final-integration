import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalenderUser } from './components/book-appointment/book_appointment.model';
// import { CalenderUser } from './components/book-appointment/book_appointment.model';
import { Login } from './components/login/login.component';
import { AllAppointments, AppointmentDetails, TestList, VisitId } from './components/observations/observations.component';
import { User } from './components/register/register.component';
import { PrescriptionList } from './components/viewprescription/viewprescription.component';
// import { AllAppointments, AppointmentDetails, TestList, VisitId } from './components/observations/observations.component';
// import { AppointmentList } from './components/previous-appointemt/previous-appointemt.component';
// import { User } from './components/register/register.component';
// import { PrescriptionList } from './components/viewprescription/viewprescription.component';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  public addUser(user: User): Observable<Object> {
    return this.httpClient.post(`http://localhost:9004/api/v1/patient/register`, user);
  }

  public loginUserFromRemote(login: Login): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:9004/api/v1/patient/login',
      login
    );
  }

  getAppointmentByPatient(patientId: number): Observable<any> {
    return this.httpClient.get(
      `http://localhost:9003/api/v1/patient/${patientId}/appointments`
    );
  }

  public getPatientbyId(patientId: number) {
    return this.httpClient.get('http://localhost:9006/api/v1/patient/' + patientId);
  }

  getAllTests(visitId: number):Observable<TestList[]> {
    return this.httpClient.get<TestList[]>(`http://localhost:9005/api/v1/patient/${visitId}/test-records`)
  }

  getAllVisitId(patientId : number):Observable<VisitId[]>{
    return this.httpClient.get<VisitId[]>(`http://localhost:9005/api/v1/patient/${patientId}/visitId`)
  }

  // public updateUser(user : User,patientId : number)  : Observable<Object>{

  //   return this.httpClient.post(`http://localhost:8089/patient/${patientId}`, user);
  // }

  private url = 'http://localhost:8081/appointments?acceptance=Accepted';

  // getAllAppointment():Observable<AppointmentList[]>{
  //   return this.httpClient.get<AppointmentList[]>(this.url)
  // }

  getPeviousAppointment(patientId: number) {
    return this.httpClient.get(
      `http://localhost:9003/api/v1/appointment/${patientId}/previous`
    );
  }

  getPeviousAppointmentVisitHistory(appointmentId: number) {
    return this.httpClient.get(
      `http://localhost:9005/api/v1/patient/${appointmentId}/health-records`
    );
  }



  // getAllPrescription(visitId: number):Observable<PrescriptionList[]> {
  //   return this.httpClient.get<PrescriptionList[]>(`http://localhost:8083/patient/${visitId}/prescription`)
  // }

  private apiServerUrl = 'http://localhost:9003/api/v1/appointment';

  public addAppointment(calenderUser: CalenderUser): Observable<Object> {
    return this.httpClient.post(`${this.apiServerUrl}`, calenderUser);
  }

  // getAvailDoctor(){
  //   // return this.http.get('')

  // }

  getAllAppointmentByAcceptance(acceptance: string) {
    return this.httpClient.get(
      'http://localhost:9003/api/v1/appointments' + '?' + acceptance
    );
  }
 

  getAllAppointments(patientId: number): Observable<AllAppointments[]> {
    return this.httpClient.get<AllAppointments[]>(
      `http://localhost:9003/api/v1/patient/${patientId}/allappointments`
    );
  }

  getAppointmentDetails(
    appointmentId: number
  ): Observable<AppointmentDetails[]> {
    return this.httpClient.get<AppointmentDetails[]>(
      `http://localhost:9003/api/v1/appointments/${appointmentId}`
    );
  }

  getAllPrescription(visitId: number): Observable<PrescriptionList[]> {
    return this.httpClient.get<PrescriptionList[]>(
      `http://localhost:9005/api/v1/patient/${visitId}/prescription`
    );
  }
}
