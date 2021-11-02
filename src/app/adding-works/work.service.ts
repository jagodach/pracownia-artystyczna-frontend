import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Work } from './work';
import { environment } from 'src/environments/environment';
import { WorkDto } from './workDto';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllWork(): Observable<Work[]> {
    return this.http.get<Work[]>(`${this.apiServerUrl}/work/all`);
  }

  public addWork(work: WorkDto): Observable<WorkDto> {
    return this.http.post<WorkDto>(`${this.apiServerUrl}/work/add`, work);
  }

  public updateWork(work: WorkDto): Observable<WorkDto> {
    return this.http.put<WorkDto>(`${this.apiServerUrl}/work/update`, work);
  }

  public deleteWork(workId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/work/delete/${workId}`);
  }
}
