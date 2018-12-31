import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { BuyerService } from 'src/app/services/buyer.service';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { LoginService } from 'src/app/services/login.service';
import { BuyerDTO } from 'src/app/models/DTO/BuyerDTO';
import { StringResourcer } from 'src/app/stringResourcer';

@Component({
  selector: 'app-admin-add-buyer',
  templateUrl: './admin-add-buyer.component.html',
  styleUrls: ['./admin-add-buyer.component.css']
})
export class AdminAddBuyerComponent implements OnInit, DoCheck {

  @Output() itemUploaded: EventEmitter<BuyerDTO> = new EventEmitter();
  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  ageControl = new FormControl('', [Validators.required]);
  sexControl = new FormControl('', [Validators.required]);
  phoneControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required]);
  sexes: String[] = [this.resourcer.SexMale, this.resourcer.SexFemale];
  buyer: BuyerDTO = new BuyerDTO;
  isAllFields = true;
  titleLabel = '';

  constructor(private router: Router, private buyerService: BuyerService,
    public loginService: LoginService, public resourcer: StringResourcer) {
  }

  ngOnInit() {
    this.buyer = this.buyerService.getBuyer();
    if (this.buyerService.isNewBuyer) {
      this.titleLabel = this.resourcer.AdminAddBuyerTitleNew;
    } else {
      this.titleLabel = this.resourcer.AdminAddBuyerTitleEdit;
    }
  }

  ngDoCheck() {
    this.loginService.checkSession();
  }

  changeSex(sex: String) {
    if (sex) {
      this.buyer.sex = sex;
    } else {
      this.buyer.sex = '';
    }
  }

  isPressEnter(event) {
    if (event.key === 'Enter') {
      this.approveBuyerButton();
    }
  }

  approveBuyerButton() {
    this.loginService.checkTimeLogin();
    if (this.buyer.firstName.trim() === '' || this.buyer.lastName.trim() === '' ||
      this.buyer.age === '' || this.buyer.sex === '' || this.buyer.sex === null ||
      this.buyer.phone.trim() === '' || this.buyer.email.trim() === '' || this.buyer.age < 18 || this.buyer.age > 99) {
      this.isAllFields = false;
      return;
    } else {
      this.buyerService.addOrEditBuyer(this.buyer);
      this.router.navigateByUrl('admin/buyers-database');
    }
  }

  menuButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('admin/menu');
  }

  buyersButton() {
    this.loginService.checkTimeLogin();
    this.router.navigateByUrl('admin/buyers-database');
  }

  logoutButton() {
    this.loginService.logout()
      .subscribe();
    this.router.navigateByUrl('admin');
  }
}
