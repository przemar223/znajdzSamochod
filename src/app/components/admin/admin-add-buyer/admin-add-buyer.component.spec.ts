import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddBuyerComponent } from './admin-add-buyer.component';

describe('AdminAddBuyerComponent', () => {
  let component: AdminAddBuyerComponent;
  let fixture: ComponentFixture<AdminAddBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
