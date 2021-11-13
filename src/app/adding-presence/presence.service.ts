import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presence } from './presence';
import { environment } from 'src/environments/environment';
import { PresenceDto } from './presenceDto';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllPresence(): Observable<Presence[]> {
    return this.http.get<Presence[]>(`${this.apiServerUrl}/presence/all`);
  }

  public getPresencesByParticipantId(id: string): Observable<PresenceDto[]> {
    return this.http.get<PresenceDto[]>(`${this.apiServerUrl}/presence/participant/${id}`);
  }

  public addPresence(presence: PresenceDto): Observable<PresenceDto> {
    console.log(presence);
    return this.http.post<PresenceDto>(`${this.apiServerUrl}/presence/add`, presence);
  }

  public updatePresence(presence: PresenceDto): Observable<PresenceDto> {
    return this.http.put<PresenceDto>(`${this.apiServerUrl}/presence/update`, presence);
  }

  public deletePresence(presenceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/presence/delete/${presenceId}`);
  }
}




