import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalenderUser } from './components/book-appointment/book_appointment.model';
// import { CalenderUser } from './components/book-appointment/book_appointment.model';
import { Login } from './components/login/login.component';
import {
  AllAppointments,
  AppointmentDetails,
  TestList,
  VisitDetails,
  VisitId,
} from './components/observations/observations.component';
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
    return this.httpClient.post(
      `http://localhost:9001/authentication-service/patient/register`,
      user
    );
  }

  public loginUserFromRemote(login: Login): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:9001/authentication-service/patient/login',
      login
    );
  }

  getAppointmentByPatient(patientId: number): Observable<any> {
    return this.httpClient.get(
      `http://localhost:9001/appointment-service/patient/${patientId}/appointments`
    );
  }

  public getPatientbyId(patientId: number) {
    return this.httpClient.get(
      'http://localhost:9001/patient-info-service/patient/' + patientId
    );
  }

  getAllTests(visitId: number): Observable<TestList[]> {
    return this.httpClient.get<TestList[]>(
      `http://localhost:9001/patient-health-records-service/patient/${visitId}/test-records`
    );
  }

  getAllVisitId(patientId: number): Observable<VisitId[]> {
    return this.httpClient.get<VisitId[]>(
      `http://localhost:9001/patient-health-records-service/patient/${patientId}/visitId`
    );
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
      `http://localhost:9001/appointment-service/appointment/${patientId}/previous`
    );
  }

  getPeviousAppointmentVisitHistory(appointmentId: number) {
    return this.httpClient.get(
      `http://localhost:9001/patient-health-records-service/patient/${appointmentId}/health-records`
    );
  }

  // getAllPrescription(visitId: number):Observable<PrescriptionList[]> {
  //   return this.httpClient.get<PrescriptionList[]>(`http://localhost:8083/patient/${visitId}/prescription`)
  // }

  private apiServerUrl = 'http://localhost:9001/appointment-service/appointment';

  public addAppointment(calenderUser: CalenderUser): Observable<Object> {
    return this.httpClient.post(`${this.apiServerUrl}`, calenderUser);
  }

  // getAvailDoctor(){
  //   // return this.http.get('')

  // }

  getAllAppointmentByAcceptance(acceptance: string) {
    return this.httpClient.get(
      'http://localhost:9001/appointment-service/appointments' + '?' + acceptance
    );
  }

  getAllAppointments(patientId: number): Observable<AllAppointments[]> {
    return this.httpClient.get<AllAppointments[]>(
      `http://localhost:9001/appointment-service/patient/${patientId}/allappointments`
    );
  }

  getAppointmentDetails(
    appointmentId: number
  ): Observable<AppointmentDetails[]> {
    return this.httpClient.get<AppointmentDetails[]>(
      `http://localhost:9001/appointment-service/appointments/${appointmentId}`
    );
  }

  getAllPrescription(visitId: number): Observable<PrescriptionList[]> {
    return this.httpClient.get<PrescriptionList[]>(
      `http://localhost:9001/patient-health-records-service/patient/${visitId}/prescription`
    );
  }

  // getAppointmentHistoryDetailsById() {
  //   return this.httpClient.get(`http://localhost:9003/api/v1/appointment/${patientId}/previous`);
  // }
  getAppointmentHistoryDetailsById(patientId :any){
    return this.httpClient.get(`http://localhost:9001/appointment-service/appointment/${patientId}/previous`);
  }

  getVisitDetails(VisitId:number):Observable<VisitDetails[]>{
    return this.httpClient.get<VisitDetails[]>(
      `http://localhost:9001/patient-health-records-service/patient/${VisitId}/visit-details`
    )
  }
}
