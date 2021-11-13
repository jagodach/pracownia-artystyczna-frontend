import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ToDoComponent } from './to-do/to-do.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { MainComponent } from './main/main.component';
import { ParticipantService } from './adding-participants/participant.service';
import { RegistereduserComponent } from './registereduser/registereduser.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BearerAuthInterceptor } from 'src/BearerAuthInterceptor';
import { ReportMostAchievmentsComponent } from './report-most-achievments/report-most-achievments.component';
import { ReportGroupParticipantsComponent } from './report-group-participants/report-group-participants.component';
import { ReportParticipantDetailComponent } from './report-participant-detail/report-participant-detail.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    FooterComponent,
    ToDoComponent,
    GenerateReportComponent,
    MainComponent,
    RegistereduserComponent,
    ReportMostAchievmentsComponent,
    ReportGroupParticipantsComponent,
    ReportParticipantDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    ParticipantService, 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, 
    { provide: HTTP_INTERCEPTORS, useClass: BearerAuthInterceptor, multi: true },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
