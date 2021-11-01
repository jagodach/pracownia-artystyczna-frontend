import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Participant } from './participant';
import { ParticipantDto } from './participantDto';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllParticipant(): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.apiServerUrl}/participant/all`);
  }

  public addParticipant(participant: ParticipantDto): Observable<ParticipantDto> {
    console.log(participant);
    return this.http.post<ParticipantDto>(`${this.apiServerUrl}/participant/add`, participant);
  }

  public updateParticipant(participant: ParticipantDto): Observable<ParticipantDto> {
    return this.http.put<ParticipantDto>(`${this.apiServerUrl}/participant/update`, participant);
  }

  public deleteParticipant(participantId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/participant/delete/${participantId}`);
  }
}
