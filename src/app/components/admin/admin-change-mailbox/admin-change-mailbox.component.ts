import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginDTO } from 'src/app/models/DTO/LoginDTO';
import { FormControl, Validators } from '@angular/forms';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-admin-change-mailbox',
  templateUrl: './admin-change-mailbox.component.html',
  styleUrls: ['./admin-change-mailbox.component.css']
})
export class AdminChangeMailboxComponent implements OnInit, DoCheck {

  emailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  isAllFields = true;
  warning = this.resourcer.AllFields;

  constructor(private router: Router, public loginService: LoginService,
    public resourcer: StringResourcer) { }
  mailbox: LoginDTO = new LoginDTO;

  ngOnInit() {
    this.loginService.getMailbox()
      .subscribe(mail => this.mailbox = mail);
  }

  ngDoCheck() {
    this.loginService.checkSession();
  }

  approveMailboxButton() {
    this.loginService.checkTimeLogin();
    if (this.mailbox.login.trim() === '' || this.mailbox.password.trim() === '') {
      this.isAllFields = false;
      return;
    } else {
      this.loginService.updateMailbox(this.mailbox)
        .subscribe(sh => this.mailbox = sh);
      this.router.navigateByUrl('admin/menu');
    }
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('admin/menu');
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }

  isPressEnter(event) {
    if (event.key === 'Enter') {
      this.approveMailboxButton();
    }
  }
}
