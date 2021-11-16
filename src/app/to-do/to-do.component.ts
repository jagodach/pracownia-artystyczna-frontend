import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Participant } from '../adding-participants/participant';
import { ParticipantService } from '../adding-participants/participant.service';
import { ToDo } from './to-do';
import { ToDoService } from './to-do.service';
import { ToDoDto } from './todoDto';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private participantService: ParticipantService,
    private router: Router,
    private toastr: ToastrService) { 
    this.todos = [];
    this.editToDo = {} as ToDo;
    this.deleteToDo = {} as ToDo;
    this.participants = [];
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null){
      this.router.navigate(['/main']);
    }
    else {
      this.getAllToDo();
    }
  }

  public getAllParticipants(): void{
    this.participantService.getAllParticipant().subscribe(
  (response: Participant[]) => {
    this.participants = response;
    this.participants.sort();
    console.log(this.participants);
  },
  (error: HttpErrorResponse) =>{
    this.toastr.error('', 'Nie udało się pobrać uczestników', {
      progressBar : true
    });
  }
  );
  }

  public getAllToDo(): void {
    this.todoService.getAllToDo().subscribe(
      (response: ToDo[]) => {
      this.todos = response;
      this.todos = this.todos.sort(function sort(a: ToDo, b: ToDo): number {
        if (a.message < b.message){
          return -1;
        }
        else if (a.message > b.message){
          return 1;
        }
        return 0; 
      })
      console.log(this.todos);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Nie udało się pobrać zadań do wykonania', {
          progressBar : true
        });
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
        this.toastr.error('', 'Wypełnij poprawnie formularz dodawania zadania do wykonania', {
          progressBar : true
        });
      }
    );
  }

  public onUpdateToDo(todo: ToDo, id: number): void {
    delete todo.toDoCode;
    let todoDto: ToDoDto = todo;
    todoDto.id = id;
    this.todoService.updateToDo(todo).subscribe(
      (response: ToDoDto) => {
        console.log(response);
        this.getAllToDo();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Wypełnij poprawnie formularz edytowania zadania do wykonania', {
          progressBar : true
        });
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
        this.toastr.error('', 'Usuwanie zadania do wykonania nie powiodło się', {
          progressBar : true
        });
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
    while (list?.firstChild) {
      list?.removeChild(list?.firstChild);
    }
    for (let index = 0; index < this.participants.length; index++) {
      let option = document.createElement('option');
      option.value = this.participants[index].name;
      list?.appendChild(option);
      
    }
    
  },
  (error: HttpErrorResponse) => {
    this.toastr.error('', 'Błąd', {
      progressBar : true
    });
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
        while (list?.firstChild) {
          list?.removeChild(list?.firstChild);
        }
        for (let index = 0; index < this.participants.length; index++) {
          let option = document.createElement('option');
          option.value = this.participants[index].name;
          list?.appendChild(option);
        }
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('', 'Błąd', {
          progressBar : true
        });
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
