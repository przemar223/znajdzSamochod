import { Component, OnInit, EventEmitter, Output, DoCheck, ViewChild } from '@angular/core';
import { CarBodyAndDriveService } from 'src/app/services/carBodyAndDrive.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { BuyerService } from 'src/app/services/buyer.service';
import { LoginService } from 'src/app/services/login.service';
import { VehicleBodyDTO } from 'src/app/models/DTO/VehicleBodyDTO';
import { VehicleDriveDTO } from 'src/app/models/DTO/VehicleDriveDTO';
import { CarModelService } from 'src/app/services/carModel.service';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-cars-bodies-database',
  templateUrl: './cars-bodies-database.component.html',
  styleUrls: ['./cars-bodies-database.component.css']
})
export class CarsBodiesDatabaseComponent implements OnInit, DoCheck {

  displayedColumns: string[] = ['name', 'trunkCapacity'];
  dataSource;
  selectedRowIndex = '-1';
  selectedRow: VehicleBodyDTO;
  @Output() sendItem: EventEmitter<VehicleBodyDTO> = new EventEmitter();
  @ViewChild('hBSort') sort: MatSort;
  vehicleModel;
  vehicleMark;

  displayedColumns2: string[] = ['drive', 'engine', 'horsePower', 'acceleration', 'fuelConsumption', 'price'];
  dataSource2;
  selectedRowIndex2 = '-1';
  selectedRow2: VehicleDriveDTO;
  @Output() sendItem2: EventEmitter<VehicleDriveDTO> = new EventEmitter();
  @ViewChild('sBSort') sort2: MatSort;
  i = 1;
  carBodies: VehicleBodyDTO[];
  carDrives: VehicleDriveDTO[];
  info = this.resourcer.OperationSuccessfully;
  isInfo = false;
  isSell = false;
  fuelConsumptionUnit;
  engineUnit;

  constructor(private router: Router, private CarBodyAndDriveService: CarBodyAndDriveService,
    private buyerService: BuyerService, public loginService: LoginService,
    private carModelService: CarModelService, public resourcer: StringResourcer) {
    this.selectedRow = this.CarBodyAndDriveService.getVehicleBody();
    this.selectedRow2 = this.CarBodyAndDriveService.getVehicleDrive();
    this.isSell = this.buyerService.isSell;
    this.vehicleMark = this.carModelService.vehicleModel.mark;
    this.vehicleModel = this.carModelService.vehicleModel.model;
  }

  ngOnInit() {
    this.getBodies();
    this.dataSource = new MatTableDataSource();
    this.dataSource2 = new MatTableDataSource(this.carDrives);
    if (this.isSell) {
      this.displayedColumns2.push('sellButton');
    }
    if (this.CarBodyAndDriveService.wasAdd === true) {
      this.isInfo = true;
    }
  }

  ngDoCheck() {
    if (!this.loginService.isLogout) {
      this.loginService.checkSession();
    }

    if (this.CarBodyAndDriveService.vehicleBodies && this.CarBodyAndDriveService.vehicleBodies.length > 0 && this.i === 1) {
      this.dataSource = new MatTableDataSource(this.CarBodyAndDriveService.vehicleBodies);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
      this.dataSource2.sortingDataAccessor = (data, attribute) => data[attribute];
      this.dataSource2.sort = this.sort2;
      this.i = this.i + 1;
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.name.toLowerCase().includes(filter);
      };
    }
  }

  getBodies() {
    this.carBodies = this.CarBodyAndDriveService.vehicleBodies;
  }

  highlight(element) {

    if (this.selectedRowIndex !== element.id) {
      this.selectedRowIndex = element.id;
      this.selectedRow = element;
      this.CarBodyAndDriveService.vehicleBody = element;
      this.selectedRow2 = new VehicleDriveDTO;
      this.dataSource2 = new MatTableDataSource(element.vehicleDrives);
      this.dataSource2.sortingDataAccessor = (data, attribute) => data[attribute];
      this.dataSource2.sort = this.sort2;
      this.CarBodyAndDriveService.vehicleBodyName = element.name;
      if (element.vehicleDrives[0].drive === 'Elektryczny') {
        this.engineUnit = 'kWh';
        this.fuelConsumptionUnit = 'kWh/100km';
      } else {
        this.engineUnit = 'l';
        this.fuelConsumptionUnit = 'l/100km';
      }
    } else {
      this.selectedRowIndex = '-1';
      this.selectedRowIndex2 = '-1';
      this.CarBodyAndDriveService.vehicleBody = new VehicleBodyDTO;
      this.selectedRow = new VehicleBodyDTO;
      this.selectedRow2 = new VehicleDriveDTO;
      this.dataSource2 = new MatTableDataSource();
      this.dataSource2.sort = this.sort2;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isBodyChecked() {
    if (this.selectedRowIndex === '-1') {
      return true;
    } else {
      return false;
    }
  }

  addBodyButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.CarBodyAndDriveService.clearVehicleBody();
    this.router.navigateByUrl('admin/add-car-body');
  }

  editBodyButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.CarBodyAndDriveService.setVehicleBody(this.selectedRow);
    this.router.navigateByUrl('admin/add-car-body');
  }

  removeBodyButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.CarBodyAndDriveService.vehicleBodies = this.CarBodyAndDriveService.vehicleBodies.filter(obj => obj !== this.selectedRow);
    this.CarBodyAndDriveService.removeCarBody(this.selectedRow);
    this.carBodies = this.CarBodyAndDriveService.vehicleBodies;
    this.dataSource = new MatTableDataSource(this.CarBodyAndDriveService.vehicleBodies);
    this.dataSource2 = new MatTableDataSource();
    this.info = this.resourcer.DeleteOperationSuccessfully;
    this.isInfo = true;
    this.selectedRowIndex = '-1';
    this.selectedRowIndex2 = '-1';
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

  backToModelButton() {
    if (!this.loginService.isLogout) {
      this.loginService.checkTimeLogin();
    }
    this.i = 1;
    this.router.navigateByUrl('cars-database');
  }

  sendIDToDb() {
    this.CarBodyAndDriveService.getAllBodiesAndDrivesSpecificModel(this.CarBodyAndDriveService.idModel);
  }

  // *************************************************************************** //
  highlight2(element2) {
    if (this.selectedRowIndex2 !== element2.id) {
      this.selectedRowIndex2 = element2.id;
      this.selectedRow2 = element2;
    } else {
      this.selectedRowIndex2 = '-1';
    }
  }

  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  isDriveChecked() {
    if (this.selectedRowIndex2 === '-1') {
      return true;
    } else {
      return false;
    }
  }

  addDriveButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.CarBodyAndDriveService.vehicleBodyID = this.selectedRowIndex;
    this.CarBodyAndDriveService.vehicleBodyName = this.selectedRow.name;
    this.CarBodyAndDriveService.clearVehicleDrive();
    this.router.navigateByUrl('admin/add-car-drive');
  }

  editDriveButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.CarBodyAndDriveService.vehicleBodyID = this.selectedRowIndex;
    this.CarBodyAndDriveService.setVehicleDrive(this.selectedRow2);
    this.router.navigateByUrl('admin/add-car-drive');
  }

  removeDriveButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    const a = this.CarBodyAndDriveService.vehicleBodies.indexOf(this.selectedRow);
    this.CarBodyAndDriveService.vehicleBodies[a].vehicleDrives =
      this.CarBodyAndDriveService.vehicleBodies[a].vehicleDrives.filter(obj => obj !== this.selectedRow2);
    this.CarBodyAndDriveService.removeCarDrive(this.selectedRow2);
    this.carBodies = this.CarBodyAndDriveService.vehicleBodies;
    this.dataSource2 = new MatTableDataSource(this.CarBodyAndDriveService.vehicleBodies[a].vehicleDrives);
    this.dataSource2.sortingDataAccessor = (data, attribute) => data[attribute];

    this.selectedRowIndex2 = '-1';
  }

  // przejscie do klientow
  sellDriveButton() {
    this.loginService.checkTimeLogin();
    this.i = 1;
    this.CarBodyAndDriveService.vehicleDrive = this.selectedRow2;
    this.buyerService.isSell = true;
    this.router.navigateByUrl('admin/buyers-database');
  }

  // zakupienie danego auta przez klienta
  sellCarButton(element) {
    this.loginService.checkTimeLogin();
    this.buyerService.sellCar(this.buyerService.buyer.id, element.id)
      .subscribe();
    this.menuButton();
    this.buyerService.isSell = false;
  }
}
