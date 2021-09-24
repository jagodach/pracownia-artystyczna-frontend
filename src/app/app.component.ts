import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Participant } from './participant';
import { ParticipantService } from './participant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public participants: Participant[];
  public editParticipant: Participant;
  public deleteParticipant: Participant;

  constructor(private particantService: ParticipantService){
    this.participants = [];
    this.editParticipant = {} as Participant;
    this.deleteParticipant = {} as Participant;
  }

  ngOnInit(){
    this.getAllParticipant();
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
    document.getElementById('add-participant-form')?.click();
    this.particantService.addParticipant(addForm.value).subscribe(
      (response: Participant) => {
        console.log(response);
        this.getAllParticipant();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onUpdateParticipant(participant: Participant): void {
    this.particantService.updateParticipant(participant).subscribe(
      (response: Participant) => {
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
  if(mode == 'add'){
  button.setAttribute('data-target', '#addParticipantModal');
  }
  if(mode == 'edit'){
    this.editParticipant=participant;
    button.setAttribute('data-target', '#updateParticipantModal');
    }

  if(mode == 'delete'){
      this.deleteParticipant = participant;
      button.setAttribute('data-target', '#deleteParticipantModal');
      }

      container?.appendChild(button);
      button.click();
}






}