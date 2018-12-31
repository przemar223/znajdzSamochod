import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsMarksDatabaseComponent } from './cars-marks-database.component';

describe('CarsMarksDatabaseComponent', () => {
  let component: CarsMarksDatabaseComponent;
  let fixture: ComponentFixture<CarsMarksDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsMarksDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsMarksDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
