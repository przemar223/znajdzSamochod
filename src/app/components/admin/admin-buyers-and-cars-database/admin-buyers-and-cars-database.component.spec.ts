import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyersAndCarsDatabaseComponent } from './admin-buyers-and-cars-database.component';

describe('AdminBuyersAndCarsDatabaseComponent', () => {
  let component: AdminBuyersAndCarsDatabaseComponent;
  let fixture: ComponentFixture<AdminBuyersAndCarsDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyersAndCarsDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyersAndCarsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
