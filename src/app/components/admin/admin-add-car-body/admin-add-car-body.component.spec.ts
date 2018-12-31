import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCarBodyComponent } from './admin-add-car-body.component';

describe('AdminAddCarBodyComponent', () => {
  let component: AdminAddCarBodyComponent;
  let fixture: ComponentFixture<AdminAddCarBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddCarBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCarBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
