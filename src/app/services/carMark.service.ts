import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';
import { VehicleMarkDTO } from '../models/DTO/VehicleMarkDTO';

@Injectable({
    providedIn: 'root'
})
export class CarMarkService {

    vehicleMark: VehicleMarkDTO = new VehicleMarkDTO;
    vehicleMarks: VehicleMarkDTO[];
    wasAdd = false;
    isNewMark;

    constructor(private httpClient: HttpClient, private loginService: LoginService) { }

    clearCarMark() {
        this.isNewMark = true;
        this.vehicleMark = new VehicleMarkDTO;
    }

    setCarMark(selectedRow: VehicleMarkDTO) {
        this.isNewMark = false;
        this.vehicleMark = selectedRow;
    }

    getCarMark() {
        return this.vehicleMark;
    }

    getCarMarks() {
        this.getCarMarksFromDb()
            .subscribe(cars => this.vehicleMarks = cars);
    }

    getCarMarksFromDb(): Observable<VehicleMarkDTO[]> {
        this.vehicleMarks = [];
        this.wasAdd = false;
        if (this.loginService.login !== '') {
            return this.httpClient.get<VehicleMarkDTO[]>('http://localhost:8085/admin/car_mark/' + this.loginService.login);
        } else {
            return this.httpClient.get<VehicleMarkDTO[]>('http://localhost:8085/admin/car_mark');
        }
    }

    addOrEditCarMark(vehicleMark: VehicleMarkDTO) {
        this.addOrEditCarMarkInDb(vehicleMark)
            .subscribe(sh => this.vehicleMarks = sh);
    }

    addOrEditCarMarkInDb(carMark: VehicleMarkDTO): Observable<VehicleMarkDTO[]> {
        this.vehicleMarks = [];
        this.wasAdd = true;
        return this.httpClient.post<VehicleMarkDTO[]>(
            'http://localhost:8085/admin/add_edit_car_mark/' + this.loginService.login, carMark);
    }

    removeCarMarkInDb(carMark: VehicleMarkDTO): Observable<VehicleMarkDTO> {
        return this.httpClient.post<VehicleMarkDTO>(
            'http://localhost:8085/admin/remove_car_mark/' + this.loginService.login, carMark);
    }
}
