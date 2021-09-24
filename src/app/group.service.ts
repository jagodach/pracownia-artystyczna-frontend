import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from './group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiServerUrl = '';

  constructor(private http: HttpClient) { }

  public getAllGroup(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiServerUrl}/group/all`);
  }

  public addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.apiServerUrl}/group/add`, group);
  }

  public updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.apiServerUrl}/group/update`, group);
  }

  public deleteGroup(groupId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/work/group/${groupId}`);
  }
}
