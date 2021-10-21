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
  providers: [ParticipantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
