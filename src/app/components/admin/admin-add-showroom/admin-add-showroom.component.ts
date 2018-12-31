import { Component, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarMarkService } from 'src/app/services/carMark.service';
import { LoginService } from 'src/app/services/login.service';
import { ShowroomDTO } from 'src/app/models/DTO/ShowroomDTO';
import { ProvinceDTO } from 'src/app/models/DTO/ProvinceDTO';
import { VehicleMarkDTO } from 'src/app/models/DTO/VehicleMarkDTO';
import { ProvinceService } from 'src/app/services/province.service';
import { CarShowroomService } from 'src/app/services/carShowroom.service';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-admin-add-showroom',
  templateUrl: './admin-add-showroom.component.html',
  styleUrls: ['./admin-add-showroom.component.css']
})
export class AdminAddShowroomComponent implements OnInit, DoCheck {

  @Output() itemUploaded: EventEmitter<ShowroomDTO> = new EventEmitter();

  provinceControl = new FormControl('', [Validators.required]);
  markControl = new FormControl('', [Validators.required]);
  addressControl = new FormControl('', [Validators.required]);

  isAllFields = true;
  showroom: ShowroomDTO;
  provinces: ProvinceDTO[];
  carMarks: VehicleMarkDTO[];
  isOpenFromAll = true;
  titleLabel;

  constructor(private router: Router, private provinceService: ProvinceService,
    private carShowroomService: CarShowroomService, private carMarkService: CarMarkService,
    public loginService: LoginService, public resourcer: StringResourcer) {
    this.getShowroom();
    if (this.carShowroomService.idMark !== '-1') {
      this.isOpenFromAll = false;
    }
    this.getProvinces();
    this.carMarkService.getCarMarks();
  }

  ngOnInit() {
    if (this.carShowroomService.isNewShowroom) {
      this.titleLabel = this.resourcer.AdminAddShowroomTitleNew;
    } else {
      this.titleLabel = this.resourcer.AdminAddShowroomTitleEdit;
    }
  }

  ngDoCheck() {
    this.loginService.checkSession();
    this.carMarks = this.carMarkService.vehicleMarks;
  }

  getShowroom() {
    this.showroom = this.carShowroomService.getShowroom();
  }

  getProvinces() {
    this.provinceService.getProvinces()
      .subscribe(provinces => this.provinces = provinces);
  }

  approveShowroomButton() {
    this.loginService.checkTimeLogin();
    if (this.showroom.mark === '' || this.showroom.province === '' || this.showroom.address.trim() === '') {
      this.isAllFields = false;
      return;
    } else {
      this.carShowroomService.idMark = '-1';
      this.addOrEditShowroomInDb();
      this.router.navigateByUrl('showrooms-database');
    }
  }

  changeMark(mark: String) {
    if (mark) {
      this.showroom.mark = mark;
    } else {
      this.showroom.mark = '';
    }
  }

  changeProvince(province: String) {
    if (province) {
      this.showroom.province = province;
    } else {
      this.showroom.province = '';
    }
  }

  addOrEditShowroomInDb() {
    this.carShowroomService.addOrEditShowroomInDb(this.showroom);
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('admin/menu');
  }

  showroomsButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('showrooms-database');
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }

  isPressEnter(event) {
    if (event.key === 'Enter') {
      this.approveShowroomButton();
    }
  }
}
