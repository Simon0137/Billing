import { Component, Inject } from '@angular/core';
import { Customer } from '../../types/customer';
import { HttpService } from '../../services/http.service';
import { error } from 'console';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  providers: [HttpService]
})
export class CustomersComponent {
  public customers: Customer[] = [];
  private _baseUrl: string;
  private _httpService: HttpService;

  constructor(httpService: HttpService, @Inject('BASE_URL') baseUrl: string) {
    /*http.get<Customer[]>(baseUrl + 'api/customers').subscribe(result => {
      this.customers = result;
    }, error => console.error(error));*/
    this._baseUrl = baseUrl;
    this._httpService = httpService;

    this.getCustomers();
  }

  deleteCustomer(id: number) {
    debugger;
    this._httpService.deleteData(this._baseUrl + 'api/customers', id);
    this.getCustomers();
  }

  getCustomers() {
    this._httpService.getData<Customer[]>(this._baseUrl + 'api/customers').subscribe(result => {
      this.customers = result;
    }, error => console.error(error));
  }
}


