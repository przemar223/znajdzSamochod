import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCarMarkComponent } from './admin-add-car-mark.component';

describe('AdminAddCarMarkComponent', () => {
  let component: AdminAddCarMarkComponent;
  let fixture: ComponentFixture<AdminAddCarMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddCarMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCarMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
