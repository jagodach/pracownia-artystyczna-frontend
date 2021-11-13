import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AchievementService } from '../adding-achievements/achievement.service';
import { MostAchievements } from '../adding-achievements/MostAchievements';

@Component({
  selector: 'app-report-most-achievments',
  templateUrl: './report-most-achievments.component.html',
  styleUrls: ['./report-most-achievments.component.css']
})
export class ReportMostAchievmentsComponent implements OnInit {
  mostAchievements: MostAchievements[] = [];

  constructor(private achievementService: AchievementService) { }

  ngOnInit(): void {
  }

  public generateReport(){
    this.achievementService.getMostAchievements().subscribe(
      (response: MostAchievements[]) => {
        this.mostAchievements = response;
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }
}
