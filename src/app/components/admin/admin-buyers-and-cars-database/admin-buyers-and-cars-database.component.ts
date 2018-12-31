import { Component, OnInit, Output, EventEmitter, ViewChild, DoCheck } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { BuyerService } from 'src/app/services/buyer.service';
import { LoginService } from 'src/app/services/login.service';
import { BuyerAndBuyerCarDTO } from 'src/app/models/DTO/BuyerAndBuyerCarDTO';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-admin-buyers-and-cars-database',
  templateUrl: './admin-buyers-and-cars-database.component.html',
  styleUrls: ['./admin-buyers-and-cars-database.component.css']
})
export class AdminBuyersAndCarsDatabaseComponent implements OnInit, DoCheck {


  @Output() itemClicked: EventEmitter<BuyerAndBuyerCarDTO> = new EventEmitter();
  displayedColumns: string[] = ['carSegment', 'mark', 'model', 'body', 'trunkCapacity',
    'drive', 'engine', 'horsePower', 'fuelConsumption', 'price', 'date', 'firstName', 'lastName'];
  dataSource;
  selectedRowIndex = '-1';
  selectedRow: BuyerAndBuyerCarDTO;
  cars: BuyerAndBuyerCarDTO[];
  isSell: boolean;
  @ViewChild(MatSort) sort: MatSort;

  carSegment = false;
  mark = false;
  model = false;
  body = false;
  drive = false;
  date = false;
  firstName = false;
  lastName = false;
  label = '';
  remember = '';
  hint = this.resourcer.AdminBuyerAndCarsSearchSegmentMarkModelBodyDriveDateFirstNameLastName;
  i = 1;

  constructor(private router: Router, private buyerService: BuyerService,
    public loginService: LoginService, public resourcer: StringResourcer) { }

  ngOnInit() {
    this.i = 1;
    this.cars = [];
    this.getBuyers();
    this.dataSource = new MatTableDataSource(this.cars);
    this.isSell = this.buyerService.isSell;
    if (this.isSell) {
      this.displayedColumns.push('sellButton');
    }
  }

  ngDoCheck() {
    this.loginService.checkSession();
    if (this.cars && this.cars.length > 0 && this.i === 1) {
      this.dataSource = new MatTableDataSource(this.cars);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter) ||
          data.lastName.toLowerCase().includes(filter) ||
          data.carSegment.toLowerCase().includes(filter) ||
          data.mark.toLowerCase().includes(filter) ||
          data.model.toLowerCase().includes(filter) ||
          data.date.toLowerCase().includes(filter) ||
          data.drive.toLowerCase().includes(filter) ||
          data.body.toLowerCase().includes(filter);
      };
      this.i = this.i + 1;
    }
  }

  getBuyers() {
    this.buyerService.getBuyerAndBuyerCar()
      .subscribe(b => this.cars = b);
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
    if (this.firstName) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter);
      };
    } else if (this.lastName) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.model.toLowerCase().includes(filter);
      };
    } else if (this.carSegment) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.carSegment.toLowerCase().includes(filter);
      };
    } else if (this.mark) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.mark.toLowerCase().includes(filter);
      };
    } else if (this.model) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.model.toLowerCase().includes(filter);
      };
    } else if (this.body) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.body.toLowerCase().includes(filter);
      };
    } else if (this.drive) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.drive.toLowerCase().includes(filter);
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

  menuButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.buyerService.isSell = false;
    this.router.navigateByUrl('admin/menu');
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }

  onItemChange(checkbox) {
    this.label = '';
    this.applyFilter('');
    if (this.remember === checkbox) {
      this.hint = this.resourcer.AdminBuyerAndCarsSearchSegmentMarkModelBodyDriveDateFirstNameLastName;
      this.remember = '';
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter) ||
          data.lastName.toLowerCase().includes(filter) ||
          data.carSegment.toLowerCase().includes(filter) ||
          data.mark.toLowerCase().includes(filter) ||
          data.model.toLowerCase().includes(filter) ||
          data.date.toLowerCase().includes(filter) ||
          data.drive.toLowerCase().includes(filter) ||
          data.body.toLowerCase().includes(filter);
      };
      return;
    }
    if (checkbox === 'mark') {
      this.carSegment = false;
      this.model = false;
      this.body = false;
      this.drive = false;
      this.date = false;
      this.firstName = false;
      this.lastName = false;
      this.remember = checkbox;
      this.hint = this.resourcer.AdminBuyerAndCarsSearchMark;
      return;
    }
    if (checkbox === 'model') {
      this.mark = false;
      this.carSegment = false;
      this.body = false;
      this.drive = false;
      this.date = false;
      this.firstName = false;
      this.lastName = false;
      this.remember = checkbox;
      this.hint = this.resourcer.AdminBuyerAndCarsSearchModel;
      return;
    }
    if (checkbox === 'carSegment') {
      this.mark = false;
      this.model = false;
      this.body = false;
      this.drive = false;
      this.date = false;
      this.firstName = false;
      this.lastName = false;
      this.remember = checkbox;
      this.hint = this.resourcer.AdminBuyerAndCarsSearchSegment;
      return;
    }
    if (checkbox === 'body') {
      this.mark = false;
      this.model = false;
      this.carSegment = false;
      this.drive = false;
      this.date = false;
      this.firstName = false;
      this.lastName = false;
      this.remember = checkbox;
      this.hint = this.resourcer.AdminBuyerAndCarsSearchBody;
      return;
    }
    if (checkbox === 'drive') {
      this.mark = false;
      this.model = false;
      this.date = false;
      this.carSegment = false;
      this.body = false;
      this.firstName = false;
      this.lastName = false;
      this.remember = checkbox;
      this.hint = this.resourcer.AdminBuyerAndCarsSearchDrive;
      return;
    }
    if (checkbox === 'date') {
      this.mark = false;
      this.model = false;
      this.drive = false;
      this.carSegment = false;
      this.body = false;
      this.firstName = false;
      this.lastName = false;
      this.remember = checkbox;
      this.hint = this.resourcer.AdminBuyerAndCarsSearchDate;
      return;
    }
    if (checkbox === 'firstName') {
      this.lastName = false;
      this.mark = false;
      this.carSegment = false;
      this.body = false;
      this.drive = false;
      this.date = false;
      this.model = false;
      this.remember = checkbox;
      this.hint = this.resourcer.AdminBuyerAndCarsSearchFirstName;
      return;
    }
    if (checkbox === 'lastName') {
      this.firstName = false;
      this.mark = false;
      this.carSegment = false;
      this.body = false;
      this.drive = false;
      this.date = false;
      this.model = false;
      this.remember = checkbox;
      this.hint = this.resourcer.AdminBuyerAndCarsSearchLastName;
      return;
    }
  }
}
