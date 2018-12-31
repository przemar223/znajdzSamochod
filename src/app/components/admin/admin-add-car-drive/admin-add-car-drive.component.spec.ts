import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCarDriveComponent } from './admin-add-car-drive.component';

describe('AdminAddCarDriveComponent', () => {
  let component: AdminAddCarDriveComponent;
  let fixture: ComponentFixture<AdminAddCarDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddCarDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCarDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
