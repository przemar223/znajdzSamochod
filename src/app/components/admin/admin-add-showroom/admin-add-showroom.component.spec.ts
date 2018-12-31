import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddShowroomComponent } from './admin-add-showroom.component';

describe('AddShowroomComponent', () => {
  let component: AdminAddShowroomComponent;
  let fixture: ComponentFixture<AdminAddShowroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddShowroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddShowroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
