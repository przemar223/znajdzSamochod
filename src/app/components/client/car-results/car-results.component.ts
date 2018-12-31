import { Component, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { FinishCar } from 'src/app/models/FinishCar';
import { CustomerRequirementsService } from 'src/app/services/customerRequirements.service';
import { Router } from '@angular/router';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-car-results',
  templateUrl: './car-results.component.html',
  styleUrls: ['./car-results.component.css']
})
export class CarResultsComponent implements OnInit, DoCheck {

  finishCars: FinishCar[];
  panelOpenState = false;
  i = 1;

  constructor(public customerRequirementsService: CustomerRequirementsService,
    private router: Router, public resourcer: StringResourcer) { }

  ngOnInit() {
    this.finishCars = [];
  }

  ngDoCheck() {
    if (this.customerRequirementsService.finishCars && this.customerRequirementsService.finishCars.length > 0 && this.i === 1) {
      this.finishCars = this.customerRequirementsService.finishCars;
      this.i = this.i + 1;
    }
  }

  menuButton() {
    this.i = 1;
    this.router.navigateByUrl('main');
  }

  backButton() {
    this.i = 1;
    this.router.navigateByUrl('user-preferences');
  }
}
