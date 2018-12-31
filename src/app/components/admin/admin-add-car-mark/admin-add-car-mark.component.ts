import { Component, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { CarMarkService } from 'src/app/services/carMark.service';
import { Router } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { VehicleMarkDTO } from 'src/app/models/DTO/VehicleMarkDTO';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-admin-add-car-mark',
  templateUrl: './admin-add-car-mark.component.html',
  styleUrls: ['./admin-add-car-mark.component.css']
})
export class AdminAddCarMarkComponent implements OnInit, DoCheck {

  @Output() itemUploaded: EventEmitter<VehicleMarkDTO> = new EventEmitter();
  carMarkControl = new FormControl('', [Validators.required]);
  carMark: VehicleMarkDTO = new VehicleMarkDTO;
  isAllFields = true;
  titleLabel;
  constructor(private router: Router, private carMarkService: CarMarkService,
    public loginService: LoginService, public resourcer: StringResourcer) { }

  ngOnInit() {
    if (this.loginService.login === '') {
      this.router.navigateByUrl('admin');
    }
    this.getCarMark();
    if (this.carMarkService.isNewMark) {
      this.titleLabel = this.resourcer.AdminAddCarMarkTitleNew;
    } else {
      this.titleLabel = this.resourcer.AdminAddCarMarkTitleEdit;
    }
  }

  ngDoCheck() {
    this.loginService.checkSession();
  }

  getCarMark() {
    this.carMark = this.carMarkService.getCarMark();
  }

  approveMark() {
    this.loginService.checkTimeLogin();
    if (this.carMark.mark.trim() === '') {
      this.isAllFields = false;
      return;
    } else {
      this.carMarkService.addOrEditCarMark(this.carMark);
      this.router.navigateByUrl('cars-mark-database');
    }
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('admin/menu');
  }

  markButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('cars-mark-database');
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }

  isPressEnter(event) {
    if (event.key === 'Enter') {
      this.approveMark();
    }
  }
}
