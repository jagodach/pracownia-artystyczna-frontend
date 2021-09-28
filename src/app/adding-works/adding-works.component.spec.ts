import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingWorksComponent } from './adding-works.component';

describe('AddingWorksComponent', () => {
  let component: AddingWorksComponent;
  let fixture: ComponentFixture<AddingWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingWorksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
