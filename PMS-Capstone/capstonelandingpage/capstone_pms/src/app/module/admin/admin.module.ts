import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DefaultComponent } from './components/default/default.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UpdateavailabilityComponent } from './components/updateavailability/updateavailability.component';
import { PatientinfoComponent } from './components/patientinfo/patientinfo.component';
import { DeleteavailabilityComponent } from './components/deleteavailability/deleteavailability.component';
import { AdmininfoComponent } from './components/admininfo/admininfo.component';
import { NurseinfoComponent } from './components/nurseinfo/nurseinfo.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AdddoctorComponent } from './components/adddoctor/adddoctor.component';
import { DoctoravailabilityComponent } from './components/doctoravailability/doctoravailability.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    DashboardComponent,
    DefaultComponent,
    SidebarComponent,
    UpdateavailabilityComponent,
    PatientinfoComponent,
    DeleteavailabilityComponent,
    AdmininfoComponent,
    NurseinfoComponent,
    AdddoctorComponent,
    DoctoravailabilityComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatMenuModule,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
