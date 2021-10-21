import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo } from './to-do';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class ToDoService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getAllToDo(): Observable<ToDo[]> {
      return this.http.get<ToDo[]>(`${this.apiServerUrl}/todo/all`);
    }
  
    public addToDo(todo: ToDo): Observable<ToDo> {
      console.log(todo);
      return this.http.post<ToDo>(`${this.apiServerUrl}/todo/add`, todo);
    }
  
    public updateToDo(todo: ToDo): Observable<ToDo> {
      return this.http.put<ToDo>(`${this.apiServerUrl}/todo/update`, todo);
    }
  
    public deleteToDo(todoId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/todo/delete/${todoId}`);
    }
  }
  