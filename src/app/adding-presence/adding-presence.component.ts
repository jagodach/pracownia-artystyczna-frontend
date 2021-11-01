import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Participant } from '../adding-participants/participant';
import { Presence } from './presence';
import { PresenceService } from './presence.service';
import { PresenceDto } from './presenceDto';
import { ParticipantService } from '../adding-participants/participant.service';

@Component({
  selector: 'app-adding-presence',
  templateUrl: './adding-presence.component.html',
  styleUrls: ['./adding-presence.component.css']
})
export class AddingPresenceComponent implements OnInit {
  public presences: Presence[];
  public editPresence: Presence;
  public deletePresence: Presence;
  public participants: Participant[];

  constructor(private presenceService: PresenceService,
    private participantService: ParticipantService) {
    this.presences = [];
    this.editPresence = {} as Presence;
    this.deletePresence = {} as Presence; 
    this.participants = {} as Participant[];
   }

  ngOnInit(): void {
    this.getAllPresence();
  }

  public getAllParticipants(): void{
    this.participantService.getAllParticipant().subscribe(
  (response: Participant[]) => {
    this.participants = response;
    console.log(this.participants);
  },
  (error: HttpErrorResponse) =>{
    alert(error.message);
  }
  );
  }

  public getAllPresence(): void {
    this.presenceService.getAllPresence().subscribe(
      (response: Presence[]) => {
      this.presences = response;
      console.log(this.presences);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddPresence(addForm: NgForm): void {
    this.presenceService.addPresence(addForm.value).subscribe(
      (response: PresenceDto) => {
        console.log(response);
        this.getAllPresence();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdatePresence(presence: Presence): void {
    this.presenceService.updatePresence(presence).subscribe(
      (response: Presence) => {
        console.log(response);
        this.getAllPresence();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePresence(presenceId: number): void {
    this.presenceService.deletePresence(presenceId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllPresence();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPresences(key: string): void {
    console.log(key);
    const results: Presence[] = [];
    for (const presence of this.presences) {
      if (presence.isPresent.valueOf.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      || presence.date.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(presence);
      }
    }
    this.presences = results;
    if (results.length === 0 || !key) {
      this.getAllPresence();
    }
  }

  public onOpenModal(presence: Presence, mode: string): void {
    const container = document.getElementById(`main.container`);
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add'){
    button.setAttribute('data-target', '#addPresenceModal');

// update list of participants
this.participantService.getAllParticipant().subscribe(
  (response: Participant[]) => {
    this.participants = response;
    const list = document.getElementById('participants');
    for (let index = 0; index < this.participants.length; index++) {
      let option = document.createElement('option');
      option.value = this.participants[index].name;
      list?.appendChild(option);
    }
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
);

    }
    if(mode == 'edit'){
      this.editPresence=presence;
      button.setAttribute('data-target', '#updatePresenceModal');
      }
  
    if(mode == 'delete'){
        this.deletePresence = presence;
        button.setAttribute('data-target', '#deletePresenceModal');
        }
  
        container?.appendChild(button);
        button.click();
    }



}
