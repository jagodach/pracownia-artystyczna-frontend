import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Group } from './group';
import { GroupService } from './group.service';

@Component({
  selector: 'app-adding-groups',
  templateUrl: './adding-groups.component.html',
  styleUrls: ['./adding-groups.component.css']
})
export class AddingGroupsComponent implements OnInit {
public groups: Group[];
public editGroup: Group;
public deleteGroup: Group;

  constructor(private groupService: GroupService) {
    this.groups = [];
    this.editGroup = {} as Group;
    this.deleteGroup = {} as Group;
      }

  ngOnInit(): void {
  }


public getAllGroup(): void {
  this.groupService.getAllGroup().subscribe(
    (response: Group[]) => {
    this.groups = response;
    console.log(this.groups);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onAddGroup(addForm: NgForm): void {
  this.groupService.addGroup(addForm.value).subscribe(
    (response: Group) => {
      console.log(response);
      this.getAllGroup();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onUpdateGroup(group: Group): void {
  this.groupService.updateGroup(group).subscribe(
    (response: Group) => {
      console.log(response);
      this.getAllGroup();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onDeleteGroup(groupId: number): void {
  this.groupService.deleteGroup(groupId).subscribe(
    (response: void) => {
      console.log(response);
      this.getAllGroup();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public searchGroups(key: string): void {
  console.log(key);
  const results: Group[] = [];
  for (const group of this.groups) {
    if (group.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || group.number.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1 ){
      results.push(group);
    }
  }
  this.groups = results;
  if (results.length === 0 || !key) {
    this.getAllGroup();
  }
}


public onOpenModal(group: Group, mode: string): void {
  const container = document.getElementById(`main.container`);
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if(mode == 'add'){
  button.setAttribute('data-target', '#addGroupModal');
  }
  if(mode == 'edit'){
    this.editGroup=group;
    button.setAttribute('data-target', '#updateGroupModal');
    }

  if(mode == 'delete'){
      this.deleteGroup = group;
      button.setAttribute('data-target', '#deleteGroupModal');
      }

      container?.appendChild(button);
      button.click();
  }



}
