import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddingAchievementsComponent } from './adding-achievements/adding-achievements.component';
import { AddingGroupsComponent } from './adding-groups/adding-groups.component';
import { AddingParticipantsComponent } from './adding-participants/adding-participants.component';
import { AddingPresenceComponent } from './adding-presence/adding-presence.component';
import { AddingWorksComponent } from './adding-works/adding-works.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { PolitykaComponent } from './polityka/polityka.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegulaminComponent } from './regulamin/regulamin.component';
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
  { path: 'to-do', component: ToDoComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'participants', redirectTo: 'adding-participants', pathMatch: 'full'}
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
  ToDoComponent]