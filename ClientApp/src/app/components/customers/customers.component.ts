import { Component, Inject } from '@angular/core';
import { Customer } from '../../types/customer';
import { HttpService } from '../../services/http.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  providers: [HttpService]
})
export class CustomersComponent {
  public customers?: Customer[];
  private _baseUrl: string;
  private _httpService: HttpService;

  constructor(httpService: HttpService, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._httpService = httpService;

    this.getCustomers();
  }

  async deleteCustomer(id: number) {
    await lastValueFrom(this._httpService.deleteData(this._baseUrl + 'api/customers', id));
    await this.getCustomers();
  }

  async getCustomers() {
    this.customers = undefined;
    this.customers = await lastValueFrom(this._httpService.getData<Customer[]>(this._baseUrl + 'api/customers'));
  }
}


