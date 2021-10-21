import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistereduserComponent } from './registereduser.component';

describe('RegistereduserComponent', () => {
  let component: RegistereduserComponent;
  let fixture: ComponentFixture<RegistereduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistereduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistereduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
