import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParticipantDto } from '../adding-participants/participantDto';

@Injectable({
  providedIn: 'root'
})
export class ReportGroupService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getGroupReport(groupNumber: Number): Observable<ParticipantDto[]> {
    return this.http.get<ParticipantDto[]>(`${this.apiServerUrl}/reports/find/${groupNumber}`);
  }
}
