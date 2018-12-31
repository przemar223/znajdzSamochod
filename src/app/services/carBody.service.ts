import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import { HttpClient } from '@angular/common/http';
import { ResponseContentType, Http } from '@angular/http';
import { LoginService } from './login.service';
import { BodyDTO } from '../models/DTO/BodyDTO';

@Injectable({
  providedIn: 'root'
})
export class CarBodyService {

  constructor(private httpClient: HttpClient, public loginService: LoginService) { }

  getCarBodies(): Observable<BodyDTO[]> {
    return this.httpClient.get<BodyDTO[]>('http://localhost:8085/admin/bodies/' + this.loginService.login);
  }
}
