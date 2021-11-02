import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo } from './to-do';
import { environment } from 'src/environments/environment';
import { ToDoDto } from './todoDto';

@Injectable({
    providedIn: 'root'
  })

  export class ToDoService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getAllToDo(): Observable<ToDo[]> {
      return this.http.get<ToDo[]>(`${this.apiServerUrl}/todo/all`);
    }
  
    public addToDo(todo: ToDoDto): Observable<ToDoDto> {
      console.log(todo);
      return this.http.post<ToDoDto>(`${this.apiServerUrl}/todo/add`, todo);
    }
  
    public updateToDo(todo: ToDoDto): Observable<ToDoDto> {
      return this.http.put<ToDoDto>(`${this.apiServerUrl}/todo/update`, todo);
    }
  
    public deleteToDo(todoId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/todo/delete/${todoId}`);
    }
  }
  