import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Work } from './work';
import { WorkService } from './work.service';

@Component({
  selector: 'app-adding-works',
  templateUrl: './adding-works.component.html',
  styleUrls: ['./adding-works.component.css']
})
export class AddingWorksComponent implements OnInit {
  public works: Work[];
  public editWork: Work;
  public deleteWork: Work;

  constructor(private workService: WorkService) { 
    this.works = [];
    this.editWork = {} as Work;
    this.deleteWork = {} as Work;
  }

  ngOnInit(): void {
  }

  public getAllWork(): void {
    this.workService.getAllWork().subscribe(
      (response: Work[]) => {
      this.works = response;
      console.log(this.works);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddWork(addForm: NgForm): void {
    this.workService.addWork(addForm.value).subscribe(
      (response: Work) => {
        console.log(response);
        this.getAllWork();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateWork(work: Work): void {
    this.workService.updateWork(work).subscribe(
      (response: Work) => {
        console.log(response);
        this.getAllWork();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteWork(workId: number): void {
    this.workService.deleteWork(workId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllWork();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchWorks(key: string): void {
    console.log(key);
    const results: Work[] = [];
    for (const work of this.works) {
      if (work.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || work.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || work.photoUrl.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(work);
      }
    }
    this.works = results;
    if (results.length === 0 || !key) {
      this.getAllWork();
    }
  }

  public onOpenModal(work: Work, mode: string): void {
    const container = document.getElementById(`main.container`);
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode == 'add'){
    button.setAttribute('data-target', '#addWorkModal');
    }
    if(mode == 'edit'){
      this.editWork=work;
      button.setAttribute('data-target', '#updateWorkModal');
      }
  
    if(mode == 'delete'){
        this.deleteWork = work;
        button.setAttribute('data-target', '#deleteWorkModal');
        }
  
        container?.appendChild(button);
        button.click();
    }




}
