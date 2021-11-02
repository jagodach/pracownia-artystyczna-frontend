import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Achievement } from './achievement';
import { environment } from 'src/environments/environment';
import { AchievementDto } from './achievementDto';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllAchievement(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`${this.apiServerUrl}/achievement/all`);
  }

  public addAchievement(achievement: AchievementDto): Observable<AchievementDto> {
    console.log(achievement);
    return this.http.post<AchievementDto>(`${this.apiServerUrl}/achievement/add`, achievement);
  }


  public updateAchievement(achievement: AchievementDto): Observable<AchievementDto> {
    return this.http.put<AchievementDto>(`${this.apiServerUrl}/achievement/update`, achievement);
  }

  public deleteAchievement(achievementId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/achievement/delete/${achievementId}`);
  }

}

