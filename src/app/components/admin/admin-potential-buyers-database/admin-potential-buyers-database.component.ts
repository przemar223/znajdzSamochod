import { Component, OnInit, Output, EventEmitter, ViewChild, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { PotentialBuyerDTO } from 'src/app/models/DTO/PotentialBuyerDTO';
import { BuyerService } from 'src/app/services/buyer.service';
import { BuyerAndVehicleDriveWrapper } from 'src/app/models/BuyerAndVehicleDriveWrapper';
import { BuyersAndVehicleDriveWrapper } from 'src/app/models/BuyersAndVehicleDriveWrapper';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-admin-potential-buyers-database',
  templateUrl: './admin-potential-buyers-database.component.html',
  styleUrls: ['./admin-potential-buyers-database.component.css']
})
export class AdminPotentialBuyersDatabaseComponent implements DoCheck {

  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email', 'buttonPreview', 'label'];
  dataSource;
  selectedRowIndex = '-1';
  selectedRow: PotentialBuyerDTO;
  @Output() sendItem: EventEmitter<BuyerAndVehicleDriveWrapper> = new EventEmitter();
  @Output() sendItem2: EventEmitter<BuyersAndVehicleDriveWrapper> = new EventEmitter();
  checkboxPosition = '';
  label = '';
  i = 1;
  @ViewChild(MatSort) sort: MatSort;
  buyers: PotentialBuyerDTO[];
  firstName = false;
  lastName = false;
  remember = '';
  hint = this.resourcer.AdminPotentialBuyersSearchFirstNameLastName;
  isSell = false;
  emailButtonText = this.resourcer.AdminPotentialBuyersSendEmailToOne;
  isSendToAll = false;

  constructor(private router: Router, public loginService: LoginService,
    private buyerService: BuyerService, public resourcer: StringResourcer) { }

  ngDoCheck() {
    this.loginService.checkSession();
    if (this.buyerService.potentialBuyers && this.buyerService.potentialBuyers.length > 0 && this.i === 1) {
      this.buyers = this.buyerService.potentialBuyers;
      this.dataSource = new MatTableDataSource(this.buyers);
      this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
      this.dataSource.sort = this.sort;
      this.i = this.i + 1;
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter) ||
          data.lastName.toLowerCase().includes(filter);
      };
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
        return data.lastName.toLowerCase().includes(filter);
      };
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    if (this.loginService.isLogout) {
      this.router.navigateByUrl('main');
    } else {
      this.router.navigateByUrl('admin/menu');
    }
  }

  backButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.router.navigateByUrl('admin/add-car-drive');
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }

  previewCarButton(element) {
    this.loginService.checkTimeLogin();
    this.buyerService.wasPotential = true;
    this.i = 1;
    this.selectedRowIndex = element.id;
    this.selectedRow = element;
    this.buyerService.setBuyer(element);
    this.buyerService.sendIdBuyer(this.selectedRowIndex);
    this.router.navigateByUrl('admin/buyer-cars');
  }

  sendEmailButton() {
    this.loginService.checkTimeLogin();
    const wrapper: BuyerAndVehicleDriveWrapper = new BuyerAndVehicleDriveWrapper;
    wrapper.potentialBuyerDTO = this.selectedRow;
    this.buyerService.sendEmailToId(wrapper)
      .subscribe(b => this.sendItem.emit(b));
    this.selectedRow.label = this.resourcer.AdminPotentialBuyersSended;
    this.selectedRowIndex = '-1';
    this.selectedRow = null;
  }

  AllEmailButton() {
    this.loginService.checkTimeLogin();
    const wrapper: BuyersAndVehicleDriveWrapper = new BuyersAndVehicleDriveWrapper;
    wrapper.potentialBuyersDTO = this.buyers;
    this.buyerService.sendEmailToAll(wrapper)
      .subscribe(b => this.sendItem2.emit(b));
    this.isSendToAll = true;
    for (const buyer of this.buyers) {
      buyer.label = this.resourcer.AdminPotentialBuyersSended;
    }
  }

  isBuyerChecked() {
    if (this.selectedRowIndex === '-1') {
      return true;
    } else {
      return false;
    }
  }

  onItemChange(asd) {
    this.label = '';
    this.applyFilter('');
    if (this.remember === asd) {
      this.hint = this.resourcer.AdminPotentialBuyersSearchFirstNameLastName;
      this.remember = '';
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.firstName.toLowerCase().includes(filter) ||
          data.lastName.toLowerCase().includes(filter);
      };
      return;
    }
    if (asd === 'firstName') {
      this.lastName = false;
      this.remember = asd;
      this.hint = this.resourcer.AdminPotentialBuyersSearchFirstName;
      return;
    }
    if (asd === 'lastName') {
      this.firstName = false;
      this.remember = asd;
      this.hint = this.resourcer.AdminPotentialBuyersSearchLastName;
      return;
    }
  }
}
