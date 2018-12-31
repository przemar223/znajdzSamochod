import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsModelsDatabaseComponent } from './cars-models-database.component';

describe('CarsModelsDatabaseComponent', () => {
  let component: CarsModelsDatabaseComponent;
  let fixture: ComponentFixture<CarsModelsDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsModelsDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsModelsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
