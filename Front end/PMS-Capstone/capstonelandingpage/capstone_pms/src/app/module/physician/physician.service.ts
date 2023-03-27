import { Test } from './components/newobservation/newobservation.component';
import { Prescription } from './components/enterprescription/enterprescription.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {

  constructor(private http:HttpClient) { }

  //Todays accepted appointment
  getTodaysAppointment(physicianEmail:string,date:string,acceptance:string){
    return this.http.get("http://localhost:9003/api/v1/appointment/"+physicianEmail+"/"+date + "?" +acceptance)
  }

  //All pending appointments
  getPendingAppointments(physicianEmail:string, acceptance:string){
    return this.http.get("http://localhost:9003/api/v1/appointment/"+physicianEmail+"?"+acceptance)
  }

   //Auto Referesh
   private refresh = new Subject<void>();
   get refreshNeeded() {
     return this.refresh;
   }
 
  //  //Todays accepted appointment
  //  getTodaysAppointment(
  //    physicianEmail: string,
  //    date: string,
  //    acceptance: string
  //  ) {
  //    return this.http.get(
  //      'http://localhost:8081/appointment/' +
  //        physicianEmail +
  //        '/' +
  //        date +
  //        '?' +
  //        acceptance
  //    );
  //  }
 
     //accepted appointment
     acceptappointment(appointmentId: number, acceptance: String) {
      return this.http.put(
        'http://localhost:9003/api/v1/appointments/' + appointmentId + '/' + acceptance,
        ''
      );
    }
   rejectAppointment(appointmentId: any, acceptance: string) {
     return this.http
       .put(
         'http://localhost:9003/api/v1/rejectedappointments/' +
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
 
   //All pending appointments
  //  getPendingAppointments(physicianEmail: string, acceptance: string) {
  //    return this.http.get(
  //      'http://localhost:8081/appointment/' + physicianEmail + '?' + acceptance
  //    );
  //  }
 
   //get all visit detials by patient id
   getvisitdetailsbyid(appointmentId: any) {
     return this.http.get(
       `http://localhost:9005/api/v1/patient/health-records/${appointmentId}`
     );
   }
 
   //Get visit history details by id
   getAppointmentHistoryDetailsById(patientId: any) {
     return this.http.get(
       `http://localhost:9003/api/v1/appointment/${patientId}/previous`
     );
   }
 
   // prvious visit record detials by patient id
   getPreviousVisistRecordsByPatientId(patientId: any) {
     return this.http.get(
       `http://localhost:9005/api/v1/patient/Previous-visitDetails-records/${patientId}`
     );
   }
 
   getallTest() {
     return this.http.get('http://localhost:9005/api/v1/tests').pipe(
       tap(() => {
         this.refresh.next();
       })
     );
   }
 
   getallPatient() {
     return this.http.get('http://localhost:9006/api/v1/patient');
   }
 
   getallPrescriptionbyvisitiddata(visitId: any) {
     return this.http.get(`http://localhost:9005/api/v1/prescription/${visitId}`);
   }
 
   getPatientbyId(patientId: number) {
     return this.http.get(`http://localhost:9006/api/v1/patientinfobyid/${patientId}`);
   }
 
   enterePrescriptionFormData(data: any) {
     return this.http.post('http://localhost:9005/api/v1/prescription', data);
   }
 
   addPrescription(prescription: Prescription, visitId: any) {
     prescription.visitId = visitId;
     return this.http.post(
       'http://localhost:9005/api/v1/patient/prescription',
       prescription
     );
   }
 
   addObservation(test: Test, visitId: any) {
     test.visitId = visitId;
     return this.http.post('http://localhost:9005/api/v1/savetest', test).pipe(
       tap(() => {
         this.refresh.next();
       })
     );
   }
 
   deletetest(testId: any) {
     console.log(testId);
     return this.http.delete(`http://localhost:9005/api/v1/tests/${testId}`).pipe(
       tap(() => {
         this.refresh.next();
       })
     );
   }
 
   getPrevTests(visitId: any) {
     return this.http.get(`http://localhost:9005/api/v1/patient/${visitId}/test-records`);
   }
 
   //privious prescription in history component
   getPreviousPrescriptionRecordsByVisitId(visitId: any) {
     //localhost:8082/prescription/16
     return this.http.get(`http://localhost:9005/api/v1/prescription/${visitId}`);
   }

   public myvar: any;
   public setvisitid(visitid: any) {
     this.myvar = visitid;
   }
 
   public getvisitid() {
     return this.myvar;
   }
 
   public oldvisitid: any;
   public setOldVisitId(visitid: number) {
     this.oldvisitid = visitid;
   }
 
   public getOldVisitId() {
     console.log('ssssssssssssss', this.oldvisitid);
     return this.oldvisitid;
   }
 }


