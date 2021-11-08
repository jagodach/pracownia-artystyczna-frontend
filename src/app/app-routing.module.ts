import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddingAchievementsComponent } from './adding-achievements/adding-achievements.component';
import { AddingGroupsComponent } from './adding-groups/adding-groups.component';
import { AddingParticipantsComponent } from './adding-participants/adding-participants.component';
import { AddingPresenceComponent } from './adding-presence/adding-presence.component';
import { AddingWorksComponent } from './adding-works/adding-works.component';
import { AdminComponent } from './admin/admin.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PolitykaComponent } from './polityka/polityka.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegulaminComponent } from './regulamin/regulamin.component';
import { ReportGroupParticipantsComponent } from './report-group-participants/report-group-participants.component';
import { ReportMostAchievmentsComponent } from './report-most-achievments/report-most-achievments.component';
import { ReportParticipantDetailComponent } from './report-participant-detail/report-participant-detail.component';
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoService } from './to-do/to-do.service';

const routes: Routes = [
  { path: 'adding-participants', component: AddingParticipantsComponent },
  { path: 'adding-groups', component: AddingGroupsComponent },
  { path: 'adding-achievements', component: AddingAchievementsComponent },
  { path: 'adding-works', component: AddingWorksComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'polityka', component: PolitykaComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'regulamin', component: RegulaminComponent },
  { path: 'adding-presence', component: AddingPresenceComponent },
  { path: 'to-do', component: ToDoComponent },
  {
    path: 'generate-report', component: GenerateReportComponent,
    children:
      [
        { path: 'report-most-achievements', component: ReportMostAchievmentsComponent, outlet: "report"},
        { path: 'reportsGroupParticipants', component: ReportGroupParticipantsComponent },
        { path: 'reportsParticipantDetail', component: ReportParticipantDetailComponent }
      ]
  },
  { path: 'main', component: MainComponent },
  { path: 'participants', redirectTo: 'adding-participants', pathMatch: 'full' },
  { path: 'mostachievements', redirectTo: 'report-most-achievements', pathMatch: 'full' },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddingParticipantsComponent,
  AddingGroupsComponent,
  AddingAchievementsComponent,
  AddingWorksComponent,
  AdminComponent,
  LoginComponent,
  PolitykaComponent,
  RegistrationComponent,
  RegulaminComponent,
  AddingPresenceComponent,
  ToDoComponent,
  MainComponent]