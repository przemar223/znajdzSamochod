import { Component, OnInit, EventEmitter, Output, DoCheck, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BuyerService } from 'src/app/services/buyer.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { LoginService } from 'src/app/services/login.service';
import { BuyerCarDTO } from 'src/app/models/DTO/BuyerCarDTO';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-admin-buyer-cars',
  templateUrl: './admin-buyer-cars.component.html',
  styleUrls: ['./admin-buyer-cars.component.css']
})
export class AdminBuyerCarsComponent implements OnInit, DoCheck {

  @Output() sendItem: EventEmitter<BuyerCarDTO> = new EventEmitter();
  displayedColumns: string[] = ['carSegment', 'mark', 'model', 'body', 'trunkCapacity',
    'drive', 'engine', 'acceleration', 'horsePower', 'fuelConsumption', 'price', 'date'];
  dataSource;
  selectedRowIndex = '-1';
  selectedRow: BuyerCarDTO;
  buyerCars: BuyerCarDTO[];

  carSegment = false;
  mark = false;
  model = false;
  body = false;
  drive = false;
  date = false;
  remember = '';
  label = '';
  i = 1;
  hint = this.resourcer.AdminBuyerCarsSearchSegmentMarkModelBodyDriveDate;
  wasPotential;
  info = this.resourcer.DeleteOperationSuccessfully;
  isInfo = false;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, public buyerService: BuyerService,
    public loginService: LoginService, public resourcer: StringResourcer) { }

  ngOnInit() {
    this.i = 1;
    this.wasPotential = this.buyerService.wasPotential;
  }

  ngDoCheck() {
    this.loginService.checkSession();
    if (this.buyerService.buyerCars && this.buyerService.buyerCars.length > 0 && this.i === 1) {
      this.buyerCars = this.buyerService.buyerCars;
      this.dataSource = new MatTableDataSource(this.buyerCars);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.carSegment.toLowerCase().includes(filter) ||
          data.mark.toLowerCase().includes(filter) ||
          data.model.toLowerCase().includes(filter) ||
          data.date.toLowerCase().includes(filter) ||
          data.drive.toLowerCase().includes(filter) ||
          data.body.toLowerCase().includes(filter);
      };
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
    if (this.mark) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.mark.toLowerCase().includes(filter);
      };
    } else if (this.model) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.model.toLowerCase().includes(filter);
      };
    } else if (this.carSegment) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.carSegment.toLowerCase().includes(filter);
      };
    } else if (this.drive) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.drive.toLowerCase().includes(filter);
      };
    } else if (this.body) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.body.toLowerCase().includes(filter);
      };
    } else if (this.date) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.date.toLowerCase().includes(filter);
      };
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isBuyerChecked() {
    if (this.selectedRowIndex === '-1') {
      return true;
    } else {
      return false;
    }
  }

  backButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    if (this.wasPotential) {
      this.router.navigateByUrl('admin/potential-buyers-database');
    } else {
      this.router.navigateByUrl('admin/buyers-database');
    }
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.router.navigateByUrl('admin/menu');
  }

  sellCarButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.buyerService.isSell = true;
    this.router.navigateByUrl('cars-database');
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }

  isCarChecked() {
    if (this.selectedRowIndex === '-1') {
      return true;
    } else {
      return false;
    }
  }

  removeCarButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.buyerService.buyerCars = this.buyerService.buyerCars.filter(obj => obj !== this.selectedRow);
    this.buyerCars = this.buyerService.buyerCars;
    this.dataSource = new MatTableDataSource(this.buyerService.buyerCars);
    this.buyerService.removeCar(this.selectedRow)
      .subscribe(carMark => this.sendItem.emit(carMark));
    this.info = this.resourcer.DeleteOperationSuccessfully;
    this.isInfo = true;
    this.selectedRowIndex = '-1';
  }

  onItemChange(tmp) {
    this.label = '';
    this.applyFilter('');
    if (this.remember === tmp) {
      this.hint = this.resourcer.AdminBuyerCarsSearchSegmentMarkModelBodyDriveDate;
      this.remember = '';
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.carSegment.toLowerCase().includes(filter) ||
          data.mark.toLowerCase().includes(filter) ||
          data.model.toLowerCase().includes(filter) ||
          data.date.toLowerCase().includes(filter) ||
          data.drive.toLowerCase().includes(filter) ||
          data.body.toLowerCase().includes(filter);
      };
      return;
    }
    if (tmp === 'mark') {
      this.carSegment = false;
      this.model = false;
      this.body = false;
      this.drive = false;
      this.date = false;
      this.remember = tmp;
      this.hint = this.resourcer.AdminBuyerCarsSearchMark;
      return;
    }
    if (tmp === 'model') {
      this.mark = false;
      this.carSegment = false;
      this.body = false;
      this.drive = false;
      this.date = false;
      this.remember = tmp;
      this.hint = this.resourcer.AdminBuyerCarsSearchModel;
      return;
    }
    if (tmp === 'carSegment') {
      this.mark = false;
      this.model = false;
      this.body = false;
      this.drive = false;
      this.date = false;
      this.remember = tmp;
      this.hint = this.resourcer.AdminBuyerCarsSearchSegment;
      return;
    }
    if (tmp === 'body') {
      this.mark = false;
      this.model = false;
      this.carSegment = false;
      this.drive = false;
      this.date = false;
      this.remember = tmp;
      this.hint = this.resourcer.AdminBuyerCarsSearchBody;
      return;
    }
    if (tmp === 'drive') {
      this.mark = false;
      this.model = false;
      this.date = false;
      this.carSegment = false;
      this.body = false;
      this.remember = tmp;
      this.hint = this.resourcer.AdminBuyerCarsSearchDrive;
      return;
    }
    if (tmp === 'date') {
      this.mark = false;
      this.model = false;
      this.drive = false;
      this.carSegment = false;
      this.body = false;
      this.remember = tmp;
      this.hint = this.resourcer.AdminBuyerCarsSearchDate;
      return;
    }
  }
}
