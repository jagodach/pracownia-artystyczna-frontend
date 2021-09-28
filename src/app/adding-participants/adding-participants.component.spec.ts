import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingParticipantsComponent } from './adding-participants.component';

describe('AddingParticipantsComponent', () => {
  let component: AddingParticipantsComponent;
  let fixture: ComponentFixture<AddingParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
