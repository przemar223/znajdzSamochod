import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCarModelComponent } from './admin-add-car-model.component';

describe('AdminAddCarModelComponent', () => {
  let component: AdminAddCarModelComponent;
  let fixture: ComponentFixture<AdminAddCarModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddCarModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
