import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyersDatabaseComponent } from './admin-buyers-database.component';

describe('AdminBuyersDatabaseComponent', () => {
  let component: AdminBuyersDatabaseComponent;
  let fixture: ComponentFixture<AdminBuyersDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyersDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyersDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
