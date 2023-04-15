import { Test } from './components/newobservation/newobservation.component';
import { Prescription } from './components/enterprescription/enterprescription.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs';
import {
  AppointmentDetails,
  TestList,
  VisitId,
} from '../patient/components/observations/observations.component';
// import { EmailData } from './components/pendingappointment/pendingappointment.component';

@Injectable({
  providedIn: 'root',
})
export class PhysicianService {
  constructor(private http: HttpClient) {}

  //Todays accepted appointment
  getTodaysAppointment(
    physicianEmail: string,
    date: string,
    acceptance: string
  ) {
    return this.http.get(
      'http://localhost:9001/appointment-service/appointment/' +
        physicianEmail +
        '/' +
        date +
        '?' +
        acceptance
    );
  }

  //All pending appointments
  getPendingAppointments(physicianEmail: string, acceptance: string) {
    return this.http.get(
      'http://localhost:9001/appointment-service/appointment/' +
        physicianEmail +
        '?' +
        acceptance
    );
  }

  //Auto Referesh
  private refresh = new Subject<void>();
  get refreshNeeded() {
    return this.refresh;
  }

  //accepted appointment
  acceptappointment(appointmentId: number, acceptance: String) {
    return this.http.put(
      'http://localhost:9001/appointment-service/appointments/' +
        appointmentId +
        '/' +
        acceptance,
      ''
    );
  }
  rejectAppointment(appointmentId: any, acceptance: string) {
    return this.http
      .put(
        'http://localhost:9001/appointment-service/rejectedappointments/' +
          appointmentId +
          '/' +
          acceptance,
        ''
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  //get all visit detials by patient id
  getvisitdetailsbyid(appointmentId: any) {
    return this.http.get(
      `http://localhost:9001/patient-health-records-service/patient/health-records/${appointmentId}`
    );
  }

  //Get visit history details by id
  getAppointmentHistoryDetailsById(patientId: any) {
    return this.http.get(
      `http://localhost:9001/appointment-service/appointment/${patientId}/previous`
    );
  }

  // prvious visit record detials by patient id
  // by this query Select * from visit_details  where patient_id=:id order by visit_id desc limit 1,1
  // getPreviousVisistRecordsByPatientId(patientId: any) {
  //   return this.http.get(
  //     `http://localhost:9005/api/v1/patient/Previous-visitDetails-records-for-history/${patientId}`
  //   );
  // }

  // getallTest() {
  //   return this.http.get('http://localhost:9005/api/v1/tests').pipe(
  //     tap(() => {
  //       this.refresh.next();
  //     })
  //   );
  // }

  // getallPatient() {
  //   return this.http.get('http://localhost:9006/api/v1/patient');
  // }

  getallPrescriptionbyvisitiddata(visitId: any) {
    return this.http.get(
      `http://localhost:9001/patient-health-records-service/prescription/${visitId}`
    );
  }

  getPatientbyId(patientId: number) {
    return this.http.get(
      `http://localhost:9001/patient-info-service/patient/${patientId}`
    );
  }

  // enterePrescriptionFormData(data: any) {
  //   return this.http.post('http://localhost:9005/api/v1/prescription', data);
  // }

  addPrescription(prescription: Prescription, visitId: any) {
    prescription.visitId = visitId;
    return this.http.post(
      'http://localhost:9001/patient-health-records-service/patient/prescription',
      prescription
    );
  }

  addObservation(test: Test, visitId: any) {
    test.visitId = visitId;
    return this.http
      .post(
        'http://localhost:9001/patient-health-records-service/savetest',
        test
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  deletetest(testId: any) {
    console.log(testId);
    return this.http
      .delete(
        `http://localhost:9001/patient-health-records-service/tests/${testId}`
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  getPrevTests(visitId: any) {
    return this.http.get(
      `http://localhost:9001/patient-health-records-service/patient/${visitId}/test-records`
    );
  }

  //privious prescription in history component
  getPreviousPrescriptionRecordsByVisitId(visitId: any) {
    return this.http.get(
      `http://localhost:9001/patient-health-records-service/prescription/${visitId}`
    );
  }

  // Update test by test id
  // testId: any;
  // updateTest(test: Test, testId: any) {
  //   return this.http.put(
  //     `http://localhost:9005/api/v1/updateTest/${testId}` + Test,
  //     ''
  //   );
  // }

  //delete prescription by
  deletePrescription(prescriptionId: any) {
    return this.http.delete(
      `http://localhost:9001/patient-health-records-service/deletePrescription/${prescriptionId}`
    );
  }

  public oldvisitid: any;
  public setOldVisitId(visitid: number) {
    this.oldvisitid = visitid;
  }

  public getOldVisitId() {
    return this.oldvisitid;
  }

  // get all current user info
  physicianEmail: any = sessionStorage.getItem('currentUserEmail');
  getAllPhysicianInfo(physicianEmail: any) {
    return this.http.get(
      `http://localhost:9001/physician-availability-service/doctorInfo/${physicianEmail}`
    );
  }
  public myvar: any;
  public setvisitid(visitid: any) {
    this.myvar = visitid;
  }

  public getvisitid() {
    return this.myvar;
  }

  //new added
  getAllVisitId(patientId: number): Observable<VisitId[]> {
    return this.http.get<VisitId[]>(
      `http://localhost:9001/patient-health-records-service/patient/${patientId}/visitId`
    );
  }
  // http://localhost:9005/api/v1/patient/${patientId}/visitId

  getAppointmentDetails(
    appointmentId: number
  ): Observable<AppointmentDetails[]> {
    return this.http.get<AppointmentDetails[]>(
      `http://localhost:9001/appointment-service/appointments/${appointmentId}`
    );
  }

  getAllTests(visitId: number): Observable<TestList[]> {
    return this.http.get<TestList[]>(
      `http://localhost:9001/patient-health-records-service/patient/${visitId}/test-records`
    );
  }
  //Accepted appointment Email
  //http://localhost:9001/SMTP-mailService-service/sendemail
  appointmentEmail(email: any) {
    console.log(email);
    return this.http.post(
      'http://localhost:9001/SMTP-mailService-service/sendemail',
      email
    );
  }
}
