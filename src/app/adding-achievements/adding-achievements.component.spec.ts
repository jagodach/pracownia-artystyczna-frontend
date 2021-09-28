import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingAchievementsComponent } from './adding-achievements.component';

describe('AddingAchievementsComponent', () => {
  let component: AddingAchievementsComponent;
  let fixture: ComponentFixture<AddingAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingAchievementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
