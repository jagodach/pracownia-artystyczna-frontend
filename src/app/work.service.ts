import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Work } from './work';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllWork(): Observable<Work[]> {
    return this.http.get<Work[]>(`${this.apiServerUrl}/work/all`);
  }

  public addWork(work: Work): Observable<Work> {
    return this.http.post<Work>(`${this.apiServerUrl}/work/add`, work);
  }

  public updateWork(work: Work): Observable<Work> {
    return this.http.put<Work>(`${this.apiServerUrl}/work/update`, work);
  }

  public deleteWork(workId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/work/delete/${workId}`);
  }
}
