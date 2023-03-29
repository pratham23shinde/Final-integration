import { PatientComponent } from './components/patient/patient.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '../nurse/components/default/default.component';
import { DashboardComponent } from '../nurse/components/dashboard/dashboard.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NurseprofileComponent } from './components/nurseprofile/nurseprofile.component';
import { PrevioushealthrecordsComponent } from './components/previoushealthrecords/previoushealthrecords.component';

const routes: Routes = [
{
  path: '',
  component: DefaultComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: '/nurse/dashboard',
      pathMatch: 'full',
    },
    {
      path: 'patient-info',
      component: PatientComponent,
    },
    {
      path: 'doctors',
      component: DoctorsComponent,
    },
    {
      path: 'notification',
      component: NotificationComponent,
    },
    {
      path: 'profile',
      component: NurseprofileComponent,
    },
    {
      path: 'doctor/appointments',
      component: NurseprofileComponent,
    },
    {
      path: 'healthrecords',
      component: PrevioushealthrecordsComponent,
    }

  ]

}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }