import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingGroupsComponent } from './adding-groups.component';

describe('AddingGroupsComponent', () => {
  let component: AddingGroupsComponent;
  let fixture: ComponentFixture<AddingGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
