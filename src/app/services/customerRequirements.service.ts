import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CustomerRequirements } from '../models/CustomerRequirements';
import { FinishCar } from '../models/FinishCar';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequirementsService {
  @Output() itemUploaded: EventEmitter<CustomerRequirements> = new EventEmitter();
  finishCars: FinishCar[];
  form: String = '';
  amount: String = '';

  constructor(private httpClient: HttpClient) { }

  send(customerRequirements: CustomerRequirements) {
    this.finishCars = [];
    this.sendCustomerRequirements2(customerRequirements)
      .subscribe(sh => this.finishCars = sh);
  }

  sendCustomerRequirements2(customerRequirements: CustomerRequirements): Observable<FinishCar[]> {
    return this.httpClient.post<FinishCar[]>(
      'http://localhost:8085/user_preferences/send_customerRequirements', customerRequirements);
  }
}
