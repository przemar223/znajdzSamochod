import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import { Observable, of as observableOf } from 'rxjs';
import { Router } from '@angular/router';
import { LoginDTO } from '../models/DTO/LoginDTO';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isGoodLoginAndPassword;
  isTimeLogin: Boolean;
  isLogout = true;
  isLogoutInfo = false;
  login = '';
  isChangePassword: Boolean;

  constructor(private httpClient: HttpClient, private router: Router) { }

  checkLogin(account: LoginDTO) {

    this.sendLoginAndPassword(account)
      .subscribe(sh => this.isGoodLoginAndPassword = sh);
  }

  sendLoginAndPassword(account: LoginDTO): Observable<Boolean> {
    return this.httpClient.post<Boolean>('http://localhost:8085/admin/login', account);
  }

  logout() {
    this.isChangePassword = null;
    this.isLogout = true;
    this.isLogoutInfo = true;
    const tmplogin = this.login;
    this.login = '';
    return this.httpClient.get<Boolean>('http://localhost:8085/admin/logout/' + tmplogin);
  }

  checkTimeLogin() {
    this.timeLogout()
      .subscribe(ok => this.isTimeLogin = ok);
  }

  timeLogout() {
    return this.httpClient.get<Boolean>('http://localhost:8085/admin/time_logout/' + this.login);
  }

  changePassword(account: LoginDTO, newPassword: String) {
    account.login = this.login;
    this.changePasswordinDb(account, newPassword)
      .subscribe(sh => this.isChangePassword = sh);
  }

  changePasswordinDb(account: LoginDTO, newPassword: String) {
    return this.httpClient.post<Boolean>('http://localhost:8085/admin/change_password/' + newPassword, account);
  }

  checkSession() {
    if (!this.isTimeLogin) { // && this.login !== ''
      console.log('checkSession is true - Koniec sesji');
      this.login = '';
      this.isLogout = true;
      this.router.navigateByUrl('admin');
    }
  }

  getMailbox(): Observable<LoginDTO> {
    return this.httpClient.get<LoginDTO>('http://localhost:8085/admin/mailbox/' + this.login);
  }

  updateMailbox(mailbox: LoginDTO) {
    return this.httpClient.post<LoginDTO>('http://localhost:8085/admin/change_mailbox/' + this.login, mailbox);
  }
}
