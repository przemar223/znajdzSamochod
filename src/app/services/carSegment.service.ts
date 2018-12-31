import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import { HttpClient } from '@angular/common/http';
import { ResponseContentType, Http } from '@angular/http';
import { LoginService } from './login.service';
import { DictionaryCarSegmentDTO } from '../models/DTO/DictionaryCarSegmentDTO';

@Injectable({
  providedIn: 'root'
})
export class CarSegmentService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getCarSegments(): Observable<DictionaryCarSegmentDTO[]> {
    return this.httpClient.get<DictionaryCarSegmentDTO[]>('http://localhost:8085/admin/segments/' + this.loginService.login);
  }
}
