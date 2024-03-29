import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Participant } from '../adding-participants/participant';
import { Presence } from './presence';
import { PresenceService } from './presence.service';
import { PresenceDto } from './presenceDto';
import { ParticipantService } from '../adding-participants/participant.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private participantService: ParticipantService,
    private router: Router,
    private toastr: ToastrService) {
    this.presences = [];
    this.editPresence = {} as Presence;
    this.deletePresence = {} as Presence; 
    this.participants = {} as Participant[];
   }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null){
      this.router.navigate(['/main']);
    }
    else {
      this.getAllPresence();
    }
  }

  public getAllParticipants(): void{
    this.participantService.getAllParticipant().subscribe(
  (response: Participant[]) => {
    this.participants = response;
    console.log(this.participants);
  },
  (error: HttpErrorResponse) =>{
    this.toastr.error('', 'Nie udało się pobrać uczestników', {
      progressBar : true
    });
  }
  );
  }

  public getAllPresence(): void {
    this.presenceService.getAllPresence().subscribe(
      (response: Presence[]) => {
      this.presences = response;
      this.presences = this.presences.sort(function sort(a: Presence, b: Presence): number {
        if (a.isPresent < b.isPresent){
          return -1;
        }
        else if (a.isPresent > b.isPresent){
          return 1;
        }
        return 0; 
      })
      console.log(this.presences);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Nie udało się pobrać obecności', {
          progressBar : true
        });
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
        this.toastr.error('', 'Wypełnij poprawnie formularz dodawania obecności', {
          progressBar : true
        });
      }
    );
  }

  public onUpdatePresence(presence: Presence): void {
    delete presence.presenceCode;
    let presenceDto: PresenceDto = presence;
    console.log(presence);
    this.presenceService.updatePresence(presence).subscribe(
      (response: PresenceDto) => {
        console.log(response);
        this.getAllPresence();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Wypełnij poprawnie formularz edytowania obecności', {
          progressBar : true
        });
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
        this.toastr.error('', 'Usuwanie obecności nie powiodło się', {
          progressBar : true
        });
      }
    );
  }

  public searchPresences(key: string): void {
    console.log(key);
    const results: Presence[] = [];
    for (const presence of this.presences) {
      if (presence.isPresent.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || presence.participant.toLowerCase().indexOf(key.toLowerCase()) !== -1
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
    while (list?.firstChild) {
      list?.removeChild(list?.firstChild);
    }
    for (let index = 0; index < this.participants.length; index++) {
      let option = document.createElement('option');
      option.value = this.participants[index].name;
      list?.appendChild(option);
    }
  },
  (error: HttpErrorResponse) => {
    this.toastr.error('', 'Błąd', {
      progressBar : true
    });
  }
);

    }
    if(mode == 'edit'){
      this.editPresence=presence;
      button.setAttribute('data-target', '#updatePresenceModal');
      this.participantService.getAllParticipant().subscribe(
        (response: Participant[]) => {
          this.participants = response;
          const list = document.getElementById('participants');
          while (list?.firstChild) {
            list?.removeChild(list?.firstChild);
          }
          for (let index = 0; index < this.participants.length; index++) {
            let option = document.createElement('option');
            option.value = this.participants[index].name;
            list?.appendChild(option);
          }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('', 'Błąd', {
            progressBar : true
          });
        }
      );
      }
  
    if(mode == 'delete'){
        this.deletePresence = presence;
        button.setAttribute('data-target', '#deletePresenceModal');
        }
  
        container?.appendChild(button);
        button.click();
    }

    public getDateString(date: Date) : string{
      return new Date(date).toLocaleDateString();
    }


}
