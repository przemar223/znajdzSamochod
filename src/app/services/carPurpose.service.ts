import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import { HttpClient } from '@angular/common/http';
import { ResponseContentType, Http } from '@angular/http';
import { LoginService } from './login.service';
import { DictionaryPurposeDTO } from '../models/DTO/DictionaryPurposeDTO';

@Injectable({
  providedIn: 'root'
})
export class CarPurposeService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getTypes(): Observable<DictionaryPurposeDTO[]> {
    if (this.loginService.login !== '') {
      return this.httpClient.get<DictionaryPurposeDTO[]>('http://localhost:8085/admin/types/' + this.loginService.login);
    }
    return this.httpClient.get<DictionaryPurposeDTO[]>('http://localhost:8085/admin/types');
  }
}
