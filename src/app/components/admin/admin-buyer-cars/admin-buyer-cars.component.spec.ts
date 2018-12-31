import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyerCarsComponent } from './admin-buyer-cars.component';

describe('AdminBuyerCarsComponent', () => {
  let component: AdminBuyerCarsComponent;
  let fixture: ComponentFixture<AdminBuyerCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyerCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyerCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
