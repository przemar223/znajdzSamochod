import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Md5 } from 'ts-md5';
import { LoginDTO } from 'src/app/models/DTO/LoginDTO';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit, DoCheck {

  oldPasswordControl = new FormControl('', [Validators.required]);
  newPasswordControl = new FormControl('', [Validators.required]);
  newPassword2Control = new FormControl('', [Validators.required]);
  isAllFields = true;
  hide = true;
  oldPassword = '';
  newPassword = '';
  newPassword2 = '';
  login: LoginDTO = new LoginDTO();
  warning = this.resourcer.AllFields;

  constructor(private router: Router, public loginService: LoginService,
    public resourcer: StringResourcer) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.loginService.checkSession();
  }

  approvePasswordButton() {
    this.loginService.checkTimeLogin();
    if (this.oldPassword.trim() === '' || this.newPassword.trim() === '' ||
      this.newPassword2.trim() === '') {
      this.isAllFields = false;
      this.warning = this.resourcer.AllFields;
      return;
    }
    if (this.newPassword.trim() !== this.newPassword2.trim()) {
      this.isAllFields = false;
      this.warning = this.resourcer.AdminChangePasswordDifferentPassword;
    } else {
      const md5 = new Md5();
      const hashOld: String = Md5.hashStr(this.oldPassword) as string;

      const hashNew: String = Md5.hashStr(this.newPassword) as string;
      this.login.password = hashOld;
      this.loginService.changePassword(this.login, hashNew);
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
      this.approvePasswordButton();
    }
  }
}
