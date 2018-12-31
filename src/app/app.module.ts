import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatStepperModule,
  MatRippleModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatTableModule,
  MatTabsModule,
  MatTreeModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatGridListModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSortModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSidenavModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatMenuModule
} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CustomerRequirementsService } from './services/customerRequirements.service';
import { LoginService } from './services/login.service';

import { MatTableDataSource } from '@angular/material';
import { CarSegmentService } from './services/carSegment.service';
import { CarBodyService } from './services/carBody.service';
import { CarShowroomService } from './services/carShowroom.service';
import { ProvinceService } from './services/province.service';
import { CarPurposeService } from './services/carPurpose.service';
import { CarBodyAndDriveService } from './services/carBodyAndDrive.service';
import { CarMarkService } from './services/carMark.service';
import { BuyerService } from './services/buyer.service';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MainPageComponent } from './components/client/main-page/main-page.component';
import { UserPreferencesComponent } from './components/client/user-preferences/user-preferences.component';
import { CarResultsComponent } from './components/client/car-results/car-results.component';
import { AdminMenuComponent } from './components/admin/admin-menu/admin-menu.component';
import { AdminBuyersDatabaseComponent } from './components/admin/admin-buyers-database/admin-buyers-database.component';
import { CarsModelsDatabaseComponent } from './components/adminAndClient/cars-models-database/cars-models-database.component';
import { AdminAddBuyerComponent } from './components/admin/admin-add-buyer/admin-add-buyer.component';
import { AdminAddShowroomComponent } from './components/admin/admin-add-showroom/admin-add-showroom.component';
import { ShowroomsDatabaseComponent } from './components/adminAndClient/showrooms-database/showrooms-database.component';
import { CarsBodiesDatabaseComponent } from './components/adminAndClient/cars-bodies-database/cars-bodies-database.component';
import { CarsMarksDatabaseComponent } from './components/adminAndClient/cars-marks-database/cars-marks-database.component';
import { AdminAddCarMarkComponent } from './components/admin/admin-add-car-mark/admin-add-car-mark.component';
import { AdminAddCarBodyComponent } from './components/admin/admin-add-car-body/admin-add-car-body.component';
import { AdminAddCarDriveComponent } from './components/admin/admin-add-car-drive/admin-add-car-drive.component';
import { AdminAddCarModelComponent } from './components/admin/admin-add-car-model/admin-add-car-model.component';
import { AdminBuyerCarsComponent } from './components/admin/admin-buyer-cars/admin-buyer-cars.component';
import { AdminChangePasswordComponent } from './components/admin/admin-change-password/admin-change-password.component';
import { LoginComponent } from './components/login/login.component';
import { AdminBuyersAndCarsDatabaseComponent } from './components/admin/admin-buyers-and-cars-database/admin-buyers-and-cars-database.component';
import { AdminChangeMailboxComponent } from './components/admin/admin-change-mailbox/admin-change-mailbox.component';
import { AdminPotentialBuyersDatabaseComponent } from './components/admin/admin-potential-buyers-database/admin-potential-buyers-database.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UserPreferencesComponent,
    CarResultsComponent,
    AdminMenuComponent,
    AdminBuyersDatabaseComponent,
    CarsModelsDatabaseComponent,
    AdminAddBuyerComponent,
    AdminAddShowroomComponent,
    ShowroomsDatabaseComponent,
    CarsBodiesDatabaseComponent,
    CarsMarksDatabaseComponent,
    AdminAddCarMarkComponent,
    AdminAddCarBodyComponent,
    AdminAddCarDriveComponent,
    AdminAddCarModelComponent,
    AdminBuyerCarsComponent,
    AdminBuyersAndCarsDatabaseComponent,
    AdminChangePasswordComponent,
    LoginComponent,
    AdminChangeMailboxComponent,
    AdminPotentialBuyersDatabaseComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    HttpModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRippleModule,
    MatTableModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  providers: [CustomerRequirementsService, BuyerService, CarSegmentService, CarBodyService,
    LoginService, ProvinceService, CarShowroomService, CarPurposeService, CarBodyAndDriveService, CarMarkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
