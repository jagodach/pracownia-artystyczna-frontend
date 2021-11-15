import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AchievementService } from '../adding-achievements/achievement.service';
import { AchievementDto } from '../adding-achievements/achievementDto';
import { Group } from '../adding-groups/group';
import { GroupService } from '../adding-groups/group.service';
import { ParticipantService } from '../adding-participants/participant.service';
import { ParticipantDto } from '../adding-participants/participantDto';
import { PresenceService } from '../adding-presence/presence.service';
import { PresenceDto } from '../adding-presence/presenceDto';
import { WorkService } from '../adding-works/work.service';
import { WorkDto } from '../adding-works/workDto';
import { ReportGroupService } from '../report-group-participants/report-group.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-participant-detail',
  templateUrl: './report-participant-detail.component.html',
  styleUrls: ['./report-participant-detail.component.css']
})
export class ReportParticipantDetailComponent implements OnInit {
  groups: Group[] = [];
  selectedGroupName: string = '';
  selectedParticipant: string = '';
  filteredParticipants: ParticipantDto[] = [];
  participants: ParticipantDto[] = [];

  participantAchievements: AchievementDto[] = [];
  participantWorks: WorkDto[] = [];
  participantPresences: PresenceDto[] = [];

  constructor(private groupReportService: ReportGroupService,
    private groupService: GroupService, 
    private participantService: ParticipantService,
    private workService: WorkService,
    private presenceService: PresenceService,
    private achievemntService: AchievementService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.groupService.getAllGroup().subscribe(
      (response: Group[]) => {
        this.groups = response;
        const list = document.getElementById('groups');
        for (let index = 0; index < this.groups.length; index++) {
          let option = document.createElement('option');
          option.value = this.groups[index].name;
          list?.appendChild(option);
        }
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Błąd', {
          progressBar : true
        });
      }
    );

    this.participantService.getAllParticipant().subscribe(
      (response: ParticipantDto[]) => {
        this.participants = response;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Błąd', {
          progressBar : true
        });
      }
    );
  }

  public filterParticipants(){
    var group: Group = {} as Group;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].name == this.selectedGroupName){
        group = this.groups[i];
      }
    }
    const list = document.getElementById('participants');
    while (list?.firstChild) {
      list?.removeChild(list?.firstChild);
    }
    for (let i = 0; i < this.participants.length; i++) {
      const element = this.participants[i];
      if (element.group == group.name){
        this.filteredParticipants.push(this.participants[i]);
          let option = document.createElement('option');
          option.value = this.participants[i].name;
          list?.appendChild(option);
      }
    }
  }

  public generateReport(){
    let participantId: string = '';
    for (let i = 0; i < this.participants.length; i++) {
      if (this.participants[i].name == this.selectedParticipant){
        participantId = this.participants[i].id.toString();
        break;
      }
    }

    this.achievemntService.getAchievementsByParticipantId(participantId).subscribe(
      (response: AchievementDto[]) => {
        this.participantAchievements = response;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Nie udało się wygenerować raportu', {
          progressBar : true
        });
      }
    )

    this.presenceService.getPresencesByParticipantId(participantId).subscribe(
      (response: PresenceDto[]) => {
        this.participantPresences = response;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Błąd', {
          progressBar : true
        });
      }
    )

    this.workService.getWorksByParticipantId(participantId).subscribe(
      (response: WorkDto[]) => {
        this.participantWorks = response;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Błąd', {
          progressBar : true
        });
      }
    )
  }
}
