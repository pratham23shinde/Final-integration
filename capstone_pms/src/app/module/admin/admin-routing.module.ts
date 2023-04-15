import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctoravailabilityComponent } from './components/doctoravailability/doctoravailability.component';
import { PatientinfoComponent } from './components/patientinfo/patientinfo.component';
import { AdmininfoComponent } from './components/admininfo/admininfo.component';
import { NurseinfoComponent } from './components/nurseinfo/nurseinfo.component';
import { DoctorinfoComponent } from './components/doctorinfo/doctorinfo.component';

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
        redirectTo: '/admin/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'doctor-availability',
        component: DoctoravailabilityComponent,
      },
      {
        path: 'nurse-info',
        component: NurseinfoComponent,
      },
      {
        path: 'patient-info',
        component: PatientinfoComponent,
      },
      {
        path: 'admin-info',
        component: AdmininfoComponent,
      },
      {
        path: 'doctor-info',
        component: DoctorinfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
