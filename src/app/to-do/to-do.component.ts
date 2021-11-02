import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Participant } from '../adding-participants/participant';
import { ParticipantService } from '../adding-participants/participant.service';
import { ToDo } from './to-do';
import { ToDoService } from './to-do.service';
import { ToDoDto } from './todoDto';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  public todos: ToDo[];
  public editToDo: ToDo;
  public deleteToDo: ToDo;
  public participants: Participant[];

  constructor(private todoService: ToDoService,
    private participantService: ParticipantService) { 
    this.todos = [];
    this.editToDo = {} as ToDo;
    this.deleteToDo = {} as ToDo;
    this.participants = [];
  }

  ngOnInit(): void {
    this.getAllToDo();
    
  }

  public getAllParticipants(): void{
    this.participantService.getAllParticipant().subscribe(
  (response: Participant[]) => {
    this.participants = response;
    console.log(this.participants);
  },
  (error: HttpErrorResponse) =>{
    alert(error.message);
  }
  );
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
      (response: ToDoDto) => {
        console.log(response);
        this.getAllToDo();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateToDo(todo: ToDo): void {
    delete todo.toDoCode;
    let todoDto: ToDoDto = todo;
    console.log(todo);
    this.todoService.updateToDo(todo).subscribe(
      (response: ToDoDto) => {
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
      if (todo.message.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || todo.participant.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
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

 // update list of participants
 this.participantService.getAllParticipant().subscribe(
  (response: Participant[]) => {
    this.participants = response;
    const list = document.getElementById('participants');
    for (let index = 0; index < this.participants.length; index++) {
      let option = document.createElement('option');
      option.value = this.participants[index].name;
      list?.appendChild(option);
    }
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
);

    }
    if(mode == 'edit'){
      this.editToDo=todo;
      button.setAttribute('data-target', '#updateToDoModal');
      // update list of participants
    this.participantService.getAllParticipant().subscribe(
      (response: Participant[]) => {
        this.participants = response;
        const list = document.getElementById('participants');
        for (let index = 0; index < this.participants.length; index++) {
          let option = document.createElement('option');
          option.value = this.participants[index].name;
          list?.appendChild(option);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
      }
  
    if(mode == 'delete'){
        this.deleteToDo = todo;
        button.setAttribute('data-target', '#deleteToDoModal');
        }
  
        container?.appendChild(button);
        button.click();
    }



}
