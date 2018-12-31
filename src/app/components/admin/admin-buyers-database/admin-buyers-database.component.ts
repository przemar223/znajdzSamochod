import { Component, OnInit, EventEmitter, Output, DoCheck, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { BuyerService } from 'src/app/services/buyer.service';
import { CarBodyAndDriveService } from 'src/app/services/carBodyAndDrive.service';
import { LoginService } from 'src/app/services/login.service';
import { BuyerDTO } from 'src/app/models/DTO/BuyerDTO';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-admin-buyers-database',
  templateUrl: './admin-buyers-database.component.html',
  styleUrls: ['./admin-buyers-database.component.css']
})
export class AdminBuyersDatabaseComponent implements OnInit, DoCheck {

  @Output() itemClicked: EventEmitter<BuyerDTO> = new EventEmitter();
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'sex', 'phone', 'email', 'previewButton'];
  dataSource;
  selectedRowIndex = '-1';
  selectedRow: BuyerDTO;
  buyers: BuyerDTO[];
  isSell: boolean;
  @ViewChild(MatSort) sort: MatSort;

  firstName = false;
  lastName = false;
  sex = false;
  phone = false;
  email = false;
  label = '';
  remember = '';
  info = this.resourcer.OperationSuccessfully;
  isInfo = false;
  hint = this.resourcer.AdminBuyersSearchFirstNameLastNameSexPhoneAddress;
  i = 1;

  constructor(private router: Router, private buyerService: BuyerService,
    private carBodyAndDriveService: CarBodyAndDriveService, public loginService: LoginService,
    public resourcer: StringResourcer) { }

  ngOnInit() {
    this.i = 1;
    this.buyers = [];
    if (this.buyerService.wasAdd === false) {
      this.buyerService.getBuyers();
    } else {
      this.isInfo = true;
    }
    this.buyerService.wasAdd = false;
    this.dataSource = new MatTableDataSource(this.buyers);
    this.isSell = this.buyerService.isSell;
    if (this.isSell) {
      this.displayedColumns.push('sellButton');
    }
  }

  ngDoCheck() {
    this.loginService.checkSession();
    if (this.buyerService.buyers && this.buyerService.buyers.length > 0 && this.i === 1) {
      this.buyers = this.buyerService.buyers;
      this.dataSource = new MatTableDataSource(this.buyers);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter) ||
          data.lastName.toLowerCase().includes(filter) ||
          data.sex.toLowerCase().includes(filter) ||
          data.phone.toLowerCase().includes(filter) ||
          data.email.toLowerCase().includes(filter);
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
    if (this.firstName) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter);
      };
    } else if (this.lastName) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.model.toLowerCase().includes(filter);
      };
    } else if (this.sex) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.sex.toLowerCase().includes(filter);
      };
    } else if (this.phone) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.phone.toLowerCase().includes(filter);
      };
    } else if (this.email) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.email.toLowerCase().includes(filter);
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

  addBuyerButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.buyerService.clearBuyer();
    this.router.navigateByUrl('admin/add-buyer');
  }

  editBuyerButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.buyerService.setBuyer(this.selectedRow);
    this.router.navigateByUrl('admin/add-buyer');
  }

  removeBuyerButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.buyerService.buyers = this.buyers.filter(obj => obj !== this.selectedRow);
    this.buyerService.removeBuyerInDb(this.selectedRow)
      .subscribe(b => this.itemClicked.emit(b));
    if (this.buyerService.buyers.length === 0) {
      this.buyers = null;
    }
    this.info = this.resourcer.DeleteOperationSuccessfully;
    this.isInfo = true;
    this.selectedRowIndex = '-1';
  }

  previewCarButton(element) {
    this.loginService.checkTimeLogin();
    this.buyerService.wasPotential = false;
    this.i = 1;
    this.selectedRowIndex = element.id;
    this.selectedRow = element;
    this.buyerService.setBuyer(element);
    this.buyerService.sendIdBuyer(this.selectedRowIndex);
    this.router.navigateByUrl('admin/buyer-cars');
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.buyerService.isSell = false;
    this.router.navigateByUrl('admin/menu');
  }

  sellCarButton(element) {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.buyerService.isSell = false;
    this.buyerService.sellCar(element.id, this.carBodyAndDriveService.vehicleDrive.id)
      .subscribe();
    this.menuButton();
  }

  backToCarsButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.buyerService.isSell = false;
    this.router.navigateByUrl('cars-bodies');
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }

  onItemChange(item) {
    this.label = '';
    this.applyFilter('');
    if (this.remember === item) {
      this.hint = this.resourcer.AdminBuyersSearchFirstNameLastNameSexPhoneAddress;
      this.remember = '';
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter) ||
          data.lastName.toLowerCase().includes(filter) ||
          data.sex.toLowerCase().includes(filter) ||
          data.phone.toLowerCase().includes(filter) ||
          data.email.toLowerCase().includes(filter);
      };
      return;
    }

    if (item === 'firstName') {
      this.lastName = false;
      this.sex = false;
      this.phone = false;
      this.email = false;
      this.remember = item;
      this.hint = this.resourcer.AdminBuyersSearchFirstName;
      return;
    }
    if (item === 'lastName') {
      this.firstName = false;
      this.sex = false;
      this.phone = false;
      this.email = false;
      this.remember = item;
      this.hint = this.resourcer.AdminBuyersSearchLastName;
      return;
    }
    if (item === 'sex') {
      this.firstName = false;
      this.lastName = false;
      this.phone = false;
      this.email = false;
      this.remember = item;
      this.hint = this.resourcer.AdminBuyersSearchSex;
      return;
    }
    if (item === 'phone') {
      this.firstName = false;
      this.lastName = false;
      this.sex = false;
      this.email = false;
      this.remember = item;
      this.hint = this.resourcer.AdminBuyersSearchPhone;
      return;
    }
    if (item === 'email') {
      this.firstName = false;
      this.lastName = false;
      this.sex = false;
      this.phone = false;
      this.remember = item;
      this.hint = this.resourcer.AdminBuyersSearchAddress;
      return;
    }
  }
}
