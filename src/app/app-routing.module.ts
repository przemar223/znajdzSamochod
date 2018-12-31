import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/client/main-page/main-page.component';
import { ShowroomsDatabaseComponent } from './components/adminAndClient/showrooms-database/showrooms-database.component';
import { CarsMarksDatabaseComponent } from './components/adminAndClient/cars-marks-database/cars-marks-database.component';
import { CarsModelsDatabaseComponent } from './components/adminAndClient/cars-models-database/cars-models-database.component';
import { CarsBodiesDatabaseComponent } from './components/adminAndClient/cars-bodies-database/cars-bodies-database.component';
import { UserPreferencesComponent } from './components/client/user-preferences/user-preferences.component';
import { CarResultsComponent } from './components/client/car-results/car-results.component';
import { AdminBuyersDatabaseComponent } from './components/admin/admin-buyers-database/admin-buyers-database.component';
import { AdminAddBuyerComponent } from './components/admin/admin-add-buyer/admin-add-buyer.component';
import { AdminMenuComponent } from './components/admin/admin-menu/admin-menu.component';
import { AdminAddShowroomComponent } from './components/admin/admin-add-showroom/admin-add-showroom.component';
import { AdminAddCarMarkComponent } from './components/admin/admin-add-car-mark/admin-add-car-mark.component';
import { AdminAddCarBodyComponent } from './components/admin/admin-add-car-body/admin-add-car-body.component';
import { AdminAddCarDriveComponent } from './components/admin/admin-add-car-drive/admin-add-car-drive.component';
import { AdminAddCarModelComponent } from './components/admin/admin-add-car-model/admin-add-car-model.component';
import { AdminBuyerCarsComponent } from './components/admin/admin-buyer-cars/admin-buyer-cars.component';
import { AdminChangePasswordComponent } from './components/admin/admin-change-password/admin-change-password.component';
import { AdminBuyersAndCarsDatabaseComponent } from './components/admin/admin-buyers-and-cars-database/admin-buyers-and-cars-database.component';
import { LoginComponent } from './components/login/login.component';
import { AdminChangeMailboxComponent } from './components/admin/admin-change-mailbox/admin-change-mailbox.component';
import { AdminPotentialBuyersDatabaseComponent } from './components/admin/admin-potential-buyers-database/admin-potential-buyers-database.component';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainPageComponent},
  {path: 'showrooms-database', component: ShowroomsDatabaseComponent},
  {path: 'cars-mark-database', component: CarsMarksDatabaseComponent},
  {path: 'cars-database', component: CarsModelsDatabaseComponent},
  {path: 'cars-bodies', component: CarsBodiesDatabaseComponent},
  {path: 'user-preferences', component: UserPreferencesComponent},
  {path: 'car-results', component: CarResultsComponent},
  {path: 'admin/buyers-database', component: AdminBuyersDatabaseComponent},
  {path: 'admin/add-buyer', component: AdminAddBuyerComponent},
  {path: 'admin/menu', component: AdminMenuComponent},
  {path: 'admin/add-showroom', component: AdminAddShowroomComponent},
  {path: 'admin/add-mark', component: AdminAddCarMarkComponent},
  {path: 'admin/add-car-body', component: AdminAddCarBodyComponent},
  {path: 'admin/add-car-drive', component: AdminAddCarDriveComponent},
  {path: 'admin/add-car-model', component: AdminAddCarModelComponent},
  {path: 'admin/buyer-cars', component: AdminBuyerCarsComponent},
  {path: 'admin/buyers-and-buyers-cars-database', component: AdminBuyersAndCarsDatabaseComponent},
  {path: 'admin/change-password', component: AdminChangePasswordComponent},
  {path: 'admin', component: LoginComponent},
  {path: 'admin/change-mailbox', component: AdminChangeMailboxComponent},
  {path: 'admin/potential-buyers-database', component: AdminPotentialBuyersDatabaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
