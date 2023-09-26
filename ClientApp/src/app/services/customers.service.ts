import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer } from '../types/customer';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomersService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  async addCustomerAsync(customer: Customer): Promise<void> {
    await lastValueFrom(this.http.post(`${this.baseUrl}/api/customers`, customer));
  }

  async loadCustomersAsync(): Promise<Customer[]> {
    return await lastValueFrom(this.http.get<Customer[]>(`${this.baseUrl}/api/customers`));
  }

  async deleteCustomerAsync(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(`${this.baseUrl}/api/customers/${id}`));
  }
}
