import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AfterauthComponent } from './components/afterauth/afterauth.component';
import { HerosectionComponent } from './components/content/herosection/herosection.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { PatientAuthGuard } from './patient-auth.guard';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    // redirectTo: '/index',
    // pathMatch: 'full',
  },
  {
    path: 'index',
    component: IndexComponent,
  },

  {
    path: 'herosection',
    component: HerosectionComponent,
  },
  {
    path: 'physician',
    loadChildren: () =>
      import('./module/physician/physician.module').then(
        (m) => m.PhysicianModule
      ), canActivate:[AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./module/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./module/patient/patient.module').then((m) => m.PatientModule), },
  {
    path: 'nurse',
    loadChildren: () =>
      import('./module/nurse/nurse.module').then((m) => m.NurseModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
