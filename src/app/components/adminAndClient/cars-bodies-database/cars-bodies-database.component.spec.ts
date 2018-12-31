import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsBodiesDatabaseComponent } from './cars-bodies-database.component';

describe('CarsBodiesDatabaseComponent', () => {
  let component: CarsBodiesDatabaseComponent;
  let fixture: ComponentFixture<CarsBodiesDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsBodiesDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsBodiesDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
