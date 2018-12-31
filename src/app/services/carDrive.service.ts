import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { DictionaryCarDriveDTO } from '../models/DTO/DictionaryCarDriveDTO';

@Injectable({
  providedIn: 'root'
})

export class CarDriveService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getCarDrives(): Observable<DictionaryCarDriveDTO[]> {
    return this.httpClient.get<DictionaryCarDriveDTO[]>('http://localhost:8085/admin/drives/' + this.loginService.login);
  }
}
