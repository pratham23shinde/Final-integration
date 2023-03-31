import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddvisitdetailsComponent } from './components/addvisitdetails/addvisitdetails.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorappointmentsComponent } from './components/doctorappointments/doctorappointments.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { LogoutdialogComponent } from './components/logoutdialog/logoutdialog.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NurseprofileComponent } from './components/nurseprofile/nurseprofile.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientinfoComponent } from './components/patientinfo/patientinfo.component';
import { PreviousappointmentComponent } from './components/previousappointment/previousappointment.component';
import { PrevioushealthrecordsComponent } from './components/previoushealthrecords/previoushealthrecords.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TestComponent } from './components/test/test.component';
import { DefaultComponent } from './components/default/default.component';
import { NurseRoutingModule } from './nurse-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AddvisitdetailsComponent,
    DashboardComponent,
    DoctorappointmentsComponent,
    DoctorsComponent,
    ExpandableComponent,
    LogoutdialogComponent,
    NotificationComponent,
    NurseprofileComponent,
    PatientComponent,
    PatientinfoComponent,
    PreviousappointmentComponent,
    PrevioushealthrecordsComponent,
    SidebarComponent,
    SnackbarComponent,
    TestComponent,
    DefaultComponent,
    PrescriptionComponent,
  ],
  imports: [
    CommonModule,
    NurseRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    FormsModule,
    MatOptionModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class NurseModule {}
