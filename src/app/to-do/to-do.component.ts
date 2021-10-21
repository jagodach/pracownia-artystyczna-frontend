import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToDo } from './to-do';
import { ToDoService } from './to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  public todos: ToDo[];
  public editToDo: ToDo;
  public deleteToDo: ToDo;

  constructor(private todoService: ToDoService) { 
    this.todos = [];
    this.editToDo = {} as ToDo;
    this.deleteToDo = {} as ToDo;
  }

  ngOnInit(): void {
  }

  public getAllToDo(): void {
    this.todoService.getAllToDo().subscribe(
      (response: ToDo[]) => {
      this.todos = response;
      console.log(this.todos);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddToDo(addForm: NgForm): void {
    this.todoService.addToDo(addForm.value).subscribe(
      (response: ToDo) => {
        console.log(response);
        this.getAllToDo();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateToDo(todo: ToDo): void {
    this.todoService.updateToDo(todo).subscribe(
      (response: ToDo) => {
        console.log(response);
        this.getAllToDo();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteToDo(todoId: number): void {
    this.todoService.deleteToDo(todoId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllToDo();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTodos(key: string): void {
    console.log(key);
    const results: ToDo[] = [];
    for (const todo of this.todos) {
      if (todo.message.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(todo);
      }
    }
    this.todos = results;
    if (results.length === 0 || !key) {
      this.getAllToDo();
    }
  }

  public onOpenModal(todo: ToDo, mode: string): void {
    const container = document.getElementById(`main.container`);
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add'){
    button.setAttribute('data-target', '#addToDoModal');
    }
    if(mode == 'edit'){
      this.editToDo=todo;
      button.setAttribute('data-target', '#updateToDoModal');
      }
  
    if(mode == 'delete'){
        this.deleteToDo = todo;
        button.setAttribute('data-target', '#deleteToDoModal');
        }
  
        container?.appendChild(button);
        button.click();
    }



}
