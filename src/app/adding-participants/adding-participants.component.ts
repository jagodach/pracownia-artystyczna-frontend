import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ParticipantService } from './participant.service';
import { Participant } from './participant';
import { Group } from '../adding-groups/group';
import { GroupService } from '../adding-groups/group.service';
import { ParticipantDto } from './participantDto';

@Component({
  selector: 'app-adding-participants',
  templateUrl: './adding-participants.component.html',
  styleUrls: ['./adding-participants.component.css']
})
export class AddingParticipantsComponent implements OnInit {
  public participants: Participant[];
  public editParticipant: Participant;
  public deleteParticipant: Participant;
  public groups: Group[];

  constructor(private particantService: ParticipantService,
    private groupService: GroupService) {
    this.participants = [];
    this.editParticipant = {} as Participant;
    this.deleteParticipant = {} as Participant;
    this.groups = [];
  }

  ngOnInit(): void {
    this.getAllParticipant();
  }

  public getAllGroups(): void {
    this.groupService.getAllGroup().subscribe(
      (response: Group[]) => {
        this.groups = response;
        console.log(this.groups);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllParticipant(): void {
    this.particantService.getAllParticipant().subscribe(
      (response: Participant[]) => {
        this.participants = response;
        console.log(this.participants);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddParticipant(addForm: NgForm): void {
    this.particantService.addParticipant(addForm.value).subscribe(
      (response: ParticipantDto) => {
        this.getAllParticipant();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onUpdateParticipant(participant: Participant): void {
    delete participant.participantCode;
    let participantDto: ParticipantDto = participant;
    console.log(participant);
    this.particantService.updateParticipant(participant).subscribe(
      (response: ParticipantDto) => {
        console.log(response);
        this.getAllParticipant();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onDeleteParticipant(participantId: number): void {
    this.particantService.deleteParticipant(participantId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllParticipant();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchParticipants(key: string): void {
    console.log(key);
    const results: Participant[] = [];
    for (const participant of this.participants) {
      if (participant.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || participant.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || participant.group.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || participant.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(participant);
      }
    }
    this.participants = results;
    if (results.length === 0 || !key) {
      this.getAllParticipant();
    }
  }


  public onOpenModal(participant: Participant, mode: string): void {
    const container = document.getElementById(`main.container`);
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode == 'add') {
      button.setAttribute('data-target', '#addParticipantModal');
      // update list of groups
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
    if (mode == 'edit') {
      this.editParticipant = participant;
      button.setAttribute('data-target', '#updateParticipantModal');
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

    if (mode == 'delete') {
      this.deleteParticipant = participant;
      button.setAttribute('data-target', '#deleteParticipantModal');
 
    }
    container?.appendChild(button);
    button.click();
  }
}
