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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
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
