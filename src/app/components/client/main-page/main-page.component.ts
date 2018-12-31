import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarShowroomService } from 'src/app/services/carShowroom.service';
import { StringResourcer } from 'src/app/stringResourcer.js';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router, private carShowroomService: CarShowroomService,
    public resourcer: StringResourcer) { }

  ngOnInit() {
  }

  showShowroomsButton() {
    this.carShowroomService.getShowroomsAll();
    this.router.navigateByUrl('/showrooms-database');
  }

  showCarMarksButton() {
    this.router.navigateByUrl('cars-mark-database');
  }

  showCarDbButton() {
    this.router.navigateByUrl('cars-database');
  }

  seachYourCarButton() {
    this.router.navigateByUrl('/user-preferences');
  }

}
