import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingPresenceComponent } from './adding-presence.component';

describe('AddingPresenceComponent', () => {
  let component: AddingPresenceComponent;
  let fixture: ComponentFixture<AddingPresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingPresenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
