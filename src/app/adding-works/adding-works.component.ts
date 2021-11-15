import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Participant } from '../adding-participants/participant';
import { ParticipantService } from '../adding-participants/participant.service';
import { Work } from './work';
import { WorkService } from './work.service';
import { WorkDto } from './workDto';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adding-works',
  templateUrl: './adding-works.component.html',
  styleUrls: ['./adding-works.component.css']
})
export class AddingWorksComponent implements OnInit {
  public works: Work[];
  public editWork: Work;
  public deleteWork: Work;
  public participants: Participant[];

  constructor(private workService: WorkService,
    private participantService: ParticipantService,
    private router: Router,
    private toastr: ToastrService) {
    this.works = [];
    this.editWork = {} as Work;
    this.deleteWork = {} as Work;
    this.participants = [];
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null){
      this.router.navigate(['/main']);
    }
    else {
      this.getAllWork();
    }
  }

  public getAllParticipants(): void {
    this.participantService.getAllParticipant().subscribe(
      (response: Participant[]) => {
        this.participants = response;
        console.log(this.participants);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Nie udało się pobrać uczestników', {
          progressBar : true
        });
      }
    );
  }

  public getAllWork(): void {
    this.workService.getAllWork().subscribe(
      (response: Work[]) => {
        this.works = response;
        this.works = this.works.sort(function sort(a: Work, b: Work): number {
          if (a.name < b.name){
            return -1;
          }
          else if (a.name > b.name){
            return 1;
          }
          return 0;
        })
        console.log(this.works);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Nie udało się pobrać prac', {
          progressBar : true
        });
      }
    );
  }

  public onAddWork(addForm: NgForm): void {
    this.workService.addWork(addForm.value).subscribe(
      (response: WorkDto) => {
        console.log(response);
        this.getAllWork();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Wypełnij poprawnie formularz dodawania pracy', {
          progressBar : true
        });
      }
    );
  }

  public onUpdateWork(work: Work): void {
    delete work.workCode;
    let workDto: WorkDto = work;
    console.log(work);
    this.workService.updateWork(work).subscribe(
      (response: WorkDto) => {
        console.log(response);
        this.getAllWork();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Wypełnij poprawnie formularz edytowania pracy', {
          progressBar : true
        });
      }
    );
  }

  public onDeleteWork(workId: number): void {
    this.workService.deleteWork(workId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllWork();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Usunięcie osiągnięcia nie powiodło się', {
          progressBar : true
        });
      }
    );
  }

  public searchWorks(key: string): void {
    console.log(key);
    const results: Work[] = [];
    for (const work of this.works) {
      if (work.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || work.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || work.photoUrl.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || work.participant.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(work);
      }
    }
    this.works = results;
    if (results.length === 0 || !key) {
      this.getAllWork();
    }
  }

  public onOpenModal(work: Work, mode: string): void {
    const container = document.getElementById(`main.container`);
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode == 'add') {
      button.setAttribute('data-target', '#addWorkModal');

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
          this.toastr.error('', 'Błąd', {
            progressBar : true
          });
        }
      );

    }
    if (mode == 'edit') {
      this.editWork = work;
      button.setAttribute('data-target', '#updateWorkModal');

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
          this.toastr.error('', 'Błąd', {
            progressBar : true
          });
        }
      );

    }

    if (mode == 'delete') {
      this.deleteWork = work;
      button.setAttribute('data-target', '#deleteWorkModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public redirectToPhoto(url: string){
    window.open(url, '_blank');
  }

}
