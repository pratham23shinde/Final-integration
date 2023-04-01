import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergy } from './components/addvisitdetails/addvisitdetails.component';
import { VisitDetails } from './components/addvisitdetails/visistDetails.model';

import { AppointmentList } from './components/dashboard/dashboard.component';
import { PhysicianDetailsList } from './components/doctors/doctors.component';
import { PrescriptionList } from './components/prescription/prescription.component';
import { AppointmentDetails, VisitId } from './components/previoushealthrecords/previoushealthrecords.component';
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
    return this.http.get<AppointmentList[]>('http://localhost:9001/appointment-service/appointments?acceptance=Accepted')
  }

  //get previous appoitment history appointment service
  getPeviousAppointment(patientId: number)
  {
    return this.http.get(`http://localhost:9001/appointment-service/appointment/${patientId}/previous`)
  }

  //get all appoitmnet health record  appointment service
  getPeviousAppointmentVisitHistory(appointmentId: number) {
    return this.http.get(`http://localhost:9001/appointment-service/${appointmentId}/health-records`)
  }

  //for patient Info from patient table patient -info service
  getPatientbyId(patientId: number)
  {
    return this.http.get(`http://localhost:9001/patient-info-service/patient/${patientId}`)
  }

  //for previous appointment-test from test of patient-health-record microservice
  getAllTests(visitId: number):Observable<TestList[]> {
    return this.http.get<TestList[]>(`http://localhost:9001/patient-health-records-service/patient/${visitId}/test-records`)
  }

//for previous appointment prescription health record service
  getAllPrescription(visitId: number):Observable<PrescriptionList[]> {
    return this.http.get<PrescriptionList[]>(`http://localhost:9001/patient-health-records-service/patient/${visitId}/prescription`)
  }

  //for add patient visit details from health record service
  addVisitDetails(visitDetails : VisitDetails)  : Observable<Object>{
    console.log("in service checking type of bp",typeof(visitDetails.bpSystolic));
    console.log("physicaian email",visitDetails)
    return this.http.post(`http://localhost:9001/patient-health-records-service/patient/health-records`, visitDetails);
  }

  //for getting list of allergies from allergy microservice
  getAllAllergy(): Observable<Allergy[]>{
    // console.log("",this.http.get<Allergy[]>('http://localhost:8086/allergy'));
    return this.http.get<Allergy[]>('http://localhost:9001/allergy-service/allergyList');
  }

  //for visit id from patient health record service
  getVisitId(appointmentId: number): Observable<Object>{
    return this.http.get(`http://localhost:9001/patient-health-records-service/patient/visitDetails/${appointmentId}`);
  }

   // to get the blood group of previously visited patient health record service
  getBloodGroup(patientId:number) {
    return this.http.get(`http://localhost:9001/patient-health-records-service/patient/${patientId}/bloodgroup`);
   }

   //get all appoitnment of specific doctor frm appointment microservice
   getDoctorsAppointment(physicianEmail: string,date :string) {
    return this.http.get(`http://localhost:9001/appointment-service/appointment/${physicianEmail}/${date}`);
  }

  ///get all previous visit id by patient id for prescription and test health record service
  getAllVisitId(patientId: number): Observable<VisitId[]> {
    return this.http
      .get<VisitId[]>(
        `http://localhost:9001/patient-health-records-service/patient/${patientId}/visitId`
      );
  }
  //akash
  getAppointmentHistoryDetailsById(patientId: any) {
    return this.http.get(
      `http://localhost:9001/appointment-service/appointment/${patientId}/previous`
    );
  }
//munmun
getAppointmentDetails(
  appointmentId: number
): Observable<AppointmentDetails[]> {
  return this.http.get<AppointmentDetails[]>(
    `http://localhost:9001/appointment-service/appointments/${appointmentId}`
  );
}
//get appoitment by date
getTodaysAppointment(date:string,acceptance:string){
  return this.http.get(`http://localhost:9001/appointment-service/appointment/nurse/${date}?acceptance=Accepted`);
}
/// get visit details by visit id
getVisitDetails(VisitId:number):Observable<VisitDetails[]>{
  return this.http.get<VisitDetails[]>(
    `http://localhost:9001/patient-health-records-service/patient/${VisitId}/visit-details`
  )
}
//nurseifo by email id
getNurseDetailsByEmail(email:String){
  return this.http.get(`http://localhost:9001/patient-health-records-service/nursedetails/${email}`);
}
//physician info list
getAllDoctors():Observable<PhysicianDetailsList[]>{
  return this.http.get<PhysicianDetailsList[]>(`http://localhost:9001/physician-availability-service/physician-availability`);
}
  
}