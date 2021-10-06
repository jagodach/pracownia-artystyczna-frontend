import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Presence } from './presence';
import { PresenceService } from './presence.service';

@Component({
  selector: 'app-adding-presence',
  templateUrl: './adding-presence.component.html',
  styleUrls: ['./adding-presence.component.css']
})
export class AddingPresenceComponent implements OnInit {
  public presences: Presence[];
  public editPresence: Presence;
  public deletePresence: Presence;

  constructor(private presenceService: PresenceService) {
    this.presences = [];
    this.editPresence = {} as Presence;
    this.deletePresence = {} as Presence; 
   }

  ngOnInit(): void {
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
      (response: Presence) => {
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
