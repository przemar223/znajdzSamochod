import { Component, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { CarBodyAndDriveService } from 'src/app/services/carBodyAndDrive.service';
import { FormControl, Validators } from '@angular/forms';
import { CarSegmentService } from 'src/app/services/carSegment.service';
import { CarModelService } from 'src/app/services/carModel.service';
import { CarMarkService } from 'src/app/services/carMark.service';
import { LoginService } from 'src/app/services/login.service';
import { VehicleModelDTO } from 'src/app/models/DTO/VehicleModelDTO';
import { DictionaryCarSegmentDTO } from 'src/app/models/DTO/DictionaryCarSegmentDTO';
import { VehicleMarkDTO } from 'src/app/models/DTO/VehicleMarkDTO';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-admin-add-car-model',
  templateUrl: './admin-add-car-model.component.html',
  styleUrls: ['./admin-add-car-model.component.css']
})
export class AdminAddCarModelComponent implements OnInit, DoCheck {

  @Output() itemUploaded: EventEmitter<VehicleModelDTO> = new EventEmitter();
  segmentControl = new FormControl('', [Validators.required]);
  markControl = new FormControl('', [Validators.required]);
  modelControl = new FormControl('', [Validators.required]);
  urlControl = new FormControl('', [Validators.required]);

  maleControl = new FormControl('', [Validators.required]);
  femaleControl = new FormControl('', [Validators.required]);
  pupilControl = new FormControl('', [Validators.required]);
  studentControl = new FormControl('', [Validators.required]);
  adultControl = new FormControl('', [Validators.required]);
  pensionerControl = new FormControl('', [Validators.required]);

  male: String = '';
  female: String = '';
  pupil: String = '';
  student: String = '';
  adult: String = '';
  pensioner: String = '';

  carModel: VehicleModelDTO = new VehicleModelDTO;
  carSegments: DictionaryCarSegmentDTO[];
  carMarks: VehicleMarkDTO[];
  titleLabel: String;
  isAllFields = true;

  constructor(private router: Router, private carBodyAndDriveService: CarBodyAndDriveService,
    private carSegmentService: CarSegmentService, private carService: CarModelService,
    private carMarkService: CarMarkService, public loginService: LoginService,
    public resourcer: StringResourcer) { }

  ngOnInit() {
    this.getSegments();
    this.carMarkService.getCarMarks();
    this.carModel = this.carService.getVehicleModel();
    if (this.carService.isNewModel) {
      this.titleLabel = this.resourcer.AdminAddCarModelTitleNew;
    } else {
      this.titleLabel = this.resourcer.AdminAddCarModelTitleEdit;
    }
  }

  ngDoCheck() {
    this.loginService.checkSession();
    this.carMarks = this.carMarkService.vehicleMarks;
  }

  getSegments() {
    this.carSegmentService.getCarSegments()
      .subscribe(cars => this.carSegments = cars);
  }

  changeMark(mark: String) {
    if (mark) {
      this.carModel.mark = mark;
    } else {
      this.carModel.mark = '';
    }
  }

  changeSegment(segment: String) {
    if (segment) {
      this.carModel.segment = segment;
    } else {
      this.carModel.segment = '';
    }
  }

  approveModelButton() {
    this.loginService.checkTimeLogin();

    if (this.carModel.model.trim() === '' || this.carModel.mark.trim() === '' ||
      this.carModel.segment.trim() === '' || this.carModel.url.trim() === '' ||
      this.carModel.ownerDetailsPreferences.male === null || this.carModel.ownerDetailsPreferences.female === null ||
      this.carModel.ownerDetailsPreferences.pupil === null || this.carModel.ownerDetailsPreferences.student === null ||
      this.carModel.ownerDetailsPreferences.adult === null || this.carModel.ownerDetailsPreferences.pensioner === null) {
      this.isAllFields = false;
      return;
    } else {
      this.carService.addOrEditModel(this.carModel);
      this.router.navigateByUrl('cars-database');
    }
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('admin/menu');
  }

  backButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('cars-database');
  }

  logoutButton() {
    this.loginService.checkTimeLogin();
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }

  openURLButton() {
    this.loginService.checkTimeLogin();
    window.open(this.carModel.url + '', '_blank');
  }

  isPressEnter(event) {
    if (event.key === 'Enter') {
      this.approveModelButton();
    }
  }
}
