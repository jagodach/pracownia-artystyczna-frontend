import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Participant } from '../adding-participants/participant';
import { ParticipantService } from '../adding-participants/participant.service';
import { Achievement } from './achievement';
import { AchievementService } from './achievement.service';
import { AchievementDto } from './achievementDto';

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
    private participantService: ParticipantService) {
    this.achievements = [];
    this.editAchievement = {} as Achievement;
    this.deleteAchievement = {} as Achievement;
    this.participants = [];
   }

  ngOnInit(): void {
    this.getAllAchievement();
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


  public getAllAchievement(): void {
    this.achievementService.getAllAchievement().subscribe(
      (response: Achievement[]) => {
      this.achievements = response;
      console.log(this.achievements);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
        alert(error.message);
      }
    );
  }

  public onUpdateAchievement(achievement: Achievement): void {
    this.achievementService.updateAchievement(achievement).subscribe(
      (response: Achievement) => {
        console.log(response);
        this.getAllAchievement();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
        alert(error.message);
      }
    );
  }

  public searchAchievements(key: string): void {
    console.log(key);
    const results: Achievement[] = [];
    for (const achievement of this.achievements) {
      if (achievement.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
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
    if(mode == 'add'){
    button.setAttribute('data-target', '#addAchievementModal');

  // update list of groups
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
      this.editAchievement=achievement;
      button.setAttribute('data-target', '#updateAchievementModal');
      }
  
    if(mode == 'delete'){
        this.deleteAchievement = achievement;
        button.setAttribute('data-target', '#deleteAchievementModal');
        }
  
        container?.appendChild(button);
        button.click();
    }



}
