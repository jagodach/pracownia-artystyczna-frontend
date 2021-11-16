import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Participant } from '../adding-participants/participant';
import { ParticipantService } from '../adding-participants/participant.service';
import { Achievement } from './achievement';
import { AchievementService } from './achievement.service';
import { AchievementDto } from './achievementDto';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adding-achievements',
  templateUrl: './adding-achievements.component.html',
  styleUrls: ['./adding-achievements.component.css']
})
export class AddingAchievementsComponent implements OnInit {
  public achievements: Achievement[];
  public editAchievement: Achievement;
  public deleteAchievement: Achievement;
  public participants: Participant[];

  constructor(private achievementService: AchievementService,
    private participantService: ParticipantService,
    private router: Router,
    private toastr: ToastrService) {
    this.achievements = [];
    this.editAchievement = {} as Achievement;
    this.deleteAchievement = {} as Achievement;
    this.participants = [];
  }


  ngOnInit(): void {
    if (localStorage.getItem('token') == null){
      this.router.navigate(['/main']);
    }
    else {
      this.getAllAchievement();
    }
  }


  public getAllParticipants(): void {
    this.participantService.getAllParticipant().subscribe(
      (response: Participant[]) => {
        this.participants = response;
        this.participants.sort();
        console.log(this.participants);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Nie udało się pobrać uczestników', {
          progressBar : true
        });
      }
    );
  }


  public getAllAchievement(): void {
    this.achievementService.getAllAchievement().subscribe(
      (response: Achievement[]) => {
        this.achievements = response;
        this.achievements = this.achievements.sort(function sort(a: Achievement, b: Achievement): number {
          if (a.name < b.name){
            return -1;
          }
          else if (a.name > b.name){
            return 1;
          }
          return 0;
        })
        console.log(this.achievements);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Nie udało się pobrać osiągnięć', {
          progressBar : true
        });
      }
    );
  }

  public onAddAchievement(addForm: NgForm): void {
    this.achievementService.addAchievement(addForm.value).subscribe(
      (response: AchievementDto) => {
        console.log(response);
        this.getAllAchievement();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Wypełnij poprawnie formularz dodawania osiągnięcia', {
          progressBar : true
        });
      }
    );
  }

  public onUpdateAchievement(achievement: Achievement): void {
    delete achievement.achievementCode;
    let achievementDto: AchievementDto = achievement;
    console.log(achievement);
    this.achievementService.updateAchievement(achievement).subscribe(
      (response: AchievementDto) => {
        console.log(response);
        this.getAllAchievement();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Wypełnij poprawnie formularz edytowania osiągnięcia', {
          progressBar : true
        });
      }
    );
  }

  public onDeleteAchievement(achievementId: number): void {
    this.achievementService.deleteAchievement(achievementId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllAchievement();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Usuwanie osiągnięcia nie powiodło się', {
          progressBar : true
        });
      }
    );
  }

  public searchAchievements(key: string): void {
    console.log(key);
    const results: Achievement[] = [];
    for (const achievement of this.achievements) {
      if (achievement.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || achievement.participant.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || achievement.type.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(achievement);
      }
    }
    this.achievements = results;
    if (results.length === 0 || !key) {
      this.getAllAchievement();
    }
  }

  public onOpenModal(achievement: Achievement, mode: string): void {
    const container = document.getElementById(`main.container`);
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode == 'add') {
      button.setAttribute('data-target', '#addAchievementModal');

      // update list of groups
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
    if (mode == 'edit') {
      this.editAchievement = achievement;
      button.setAttribute('data-target', '#updateAchievementModal');
      this.participantService.getAllParticipant().subscribe(
        (response: Participant[]) => {
          this.participants = response;
          const list = document.getElementById('participants');
          while (list?.firstChild) {
            list?.removeChild(list?.firstChild);
          }
          for (let index = 0; index < this.achievements.length; index++) {
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
      this.deleteAchievement = achievement;
      button.setAttribute('data-target', '#deleteAchievementModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public getDateString(date: Date) : string{
    return new Date(date).toLocaleDateString();
  }

}
