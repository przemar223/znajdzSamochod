import { Component, OnInit, EventEmitter, DoCheck, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { CarMarkService } from 'src/app/services/carMark.service';
import { CarShowroomService } from 'src/app/services/carShowroom.service';
import { LoginService } from 'src/app/services/login.service';
import { VehicleMarkDTO } from 'src/app/models/DTO/VehicleMarkDTO';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-cars-marks-database',
  templateUrl: './cars-marks-database.component.html',
  styleUrls: ['./cars-marks-database.component.css']
})
export class CarsMarksDatabaseComponent implements OnInit, DoCheck {

  displayedColumns: string[] = ['mark'];
  dataSource;
  selectedRowIndex = '-1';
  selectedRow: VehicleMarkDTO;
  info = this.resourcer.OperationSuccessfully;
  isInfo = false;
  i = 1;
  @Output() sendItem: EventEmitter<VehicleMarkDTO> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  carMarks: VehicleMarkDTO[];

  constructor(private router: Router, private carMarkService: CarMarkService,
    private showroomService: CarShowroomService, public loginService: LoginService,
    public resourcer: StringResourcer) { }

  ngOnInit() {
    if (this.carMarkService.wasAdd === false) {
      this.carMarkService.getCarMarks();
    } else {
      this.isInfo = true;
    }
    this.carMarkService.wasAdd = false;
  }

  ngDoCheck() {
    if (!this.loginService.isLogout) {
      this.loginService.checkSession();
    }

    if (this.carMarkService.vehicleMarks && this.carMarkService.vehicleMarks.length > 0 && this.i === 1) {
      this.carMarks = this.carMarkService.vehicleMarks;
      this.dataSource = new MatTableDataSource(this.carMarks);
      this.dataSource.sort = this.sort;
      this.i = this.i + 1;
    }
  }

  highlight(element) {
    if (this.selectedRowIndex !== element.id) {
      this.selectedRowIndex = element.id;
      this.selectedRow = element;
    } else {
      this.selectedRowIndex = '-1';
      this.selectedRow = null;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isCarMarkChecked() {
    if (this.selectedRowIndex === '-1') {
      return true;
    } else {
      return false;
    }
  }

  addCarMarkButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.carMarkService.clearCarMark();
    this.router.navigateByUrl('admin/add-mark');
  }

  editCarMarkButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.carMarkService.setCarMark(this.selectedRow);
    this.router.navigateByUrl('admin/add-mark');
  }

  removeCarMarkButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.info = this.resourcer.DeleteOperationSuccessfully;
    this.isInfo = true;
    this.carMarkService.vehicleMarks = this.carMarks.filter(obj => obj !== this.selectedRow);
    this.carMarkService.removeCarMarkInDb(this.selectedRow)
      .subscribe(carMark => this.sendItem.emit(carMark));

    this.selectedRowIndex = '-1';
  }

  previewCarMarkButton() {
    if (!this.loginService.isLogout) {
      this.loginService.checkTimeLogin();
    }
    this.i = 1;
    this.getCarShowroomsFromDb();
    this.router.navigateByUrl('showrooms-database');
  }

  getCarShowroomsFromDb() {
    this.showroomService.getShowroomsByID(this.selectedRowIndex, this.selectedRow.mark);
  }

  menuButton() {
    if (this.loginService.isLogout) {
      this.router.navigateByUrl('main');
    } else {
      this.loginService.checkTimeLogin();
      this.router.navigateByUrl('admin/menu');
    }
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }
}
