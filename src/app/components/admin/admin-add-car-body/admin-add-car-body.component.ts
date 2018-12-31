import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { CarBodyAndDriveService } from 'src/app/services/carBodyAndDrive.service';
import { FormControl, Validators } from '@angular/forms';
import { CarBodyService } from 'src/app/services/carBody.service';
import { LoginService } from 'src/app/services/login.service';
import { VehicleBodyDTO } from 'src/app/models/DTO/VehicleBodyDTO';
import { BodyDTO } from 'src/app/models/DTO/BodyDTO';
import { CarModelService } from 'src/app/services/carModel.service';
import { DictionaryPurposeDTO } from 'src/app/models/DTO/DictionaryPurposeDTO';
import { CarPurposeService } from 'src/app/services/carPurpose.service';
import { StringResourcer } from 'src/app/stringResourcer';

@Component({
  selector: 'app-admin-add-car-body',
  templateUrl: './admin-add-car-body.component.html',
  styleUrls: ['./admin-add-car-body.component.css']
})
export class AdminAddCarBodyComponent implements OnInit, DoCheck {

  bodyControl = new FormControl('', [Validators.required]);
  trunkCapacityControl = new FormControl('', [Validators.required]);
  mark: String = '';
  model: String = '';
  carBody: VehicleBodyDTO = new VehicleBodyDTO;
  bodies: BodyDTO[];
  purposes: DictionaryPurposeDTO[];
  titleLabel: String = '';
  isAllFields = true;

  constructor(private router: Router, private carBodyAndDriveService: CarBodyAndDriveService,
    private bodyService: CarBodyService, public loginService: LoginService,
    private carModelService: CarModelService, public resourcer: StringResourcer) { }

  ngOnInit() {
    this.mark = this.carModelService.vehicleModel.mark;
    this.model = this.carModelService.vehicleModel.model;
    this.carBody = this.carBodyAndDriveService.getVehicleBody();
    this.getBodies();
    if (this.carBodyAndDriveService.isNewBody) {
      this.titleLabel = this.resourcer.AdminAddCarBodyTitleNew;
    } else {
      this.titleLabel = this.resourcer.AdminAddCarBodyTitleEdit;
    }
  }

  ngDoCheck() {
    this.loginService.checkSession();
  }

  getBodies() {
    this.bodyService.getCarBodies()
      .subscribe(cars => this.bodies = cars);
  }

  changeBody(body: String) {
    if (body) {
      this.carBody.name = body;
    } else {
      this.carBody.name = '';
    }
  }

  changePurpose(purpose: String) {
    if (purpose) {
      this.carBody.purpose = purpose;
    } else {
      this.carBody.purpose = '';
    }
  }

  approveBodyButton() {
    this.loginService.checkTimeLogin();
    if (this.carBody.name.trim() === '' || this.carBody.name.trim() === null || this.carBody.trunkCapacity === null) {
      this.isAllFields = false;
      return;
    } else {
      this.addOrEditCarBodyInDb();
      this.router.navigateByUrl('cars-bodies');
    }
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('admin/menu');
  }

  backButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('cars-bodies');
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }

  addOrEditCarBodyInDb() {
    this.carBodyAndDriveService.addOrEditCarBody(this.carBody);
  }

  isPressEnter(event) {
    if (event.key === 'Enter') {
      this.approveBodyButton();
    }
  }
}
