import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Group } from '../adding-groups/group';
import { GroupService } from '../adding-groups/group.service';
import { ParticipantService } from '../adding-participants/participant.service';
import { ParticipantDto } from '../adding-participants/participantDto';
import { ReportGroupService } from './report-group.service';

@Component({
  selector: 'app-report-group-participants',
  templateUrl: './report-group-participants.component.html',
  styleUrls: ['./report-group-participants.component.css']
})
export class ReportGroupParticipantsComponent implements OnInit {
  participants: ParticipantDto[];
  groups: Group[];
  selectedGroupName: string = '';

  constructor(private groupReportService: ReportGroupService,
      private groupService: GroupService) { 
    this.participants = [];
    this.groups = [];
  }

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
        alert(error.message);
      }
    );
  }

  public onGroupSelected(groupForm: NgForm){
    for (let index = 0; index < this.groups.length; index++) {
      if (this.groups[index].name == this.selectedGroupName){
        this.groupReportService.getGroupReport(this.groups[index].number).subscribe(
          (response: ParticipantDto[]) => {
            this.participants = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      
    }
  }

}
