import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentHistoryComponent } from './components/appointment-history/appointment-history.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DefaultComponent } from './components/default/default.component';
import { DeleteComponent } from './components/delete/delete.component';
import { HealthInfoComponent } from './components/health-info/health-info.component';
import { LoginComponent } from './components/login/login.component';
import { ObservationsComponent } from './components/observations/observations.component';
import { OutComponent } from './components/out/out.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { PreviousAppointmentComponent } from './components/previous-appointment/previous-appointment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ViewprescriptionComponent } from './components/viewprescription/viewprescription.component';
import { PatientRoutingModule } from './patient-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

const material = [
  MatCardModule,
  FormsModule,
  MatFormFieldModule,
  MatNativeDateModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule
];

@NgModule({
  declarations: [
    AppointmentHistoryComponent,
    BookAppointmentComponent,
    DashboardComponent,
    DefaultComponent,
    DeleteComponent,
    HealthInfoComponent,
    LoginComponent,
    ObservationsComponent,
    OutComponent,
    PatientInfoComponent,
    PreviousAppointmentComponent,
    ProfileComponent,
    RegisterComponent,
    UpdateProfileComponent,
    ViewprescriptionComponent
  
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    material
  ]
})
export class PatientModule { }
