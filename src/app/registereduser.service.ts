import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisteredUser } from './registereduser';

@Injectable({
  providedIn: 'root'
})
export class RegistereduserService {
  private apiServerUrl = '';

  constructor(private http: HttpClient) { }

 
  public getAllRegisteredUser(): Observable<RegisteredUser[]> {
    return this.http.get<RegisteredUser[]>(`${this.apiServerUrl}/registeredUser/all`);
  }

  public addRegisteredUser(registeredUser: RegisteredUser): Observable<RegisteredUser> {
    return this.http.post<RegisteredUser>(`${this.apiServerUrl}/registeredUser/add`, registeredUser);
  }

  public updateRegisteredUser(registeredUser: RegisteredUser): Observable<RegisteredUser> {
    return this.http.put<RegisteredUser>(`${this.apiServerUrl}/registeredUser/update`, registeredUser);
  }

  public deleteRegisteredUser(registeredUserId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/registeredUser/delete/${registeredUserId}`);
  }
}
