import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergy } from './components/addvisitdetails/addvisitdetails.component';
import { VisitDetails } from './components/addvisitdetails/visistDetails.model';

import { AppointmentList } from './components/dashboard/dashboard.component';
import { PrescriptionList } from './components/prescription/prescription.component';
// import { VisitId } from './components/previoushealthrecords/previoushealthrecords.component';
 import { TestList } from './components/test/test.component';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  constructor(private http:HttpClient){

  }

  //get all accepted appointment frm appointment microservice
  getAllAppointment():Observable<AppointmentList[]>{
    return this.http.get<AppointmentList[]>('http://localhost:9003/api/v1/appointments?acceptance=Accepted')
  }

  //get previous appoitment history appointment service
  getPeviousAppointment(patientId: number)
  {
    return this.http.get(`http://localhost:9003/api/v1/appointment/${patientId}/previous`)
  }

  //get all appoitmnet health record  appointment service
  getPeviousAppointmentVisitHistory(appointmentId: number) {
    return this.http.get(`http://localhost:9003/api/v1/${appointmentId}/health-records`)
  }

  //for patient Info from patient table patient -info service
  getPatientbyId(patientId: number)
  {
    return this.http.get(`http://localhost:9006/api/v1/patient/${patientId}`)
  }

  //for previous appointment-test from test of patient-health-record microservice
  getAllTests(visitId: number):Observable<TestList[]> {
    return this.http.get<TestList[]>(`http://localhost:9005/patient/${visitId}/test-records`)
  }

//for previous appointment prescription health record service
  getAllPrescription(visitId: number):Observable<PrescriptionList[]> {
    return this.http.get<PrescriptionList[]>(`http://localhost:9005/api/v1/patient/${visitId}/prescription`)
  }

  //for add patient visit details from health record service
  addVisitDetails(visitDetails : VisitDetails)  : Observable<Object>{
    console.log("in service checking type of bp",typeof(visitDetails.bpSystolic));
    console.log("physicaian email",visitDetails)
    return this.http.post(`http://localhost:9005/api/v1/patient/health-records`, visitDetails);
  }

  //for getting list of allergies from allergy microservice
  getAllAllergy(): Observable<Allergy[]>{
    // console.log("",this.http.get<Allergy[]>('http://localhost:8086/allergy'));
    return this.http.get<Allergy[]>('http://localhost:9002/api/v1/allergy');
  }

  //for visit id from patient health record service
  getVisitId(appointmentId: number): Observable<Object>{
    return this.http.get(`http://localhost:9005/api/v1/patient/${appointmentId}/visitId`);
  }

   // to get the blood group of previously visited patient health record service
  getBloodGroup(patientId:number) {
    return this.http.get(`http://localhost:9005/api/v1/patient/${patientId}/bloodgroup`);
   }

   //get all appoitnment of specific doctor frm appointment microservice
   getDoctorsAppointment(physicianEmail: string,date :string) {
    return this.http.get(`http://localhost:9003/api/v1/appointment/${physicianEmail}/${date}`)
  }

  ///get all previous visit id by patient id for prescription and test health record service


  // getAllVisitId(patientId: number): Observable<VisitId[]> {
  //   return this.http
  //     .get<VisitId[]>(
  //       `http://localhost:8083/patient/${patientId}/visit-detials`
  //     )
  // }

  
}