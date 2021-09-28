import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitykaComponent } from './polityka.component';

describe('PolitykaComponent', () => {
  let component: PolitykaComponent;
  let fixture: ComponentFixture<PolitykaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolitykaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitykaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
