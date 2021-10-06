import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Achievement } from './achievement';
import { AchievementService } from './achievement.service';

@Component({
  selector: 'app-adding-achievements',
  templateUrl: './adding-achievements.component.html',
  styleUrls: ['./adding-achievements.component.css']
})
export class AddingAchievementsComponent implements OnInit {
  public achievements: Achievement[];
  public editAchievement: Achievement;
  public deleteAchievement: Achievement;

  constructor(private achievementService: AchievementService) {
    this.achievements = [];
    this.editAchievement = {} as Achievement;
    this.deleteAchievement = {} as Achievement;
   }

  ngOnInit(): void {
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
      (response: Achievement) => {
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
