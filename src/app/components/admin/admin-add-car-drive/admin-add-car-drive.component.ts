import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarBodyAndDriveService } from 'src/app/services/carBodyAndDrive.service';
import { CarDriveService } from 'src/app/services/carDrive.service';
import { LoginService } from 'src/app/services/login.service';
import { VehicleDriveDTO } from 'src/app/models/DTO/VehicleDriveDTO';
import { DictionaryCarDriveDTO } from 'src/app/models/DTO/DictionaryCarDriveDTO';
import { CarModelService } from 'src/app/services/carModel.service';
import { BuyerService } from 'src/app/services/buyer.service';
import { StringResourcer } from 'src/app/stringResourcer';

@Component({
  selector: 'app-admin-add-car-drive',
  templateUrl: './admin-add-car-drive.component.html',
  styleUrls: ['./admin-add-car-drive.component.css']
})
export class AdminAddCarDriveComponent implements OnInit, DoCheck {

  driveControl = new FormControl('', [Validators.required]);
  engineControl = new FormControl('', [Validators.required]);
  horsePowerControl = new FormControl('', [Validators.required]);
  accelerationControl = new FormControl('', [Validators.required]);
  fuelConsumptionControl = new FormControl('', [Validators.required]);
  priceControl = new FormControl('', [Validators.required]);

  mark: String = '';
  model: String = '';
  body: String = '';
  carDrive: VehicleDriveDTO = new VehicleDriveDTO;
  consumptionUnit: String = '';
  drives: DictionaryCarDriveDTO[];
  titleLabel: String;
  i = 1;
  isAllFields = true;

  constructor(private router: Router, private carBodyAndDriveService: CarBodyAndDriveService,
    private driveService: CarDriveService, public loginService: LoginService,
    private carModelService: CarModelService, private buyerService: BuyerService,
    public resourcer: StringResourcer) { }

  ngOnInit() {
    this.mark = this.carModelService.vehicleModel.mark;
    this.model = this.carModelService.vehicleModel.model;
    this.body = this.carBodyAndDriveService.getVehicleBodyName();
    this.carDrive = this.carBodyAndDriveService.getVehicleDrive();
    this.getDrives();
    if (this.carBodyAndDriveService.isNewDrive) {
      this.titleLabel = this.resourcer.AdminAddCarDriveTitleNew;
    } else {
      this.titleLabel = this.resourcer.AdminAddCarDriveTitleEdit;
    }
  }

  ngDoCheck() {
    this.loginService.checkSession();
    if (this.drives && this.carDrive.drive !== '' && this.i === 1) {
      this.consumptionUnit = this.drives.find(item => item.name === this.carDrive.drive).consumptionUnit;
      this.i = this.i + 1;
    }
  }

  getDrives() {
    this.driveService.getCarDrives()
      .subscribe(cars => this.drives = cars);
  }

  changeDrive(drive: String) {
    if (drive) {
      this.consumptionUnit = this.drives.find(item => item.name === drive).consumptionUnit;
      this.carDrive.drive = drive;
    } else {
      this.consumptionUnit = '';
      this.carDrive.drive = '';
    }
  }

  approveDriveButton() {
    this.loginService.checkTimeLogin();
    if (this.checkFields()) {
      this.isAllFields = false;
      return;
    } else {
      this.addOrEditCarDriveInDb();
      this.router.navigateByUrl('cars-bodies');
    }
  }

  potentialBuyersButton() {
    this.loginService.checkTimeLogin();
    if (this.checkFields()) {
      this.isAllFields = false;
      return;
    } else {
      this.searchPotentialBuyers();
      this.router.navigateByUrl('admin/potential-buyers-database');
    }
  }

  checkFields() {
    if (this.carDrive.drive.trim() === '' || this.carDrive.drive.trim() === null || this.carDrive.price === null ||
      this.carDrive.horsePower === null || this.carDrive.engine === null ||
      this.carDrive.acceleration === null || this.carDrive.fuelConsumption === null) {
      return true;
    } else {
      return false;
    }
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('admin/menu');
  }

  backButton() {
    this.loginService.checkTimeLogin();
    this.carBodyAndDriveService.getAllBodiesAndDrivesSpecificModel(this.carBodyAndDriveService.idModel);
    this.router.navigateByUrl('cars-bodies');
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }

  addOrEditCarDriveInDb() {
    this.carBodyAndDriveService.addOrEditCarDrive(this.carDrive);
  }

  searchPotentialBuyers() {
    this.buyerService.searchPotentialBuyers(this.carDrive, this.carBodyAndDriveService.vehicleBodyID);
  }

  isPressEnter(event) {
    if (event.key === 'Enter') {
      this.approveDriveButton();
    }
  }
}
