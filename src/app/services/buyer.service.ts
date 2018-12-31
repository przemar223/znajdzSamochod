import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BuyerAndVehicleDriveWrapper } from '../models/BuyerAndVehicleDriveWrapper';
import { BuyersAndVehicleDriveWrapper } from '../models/BuyersAndVehicleDriveWrapper';
import { BuyerAndBuyerCarDTO } from '../models/DTO/BuyerAndBuyerCarDTO';
import { BuyerCarDTO } from '../models/DTO/BuyerCarDTO';
import { BuyerDTO } from '../models/DTO/BuyerDTO';
import { VehicleDriveDTO } from '../models/DTO/VehicleDriveDTO';
import { LoginService } from './login.service';
import { PotentialBuyerDTO } from '../models/DTO/PotentialBuyerDTO';

@Injectable({
    providedIn: 'root'
})
export class BuyerService {
    buyer: BuyerDTO = new BuyerDTO;
    buyers: BuyerDTO[];
    buyerCars: BuyerCarDTO[];
    isSell = false;
    wasAdd: Boolean = false;
    isNewBuyer: Boolean;

    potentialBuyers: PotentialBuyerDTO[];
    vehicleDrive: VehicleDriveDTO;
    idBody: String;
    wasPotential = false;

    constructor(private httpClient: HttpClient, public loginService: LoginService) { }

    clearBuyer() {
        this.isNewBuyer = true;
        this.buyer = new BuyerDTO;
    }

    setBuyer(selectedRow: BuyerDTO) {
        this.isNewBuyer = false;
        this.buyer = selectedRow;
    }

    getBuyer() {
        return this.buyer;
    }

    getBuyers() {
        this.wasAdd = false;
        this.getBuyersFromDb()
            .subscribe(sh => this.buyers = sh);
    }

    getBuyersFromDb(): Observable<BuyerDTO[]> {
        this.buyers = [];
        return this.httpClient.get<BuyerDTO[]>('http://localhost:8085/admin/buyers/' + this.loginService.login);
    }

    addOrEditBuyer(buyer: BuyerDTO) {
        this.wasAdd = true;
        this.buyers = [];
        this.addOrEditBuyerInDb(buyer)
            .subscribe(sh => this.buyers = sh);
    }

    addOrEditBuyerInDb(buyer: BuyerDTO): Observable<BuyerDTO[]> {
        this.buyers = [];
        return this.httpClient.post<BuyerDTO[]>(
            'http://localhost:8085/admin/add_edit_buyer/' + this.loginService.login, buyer);
    }

    removeBuyerInDb(buyer: BuyerDTO): Observable<BuyerDTO> {
        return this.httpClient.post<BuyerDTO>(
            'http://localhost:8085/admin/remove_buyer/' + this.loginService.login, buyer);
    }

    sendIdBuyer(id: String) {
        this.buyerCars = null;
        this.sendIDBuyerToDb(id)
            .subscribe(f => this.buyerCars = f);
    }

    sendIDBuyerToDb(id: String): Observable<BuyerCarDTO[]> {
        return this.httpClient.get<BuyerCarDTO[]>('http://localhost:8085/admin/id_buyer/'
            + this.loginService.login + '/' + id);
    }

    sellCar(buyerID: Number, carID: Number): Observable<BuyerDTO> {
        return this.httpClient.get<BuyerDTO>(
            'http://localhost:8085/admin/sell_car/' + this.loginService.login + '/' + buyerID + '/' + carID);
    }

    removeCar(car: BuyerCarDTO) {
        return this.httpClient.post<BuyerCarDTO>(
            'http://localhost:8085/admin/remove_buyer_car/' + this.loginService.login, car);
    }

    getBuyerAndBuyerCar(): Observable<BuyerAndBuyerCarDTO[]> {
        return this.httpClient.get<BuyerAndBuyerCarDTO[]>('http://localhost:8085/admin/all_sold_cars/' + this.loginService.login);
    }

    searchPotentialBuyers(carDrive: VehicleDriveDTO, idBody: String) {
        this.vehicleDrive = carDrive;
        this.idBody = idBody;
        this.searchPotentialByersInDb(carDrive, idBody)
            .subscribe(sh => this.potentialBuyers = sh);
    }

    private searchPotentialByersInDb(carDrive: VehicleDriveDTO, idBody: String): Observable<PotentialBuyerDTO[]> {
        this.potentialBuyers = [];

        if (carDrive.id === null) {
            carDrive.id = 0;
        }

        return this.httpClient.post<PotentialBuyerDTO[]>('http://localhost:8085/admin/search_potential_buyers/'
            + this.loginService.login + '/' + idBody, carDrive);
    }

    sendEmailToAll(wrapper: BuyersAndVehicleDriveWrapper): Observable<BuyersAndVehicleDriveWrapper> {
        wrapper.vehicleDriveDTO = this.vehicleDrive;
        return this.httpClient.post<BuyersAndVehicleDriveWrapper>('http://localhost:8085/admin/send_email_to_all/'
            + this.loginService.login + '/' + this.idBody, wrapper);
    }

    sendEmailToId(wrapper: BuyerAndVehicleDriveWrapper): Observable<BuyerAndVehicleDriveWrapper> {
        wrapper.vehicleDriveDTO = this.vehicleDrive;
        return this.httpClient.post<BuyerAndVehicleDriveWrapper>('http://localhost:8085/admin/send_email_to_id/'
            + this.loginService.login + '/' + this.idBody, wrapper);
    }
}
