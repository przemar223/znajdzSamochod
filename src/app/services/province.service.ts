import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';
import { ProvinceDTO } from '../models/DTO/ProvinceDTO';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getProvinces(): Observable<ProvinceDTO[]> {
    if (this.loginService.login !== '') {
      return this.httpClient.get<ProvinceDTO[]>('http://localhost:8085/admin/provinces/' + this.loginService.login);
    }
    return this.httpClient.get<ProvinceDTO[]>('http://localhost:8085/admin/provinces');
  }
}
