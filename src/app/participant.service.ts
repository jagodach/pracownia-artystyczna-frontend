import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from './participant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllParticipant(): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.apiServerUrl}/participant/all`);
  }

  public addParticipant(participant: Participant): Observable<Participant> {
    console.log(participant);
    return this.http.post<Participant>(`${this.apiServerUrl}/participant/add`, participant);
  }

  public updateParticipant(participant: Participant): Observable<Participant> {
    return this.http.put<Participant>(`${this.apiServerUrl}/participant/update`, participant);
  }

  public deleteParticipant(participantId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/participant/delete/${participantId}`);
  }
}
