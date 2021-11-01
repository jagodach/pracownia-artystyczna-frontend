import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationRequest } from './registrationRequest';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public Register(registerRequest: RegistrationRequest): Observable<Response>{
    return this.http.post<Response>(`${this.apiServerUrl}/registration`, registerRequest);
  }
}
