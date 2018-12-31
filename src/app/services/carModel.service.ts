import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { VehicleModelDTO } from '../models/DTO/VehicleModelDTO';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  vehicleModels: VehicleModelDTO[];
  vehicleModel: VehicleModelDTO = new VehicleModelDTO;
  wasAdd: Boolean = false;
  isNewModel: Boolean;

  constructor(private httpClient: HttpClient, private loginService: LoginService) {
    this.vehicleModels = [];
  }

  setVehicleModel(model: VehicleModelDTO) {
    this.isNewModel = false;
    this.vehicleModel = model;
  }

  clearVehicleModel() {
    this.isNewModel = true;
    this.vehicleModel = new VehicleModelDTO;
  }

  getVehicleModel() {
    return this.vehicleModel;
  }

  getAllModels() {
    this.vehicleModels = [];
    this.wasAdd = false;
    this.getAllModelsFromDb()
      .subscribe(sh => this.vehicleModels = sh);
  }

  getAllModelsFromDb(): Observable<VehicleModelDTO[]> {
    if (this.loginService.login !== '') {
      return this.httpClient.get<VehicleModelDTO[]>('http://localhost:8085/admin/models/' + this.loginService.login);
    } else {
      return this.httpClient.get<VehicleModelDTO[]>('http://localhost:8085/admin/models');
    }
  }

  addOrEditModel(carModel: VehicleModelDTO) {
    this.vehicleModels = [];
    this.wasAdd = true;
    this.addOrEditCarModelInDb(carModel)
      .subscribe(sh => this.vehicleModels = sh);
  }

  addOrEditCarModelInDb(carModel: VehicleModelDTO): Observable<VehicleModelDTO[]> {
    return this.httpClient.post<VehicleModelDTO[]>(
      'http://localhost:8085/admin/add_edit_car_model/' + this.loginService.login, carModel);
  }

  removeCarModelInDb(carModel: VehicleModelDTO): Observable<VehicleModelDTO> {
    return this.httpClient.post<VehicleModelDTO>(
      'http://localhost:8085/admin/remove_car_model/' + this.loginService.login, carModel);
  }
}
