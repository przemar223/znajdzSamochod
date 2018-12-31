import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeMailboxComponent } from './admin-change-mailbox.component';

describe('AdminChangeMailboxComponent', () => {
  let component: AdminChangeMailboxComponent;
  let fixture: ComponentFixture<AdminChangeMailboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangeMailboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
