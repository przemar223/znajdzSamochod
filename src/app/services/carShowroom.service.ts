import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './login.service';
import { ShowroomDTO } from '../models/DTO/ShowroomDTO';

@Injectable({
  providedIn: 'root'
})
export class CarShowroomService {
  @Output() sendItem: EventEmitter<ShowroomDTO> = new EventEmitter();

  showroom: ShowroomDTO = new ShowroomDTO;
  showrooms: ShowroomDTO[];
  idMark: String;
  isNewShowroom;
  wasMarkList;
  wasAdd = false;
  mark;

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  setShowroom(showroom: ShowroomDTO) {
    this.isNewShowroom = false;
    this.showroom = showroom;
  }

  getShowroom() {
    return this.showroom;
  }

  clearShowroom() {
    this.isNewShowroom = true;
    this.showroom = new ShowroomDTO;
  }

  getShowroomsByID(id: String, mark: String) {
    this.mark = mark;
    this.wasMarkList = true;
    this.showrooms = [];
    this.idMark = id;
    this.wasAdd = false;
    this.sendIDCarMark(id)
      .subscribe(showrooms => this.showrooms = showrooms);
  }

  private sendIDCarMark(id: String): Observable<ShowroomDTO[]> {
    if (this.loginService.login !== '') {
      return this.httpClient.get<ShowroomDTO[]>('http://localhost:8085/admin/id_car_mark_get_showrooms/'
        + this.loginService.login + '/' + id);
    }
    return this.httpClient.get<ShowroomDTO[]>('http://localhost:8085/admin/id_car_mark_get_showrooms/' + id);
  }

  getShowroomsAll() {
    this.mark = '';
    this.wasMarkList = false;
    this.showrooms = [];
    this.idMark = '-1';
    this.wasAdd = false;
    this.getCarsShowrooms()
      .subscribe(showrooms => this.showrooms = showrooms);
  }

  private getCarsShowrooms(): Observable<ShowroomDTO[]> {
    if (this.loginService.login !== '') {
      return this.httpClient.get<ShowroomDTO[]>('http://localhost:8085/admin/showrooms_list/'
        + this.loginService.login);
    }
    return this.httpClient.get<ShowroomDTO[]>('http://localhost:8085/admin/showrooms_list/');

  }

  removeShowroomsByID(showroom: ShowroomDTO) {
    this.removeCarsShowrooms(showroom)
      .subscribe(carMark => this.sendItem.emit(carMark));
  }

  removeCarsShowrooms(showroom: ShowroomDTO): Observable<ShowroomDTO> {
    return this.httpClient.post<ShowroomDTO>(
      'http://localhost:8085/admin/remove_showroom/' + this.loginService.login, showroom);
  }

  addOrEditShowroomInDb(showroom: ShowroomDTO) {
    this.wasAdd = true;
    this.sendIDMarkProvinceAddressCarShowroom(showroom)
      .subscribe(sh => this.showrooms = sh);
  }

  sendIDMarkProvinceAddressCarShowroom(showroom: ShowroomDTO): Observable<ShowroomDTO[]> {
    this.showrooms = [];
    if (showroom.id === null) {
      showroom.id = 0;
    }

    return this.httpClient.post<ShowroomDTO[]>('http://localhost:8085/admin/add_edit_showroom/'
      + this.loginService.login + '/' + this.idMark, showroom);
  }
}
