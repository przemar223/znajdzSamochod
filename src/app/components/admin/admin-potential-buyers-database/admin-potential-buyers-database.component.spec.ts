import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPotentialBuyersDatabaseComponent } from './admin-potential-buyers-database.component';

describe('AdminPotentialBuyersDatabaseComponent', () => {
  let component: AdminPotentialBuyersDatabaseComponent;
  let fixture: ComponentFixture<AdminPotentialBuyersDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPotentialBuyersDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPotentialBuyersDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
