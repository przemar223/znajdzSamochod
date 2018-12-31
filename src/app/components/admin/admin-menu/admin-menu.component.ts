import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { BuyerService } from 'src/app/services/buyer.service';
import { CarMarkService } from 'src/app/services/carMark.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { LoginService } from 'src/app/services/login.service';
import { CarModelService } from 'src/app/services/carModel.service';
import { CarShowroomService } from 'src/app/services/carShowroom.service';
import { LoginDTO } from 'src/app/models/DTO/LoginDTO';
import { CarBodyAndDriveService } from 'src/app/services/carBodyAndDrive.service';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit, DoCheck {

  info: Boolean = true;
  changePasswordInfo: String;
  constructor(private router: Router,
    private buyerService: BuyerService,
    private carMarkService: CarMarkService,
    private carModelService: CarModelService,
    private carShowroomService: CarShowroomService,
    public loginService: LoginService,
    public resourcer: StringResourcer) {
    this.loginService.isGoodLoginAndPassword = null;
  }

  ngOnInit() {
    this.loginService.isLogout = false;
    this.info = true;
  }

  ngDoCheck() {
    this.loginService.checkSession();

    if (this.loginService.isChangePassword === true) {
      this.changePasswordInfo = this.resourcer.AdminMenuChangePasswordSuccess;
      this.info = false;
    } else if (this.loginService.isChangePassword === false) {
      this.changePasswordInfo = this.resourcer.AdminMenuChangePasswordDefead;
      this.info = false;
    }
  }

  showShowroomsButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.carShowroomService.getShowroomsAll();
    this.router.navigateByUrl('/showrooms-database');
  }

  showBuyersButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.router.navigateByUrl('/admin/buyers-database');
  }

  showCarDbButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.router.navigateByUrl('cars-database');
  }

  addShowroomButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.carShowroomService.clearShowroom();
    this.carShowroomService.getShowroomsAll();
    this.router.navigateByUrl('admin/add-showroom');
  }

  addBuyerButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.buyerService.clearBuyer();
    this.router.navigateByUrl('/admin/add-buyer');
  }

  showCarMarksButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.router.navigateByUrl('cars-mark-database');
  }

  addCarMarkButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.carMarkService.clearCarMark();
    this.router.navigateByUrl('admin/add-mark');
  }

  addCarModelButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.carModelService.clearVehicleModel();
    this.router.navigateByUrl('admin/add-car-model');
  }

  showAllSendCarsButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.router.navigateByUrl('/admin/buyers-and-buyers-cars-database');
  }

  changePasswordButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.router.navigateByUrl('/admin/change-password');
  }

  changeMailboxButton() {
    this.loginService.checkTimeLogin();
    this.loginService.isChangePassword = null;
    this.router.navigateByUrl('/admin/change-mailbox');
  }

  logoutButton() {
    this.loginService.isChangePassword = null;
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }
}
