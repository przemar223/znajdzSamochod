import { Component, DoCheck, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CarShowroomService } from 'src/app/services/carShowroom.service';
import { LoginService } from 'src/app/services/login.service';
import { VehicleMarkDTO } from 'src/app/models/DTO/VehicleMarkDTO';
import { ShowroomDTO } from 'src/app/models/DTO/ShowroomDTO';
import { BuyerService } from 'src/app/services/buyer.service';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-showrooms-database',
  templateUrl: './showrooms-database.component.html',
  styleUrls: ['./showrooms-database.component.css']
})
export class ShowroomsDatabaseComponent implements OnInit, DoCheck {

  @Output() sendItem: EventEmitter<VehicleMarkDTO> = new EventEmitter();
  displayedColumns: string[] = ['mark', 'address', 'province'];
  dataSource;
  selectedRowIndex = '-1';
  selectedRow: ShowroomDTO;
  @ViewChild(MatSort) sort: MatSort;
  i = 1;
  checkboxPosition = '';
  label = '';
  info = this.resourcer.OperationSuccessfully;
  isInfo = false;
  showrooms: ShowroomDTO[] = null;

  mark = false;
  address = false;
  province = false;
  remember = '';
  hint = this.resourcer.ShowroomsSearchByMarkAddressProvince;

  constructor(private router: Router,
    public showroomService: CarShowroomService,
    public loginService: LoginService, private buyerService: BuyerService, public resourcer: StringResourcer) {
    this.i = 1;
  }

  ngOnInit() {
    this.i = 1;
    if (this.showroomService.wasAdd === true) {
      this.isInfo = true;
    }
  }

  ngDoCheck() {
    if (!this.loginService.isLogout) {
      this.loginService.checkSession();
    }

    if (this.showroomService.showrooms && this.showroomService.showrooms.length > 0 && this.i === 1) {
      this.dataSource = new MatTableDataSource(this.showroomService.showrooms);
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

    if (this.mark) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.mark.toLowerCase().includes(filter);
      };
    } else if (this.address) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.address.toLowerCase().includes(filter);
      };
    } else if (this.province) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.province.toLowerCase().includes(filter);
      };
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isShowroomChecked() {
    if (this.selectedRowIndex === '-1') {
      return true;
    } else {
      return false;
    }
  }

  addShowroomButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.showroomService.clearShowroom();
    this.router.navigateByUrl('admin/add-showroom');
  }

  editShowroomButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.showroomService.setShowroom(this.selectedRow);
    this.router.navigateByUrl('admin/add-showroom');
  }

  removeShowroomButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.showroomService.showrooms = this.showroomService.showrooms.filter(obj => obj !== this.selectedRow);
    this.showroomService.removeShowroomsByID(this.selectedRow);
    this.showrooms = this.showroomService.showrooms;
    this.dataSource = new MatTableDataSource(this.showroomService.showrooms);
    this.info = this.resourcer.DeleteOperationSuccessfully;
    this.isInfo = true;
    this.selectedRowIndex = '-1';
  }

  menuButton() {
    if (this.loginService.isLogout) {
      this.router.navigateByUrl('main');
    } else {
      this.loginService.checkTimeLogin();
      this.router.navigateByUrl('admin/menu');
    }
  }

  backToMarkButton() {
    if (!this.loginService.isLogout) {
      this.loginService.checkTimeLogin();
    }
    this.router.navigateByUrl('cars-mark-database');
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
      this.hint = this.resourcer.ShowroomsSearchByMarkAddressProvince;
      this.remember = '';
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.mark.name.toLowerCase().includes(filter) ||
          data.address.mark.toLowerCase().includes(filter) ||
          data.province.toLowerCase().includes(filter);
      };
      return;
    }
    if (checkbox === 'mark') {
      this.hint = this.resourcer.ShowroomsSearchByMark;
      this.address = false;
      this.province = false;
      this.remember = checkbox;
      return;
    }
    if (checkbox === 'address') {
      this.hint = this.resourcer.ShowroomsSearchByAddress;
      this.province = false;
      this.mark = false;
      this.remember = checkbox;
      return;
    }
    if (checkbox === 'province') {
      this.hint = this.resourcer.ShowroomsSearchByProvince;
      this.mark = false;
      this.address = false;
      this.remember = checkbox;
      return;
    }
  }
}
