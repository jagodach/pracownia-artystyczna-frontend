import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AchievementService } from '../adding-achievements/achievement.service';
import { MostAchievements } from '../adding-achievements/MostAchievements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-most-achievments',
  templateUrl: './report-most-achievments.component.html',
  styleUrls: ['./report-most-achievments.component.css']
})
export class ReportMostAchievmentsComponent implements OnInit {
  mostAchievements: MostAchievements[] = [];

  constructor(private achievementService: AchievementService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public generateReport(){
    this.achievementService.getMostAchievements().subscribe(
      (response: MostAchievements[]) => {
        this.mostAchievements = response;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Nie udało się wygenerować raportu', {
          progressBar : true
        });
      }
    )
  }
}
