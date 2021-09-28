import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParticipantService } from './participant.service';
import { PolitykaComponent } from './polityka/polityka.component';
import { RegulaminComponent } from './regulamin/regulamin.component';
import { AdminComponent } from './admin/admin.component';
import { AddingParticipantsComponent } from './adding-participants/adding-participants.component';
import { AddingGroupsComponent } from './adding-groups/adding-groups.component';
import { AddingAchievementsComponent } from './adding-achievements/adding-achievements.component';
import { AddingWorksComponent } from './adding-works/adding-works.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddingPresenceComponent } from './adding-presence/adding-presence.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
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
