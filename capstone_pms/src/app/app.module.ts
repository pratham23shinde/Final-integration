import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './components/index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HerosectionComponent } from './components/content/herosection/herosection.component';
import { BelowherocardComponent } from './components/content/belowherocard/belowherocard.component';
import { DoctorcardComponent } from './components/content/doctorcard/doctorcard.component';
import { AssoicatecardComponent } from './components/content/assoicatecard/assoicatecard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe, CommonModule } from '@angular/common';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { AfterauthComponent } from './components/afterauth/afterauth.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    HerosectionComponent,
    BelowherocardComponent,
    DoctorcardComponent,
    AssoicatecardComponent,
    AfterauthComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    AuthModule.forRoot({
      domain: 'dev-qnzlgih035ihuldo.us.auth0.com',
      clientId: 'eucj2gD7k3QWF1B5zTC3w1PJMeQ3j1bM',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  //datepipe-sangeeta
  providers: [
    DatePipe,
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
  ],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
