import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowroomsDatabaseComponent } from './showrooms-database.component';

describe('ShowroomsDatabaseComponent', () => {
  let component: ShowroomsDatabaseComponent;
  let fixture: ComponentFixture<ShowroomsDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowroomsDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowroomsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
