import { Component, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import strings from '../../strings.json';
import { LoginService } from 'src/app/services/login.service';
import { BuyerService } from 'src/app/services/buyer.service';
import { LoginDTO } from 'src/app/models/DTO/LoginDTO';
import { StringResourcer } from 'src/app/stringResourcer.js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  @Output() itemUploaded: EventEmitter<LoginDTO> = new EventEmitter();
  hide = true;
  login = '';
  password = '';
  isGoodLoginAndPassword = true;
  isLoginAndPassword = true;
  isLogoutInfo = false;
  logoutInfo = '';
  titleLabel;
  nextLabel;
  goToSearchingLabel;
  insertAllFieldsLabel;
  loginLabel;
  passwordLabel;
  badLoginOrPasswordLabel;
  account: LoginDTO = new LoginDTO;

  constructor(private router: Router,
    public loginService: LoginService, public resourcer: StringResourcer) {
  }

  ngOnInit() {
    this.logoutInfo = '';
    this.isLogoutInfo = this.loginService.isLogoutInfo;
    this.loginService.isLogoutInfo = false;
  }

  ngDoCheck() {
    // Czy poprawnie się zalogowano
    if (this.loginService.isGoodLoginAndPassword) {
      this.loginService.isTimeLogin = true;
      this.isLogoutInfo = true; // ukrycie etykiety
      this.loginService.login = this.login;
      this.router.navigateByUrl('/admin/menu');
    } else if (this.loginService.isGoodLoginAndPassword === false) { // złe hasło
      this.isLogoutInfo = false; // ukrycie etykiety
      this.isGoodLoginAndPassword = false;
    }

    // Czy się wylogowano
    if (this.isLogoutInfo === true) {
      this.isLogoutInfo = true;  // pokazanie etykiety
      this.logoutInfo = 'Wylogowano!';
    }

    // Upłynął czas
    if (this.loginService.isTimeLogin === false) {
      this.isLogoutInfo = true;  // pokazanie etykiety
      this.logoutInfo = 'Przekroczony czas!';
    }
  }

  isPressEnter(event) {
    if (event.key === 'Enter') {
      this.loginAdminButton();
    }
  }

  loginAdminButton() {
    // Czy puste pole
    if (this.login === '' || this.password === '') {
      this.isGoodLoginAndPassword = true;
      this.isLoginAndPassword = false;
      this.loginService.isGoodLoginAndPassword = null;
      this.isLogoutInfo = false;
      return;
    }

    // Jest wszystko uzupełnione
    this.isLoginAndPassword = true;
    // Hashowanie
    const md5 = new Md5();
    const hash: String = Md5.hashStr(this.password) as string;
    // Można sprawdzać
    this.account.login = this.login;
    this.account.password = hash;

    this.loginService.checkLogin(this.account);
  }

  searchButton() {
    this.router.navigateByUrl('/main');
  }
}
