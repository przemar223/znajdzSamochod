import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarPurposeService } from 'src/app/services/carPurpose.service';
import { ProvinceService } from 'src/app/services/province.service';

import { DictionaryPurposeDTO } from 'src/app/models/DTO/DictionaryPurposeDTO';
import { ProvinceDTO } from 'src/app/models/DTO/ProvinceDTO';
import { CustomerRequirements } from 'src/app/models/CustomerRequirements';
import { CustomerRequirementsService } from 'src/app/services/customerRequirements.service';
import { DictionaryCarDriveDTO } from 'src/app/models/DTO/DictionaryCarDriveDTO';
import { CarDriveService } from 'src/app/services/carDrive.service';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {
  @Output() itemUploaded: EventEmitter<CustomerRequirements> = new EventEmitter();
  carSizeControl = new FormControl('', [Validators.required]);
  carTypeControl = new FormControl('', [Validators.required]);
  carTrunkCapacityControl = new FormControl('', [Validators.required]);
  carDriveControl = new FormControl('', [Validators.required]);
  carAccelerationControl = new FormControl('', [Validators.required]);
  carPowerControl = new FormControl('', [Validators.required]);
  carFuelConsumptionControl = new FormControl('', [Validators.required]);
  carPriceControl = new FormControl('', [Validators.required]);
  customerSexControl = new FormControl('', [Validators.required]);
  customerAgeControl = new FormControl('', [Validators.required]);
  amountCarControl = new FormControl('', [Validators.required]);
  provinceControl = new FormControl('', [Validators.required]);

  selectedSize = '';
  selectedType = '';
  selectedTrunkCapacity = '';
  selectedDrive: DictionaryCarDriveDTO;
  selectedAcceleration = '';
  selectedPower = '';
  selectedFuelConsumption = '';
  selectedPrice = '';
  selectedSex = '';
  selectedAge = '';
  selectedAmountCars = '10';
  selectedProvince = '';

  carTypes: DictionaryPurposeDTO[];
  type: DictionaryPurposeDTO;
  provinces: ProvinceDTO[];
  sizes0: String[] = [this.resourcer.ClientUserPreferencesSmallBody, this.resourcer.ClientUserPreferencesBigBody];
  sizes: String[] = [this.resourcer.ClientUserPreferencesSmall1, this.resourcer.ClientUserPreferencesMedium1,
  this.resourcer.ClientUserPreferencesBig1];
  sizes2: String[] = [this.resourcer.ClientUserPreferencesVerySmall2, this.resourcer.ClientUserPreferencesSmall2,
  this.resourcer.ClientUserPreferencesMedium2, this.resourcer.ClientUserPreferencesBig2, this.resourcer.ClientUserPreferencesVeryBig2];
  sizes3: String[] = [this.resourcer.ClientUserPreferencesVerySmall3, this.resourcer.ClientUserPreferencesSmall3,
  this.resourcer.ClientUserPreferencesMedium3, this.resourcer.ClientUserPreferencesBig3, this.resourcer.ClientUserPreferencesVeryBig3];
  sizes4: String[] = [this.resourcer.ClientUserPreferencesSmall2, this.resourcer.ClientUserPreferencesMedium2,
  this.resourcer.ClientUserPreferencesBig2];

  drives: DictionaryCarDriveDTO[];
  sexes: String[] = [this.resourcer.SexMale, this.resourcer.SexFemale];
  ages: String[] = [this.resourcer.ClientUserPreferencesPupil, this.resourcer.ClientUserPreferencesStudent,
  this.resourcer.ClientUserPreferencesAdult, this.resourcer.ClientUserPreferencesPensioner];
  isAllFields = true;
  formData: FormData = new FormData();
  customerRequirements: CustomerRequirements = new CustomerRequirements;

  constructor(private router: Router, private customerRequirementsService: CustomerRequirementsService,
    private carTypeService: CarPurposeService, private provinceService: ProvinceService,
    private carDriveService: CarDriveService, public resourcer: StringResourcer) { }

  ngOnInit() {
    this.getTypes();
    this.getProvinces();
    this.getDrives();
  }

  getTypes() {
    this.carTypeService.getTypes()
      .subscribe(type => this.carTypes = type);
  }

  getProvinces() {
    this.provinceService.getProvinces()
      .subscribe(province => this.provinces = province);
  }

  getDrives() {
    this.carDriveService.getCarDrives()
      .subscribe(province => this.drives = province);
  }

  changeType(tmp: String) {
    if (tmp === 'Wysokie') {
      this.type = this.carTypes.find(x => x.name === this.resourcer.ClientUserPreferencesSportBody);
      this.carTypes = this.carTypes.filter(obj => obj !== this.type);
      this.selectedType = '';
    } else {
      this.type = this.carTypes.find(x => x.name === this.resourcer.ClientUserPreferencesSportBody);
      if (!this.type) {
        this.type = new DictionaryPurposeDTO;
        this.type.name = this.resourcer.ClientUserPreferencesSportBody;
        this.carTypes.push(this.type);
      }
    }
  }

  searchButton() {
    this.showPreferences();
    if (this.selectedSize === '' || this.selectedType === '' || this.selectedTrunkCapacity === '' ||
      this.selectedDrive.name === '' || this.selectedAcceleration === '' || this.selectedPower === '' ||
      this.selectedFuelConsumption === '' || this.selectedPrice === '' || this.selectedSex === '' ||
      this.selectedAge === '') {
      this.isAllFields = false;
      return;
    } else {
      this.isAllFields = true;
      this.customerRequirements.size = this.selectedSize;
      this.customerRequirements.type = this.selectedType;
      this.customerRequirements.trunkCapacity = this.selectedTrunkCapacity;
      this.customerRequirements.drive = this.selectedDrive.name;
      this.customerRequirements.acceleration = this.selectedAcceleration;
      this.customerRequirements.power = this.selectedPower;
      this.customerRequirements.fuelConsumption = this.selectedFuelConsumption;
      this.customerRequirements.price = this.selectedPrice;
      this.customerRequirements.sex = this.selectedSex;
      this.customerRequirements.age = this.selectedAge;
      this.customerRequirements.amountCars = this.selectedAmountCars;
      this.customerRequirements.province = this.selectedProvince;

      this.customerRequirementsService.send(this.customerRequirements);
      if (this.selectedAmountCars === '1') {
        this.customerRequirementsService.form = this.resourcer.ClientUserPreferencesCar;
      } else if (this.selectedAmountCars === '2' || this.selectedAmountCars === '3' || this.selectedAmountCars === '4') {
        this.customerRequirementsService.form = this.resourcer.ClientUserPreferencesCars;
      } else {
        this.customerRequirementsService.form = this.resourcer.ClientUserPreferencesCars2;
      }
      this.customerRequirementsService.amount = this.selectedAmountCars;
      this.router.navigateByUrl('car-results');
    }
  }

  showPreferences() {
    console.log(this.sizes);
    console.log('Rozmiar nadwozia: ' + this.selectedSize);
    console.log('Przeznaczenie: ' + this.selectedType);
    console.log('Pojemność bagażnika: ' + this.selectedTrunkCapacity);
    console.log('Napęd: ' + this.selectedDrive.name);
    console.log('Silnik: ' + this.selectedAcceleration);
    console.log('Moc: ' + this.selectedPower);
    console.log('Spalanie: ' + this.selectedFuelConsumption);
    console.log('Cena: ' + this.selectedPrice);
    console.log('Płeć: ' + this.selectedSex);
    console.log('Wiek: ' + this.selectedAge);
    console.log('Ilość wynikow: ' + this.selectedAmountCars);
    console.log('Wojewodztwo: ' + this.selectedProvince);
    console.log(this.carTypes);
  }

  backButton() {
    this.router.navigateByUrl('main');
  }
}
