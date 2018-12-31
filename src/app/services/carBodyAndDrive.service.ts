import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { VehicleBodyDTO } from '../models/DTO/VehicleBodyDTO';
import { VehicleDriveDTO } from '../models/DTO/VehicleDriveDTO';

@Injectable({
  providedIn: 'root'
})
export class CarBodyAndDriveService {
  @Output() sendItemBody: EventEmitter<VehicleBodyDTO> = new EventEmitter();
  @Output() sendItemDrive: EventEmitter<VehicleDriveDTO> = new EventEmitter();

  vehicleBodyName: String = '';
  vehicleBodyID: String = '';
  vehicleBodies: VehicleBodyDTO[];
  vehicleBody: VehicleBodyDTO = new VehicleBodyDTO;

  idModel: String = '';
  isNewBody: Boolean;
  isNewDrive: Boolean;
  isNewModel: Boolean;
  wasAdd = false;
  vehicleDrive: VehicleDriveDTO = new VehicleDriveDTO;

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getAllBodiesAndDrivesSpecificModel(id: String) {
    this.vehicleBodies = null;
    this.idModel = id;
    this.sendIdCarModel(id)
      .subscribe(finishCars => this.vehicleBodies = finishCars);
  }

  sendIdCarModel(id: String): Observable<VehicleBodyDTO[]> {
    this.wasAdd = false;
    if (this.loginService.login !== '') {
      return this.httpClient.get<VehicleBodyDTO[]>('http://localhost:8085/admin/id_car_mark/'
        + this.loginService.login + '/' + id);
    } else {
      return this.httpClient.get<VehicleBodyDTO[]>('http://localhost:8085/admin/id_car_mark/' + id);
    }
  }

  addOrEditCarBody(carBody: VehicleBodyDTO) {
    this.wasAdd = true;
    this.addOrEditCarBodyInDb(carBody)
      .subscribe(sh => this.vehicleBodies = sh);
  }

  private addOrEditCarBodyInDb(carBody: VehicleBodyDTO): Observable<VehicleBodyDTO[]> {
    this.vehicleBodies = [];
    if (carBody.id === null) {
      carBody.id = 0;
    }

    return this.httpClient.post<VehicleBodyDTO[]>('http://localhost:8085/admin/add_edit_car_body/'
      + this.loginService.login + '/' + this.idModel, carBody);
  }

  removeCarBody(carBody: VehicleBodyDTO) {
    this.removeCarBodyFromDB(carBody)
      .subscribe(car => this.sendItemBody.emit(car));
  }

  private removeCarBodyFromDB(carBody: VehicleBodyDTO): Observable<VehicleBodyDTO> {
    return this.httpClient.post<VehicleBodyDTO>(
      'http://localhost:8085/admin/remove_car_body/' + this.loginService.login, carBody);
  }

  setVehicleBody(body: VehicleBodyDTO) {
    this.isNewBody = false;
    this.vehicleBody = body;
  }

  clearVehicleBody() {
    this.isNewBody = true;
    this.vehicleBody = new VehicleBodyDTO;
  }

  getVehicleBody() {
    return this.vehicleBody;
  }

  setVehicleBodyName(body: String) {
    this.vehicleBodyName = body;
  }

  getVehicleBodyName() {
    return this.vehicleBodyName;
  }

  addOrEditCarDrive(carDrive: VehicleDriveDTO) {
    this.wasAdd = true;
    this.addOrEditCarDriveInDb(carDrive)
      .subscribe(sh => this.vehicleBodies = sh);
  }

  private addOrEditCarDriveInDb(carDrive: VehicleDriveDTO): Observable<VehicleBodyDTO[]> {
    this.vehicleBodies = [];

    if (carDrive.id === null) {
      carDrive.id = 0;
    }

    return this.httpClient.post<VehicleBodyDTO[]>('http://localhost:8085/admin/add_edit_car_drive/'
      + this.loginService.login + '/' + this.vehicleBodyID, carDrive);
  }

  setVehicleDrive(drive: VehicleDriveDTO) {
    this.isNewDrive = false;
    this.vehicleDrive = drive;
  }

  clearVehicleDrive() {
    this.isNewDrive = true;
    this.vehicleDrive = new VehicleDriveDTO;
  }

  getVehicleDrive() {
    return this.vehicleDrive;
  }

  removeCarDrive(carDrive: VehicleDriveDTO) {
    this.removeCarDriveDB(carDrive)
      .subscribe(car => this.sendItemDrive.emit(car));
  }

  private removeCarDriveDB(carDrive: VehicleDriveDTO): Observable<VehicleDriveDTO> {
    return this.httpClient.post<VehicleDriveDTO>(
      'http://localhost:8085/admin/remove_car_drive/'
      + this.loginService.login + '/' + this.vehicleBody.id, carDrive);
  }
}
