import { Component, OnInit, EventEmitter, DoCheck, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { CarModelService } from 'src/app/services/carModel.service';
import { BuyerService } from 'src/app/services/buyer.service';
import { LoginService } from 'src/app/services/login.service';
import { VehicleModelDTO } from 'src/app/models/DTO/VehicleModelDTO';
import { CarBodyAndDriveService } from 'src/app/services/carBodyAndDrive.service';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-cars-models-database',
  templateUrl: './cars-models-database.component.html',
  styleUrls: ['./cars-models-database.component.css']
})
export class CarsModelsDatabaseComponent implements OnInit, DoCheck {

  displayedColumns: string[] = ['segment', 'mark', 'model', 'url', 'button'];
  dataSource;
  selectedRowIndex = '-1';
  selectedRow: VehicleModelDTO;
  @Output() sendItem: EventEmitter<VehicleModelDTO> = new EventEmitter();
  checkboxPosition = '';
  label = '';
  i = 1;
  info = this.resourcer.OperationSuccessfully;
  isInfo = false;
  @ViewChild(MatSort) sort: MatSort;
  carsModels: VehicleModelDTO[];
  mark = false;
  segment = false;
  model = false;
  remember = '';
  hint = this.resourcer.CarsSearchBySegmentMarkModel;
  isSell = false;

  constructor(private router: Router, private carModelService: CarModelService,
    private carBodyAndDriveService: CarBodyAndDriveService, private buyerService: BuyerService,
    public loginService: LoginService, public resourcer: StringResourcer) {
    this.isSell = this.buyerService.isSell;
  }

  ngOnInit() {
    if (this.carModelService.wasAdd === false) {
      this.carModelService.getAllModels();
    } else {
      this.isInfo = true;
    }
    this.carModelService.wasAdd = false;
  }

  ngDoCheck() {
    if (!this.loginService.isLogout) {
      this.loginService.checkSession();
    }
    if (this.carModelService.vehicleModels && this.carModelService.vehicleModels.length > 0 && this.i === 1) {
      this.carsModels = this.carModelService.vehicleModels;
      this.dataSource = new MatTableDataSource(this.carsModels);
      this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
      this.dataSource.sort = this.sort;
      this.i = this.i + 1;
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.segment.toLowerCase().includes(filter) ||
          data.mark.toLowerCase().includes(filter) ||
          data.model.toLowerCase().includes(filter);
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

    if (this.segment) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.segment.toLowerCase().includes(filter);
      };
    } else if (this.mark) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.mark.toLowerCase().includes(filter);
      };
    } else if (this.model) {
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.model.toLowerCase().includes(filter);
      };
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isCarChecked() {
    if (this.selectedRowIndex === '-1') {
      return true;
    } else {
      return false;
    }
  }

  addCarButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.carModelService.clearVehicleModel();
    this.router.navigateByUrl('admin/add-car-model');
  }

  editCarButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.carModelService.vehicleModel = this.selectedRow;
    this.carModelService.setVehicleModel(this.selectedRow);
    this.router.navigateByUrl('admin/add-car-model');
  }

  removeCarButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.carModelService.vehicleModels = this.carModelService.vehicleModels.filter(obj => obj !== this.selectedRow);
    this.carModelService.removeCarModelInDb(this.selectedRow)
      .subscribe(carMark => this.sendItem.emit(carMark));
    this.info = this.resourcer.DeleteOperationSuccessfully;
    this.isInfo = true;
    this.selectedRowIndex = '-1';
  }

  previewCarButton(element) {
    if (!this.loginService.isLogout) {
      this.loginService.checkTimeLogin();
    }
    this.i = 1;
    this.selectedRowIndex = element.id;
    this.selectedRow = element;
    this.carModelService.setVehicleModel(this.selectedRow);
    this.sendIDToDb();
    this.router.navigateByUrl('cars-bodies');
  }

  sendIDToDb() {
    this.carBodyAndDriveService.getAllBodiesAndDrivesSpecificModel(this.selectedRowIndex);
  }

  menuButton() {
    this.buyerService.isSell = false;
    this.i = 1;
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

  onItemChange(asd) {
    this.label = '';
    this.applyFilter('');
    if (this.remember === asd) {
      this.hint = this.resourcer.CarsSearchBySegmentMarkModel;
      this.remember = '';
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.segment.toLowerCase().includes(filter) ||
          data.mark.toLowerCase().includes(filter) ||
          data.model.toLowerCase().includes(filter);
      };
      return;
    }
    if (asd === 'mark') {
      this.model = false;
      this.segment = false;
      this.remember = asd;
      this.hint = this.resourcer.CarsSearchByMark;
      return;
    }
    if (asd === 'model') {
      this.segment = false;
      this.mark = false;
      this.remember = asd;
      this.hint = this.resourcer.CarsSearchByModel;
      return;
    }
    if (asd === 'segment') {
      this.mark = false;
      this.model = false;
      this.remember = asd;
      this.hint = this.resourcer.CarsSearchBySegment;
      return;
    }
  }
}
