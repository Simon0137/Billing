import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../types/customer';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomersService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  async addCustomerAsync(customer: Customer): Promise<Customer> {
    return await lastValueFrom(this.http.post<Customer>(`${this.baseUrl}api/customers`, customer));
  }

  async editCustomerAsync(customer: Customer): Promise<Customer> {
    return await lastValueFrom(this.http.put<Customer>(`${this.baseUrl}api/customers`, customer));
  }

  async loadCustomersAsync(): Promise<Customer[]> {
    return await lastValueFrom(this.http.get<Customer[]>(`${this.baseUrl}api/customers`));
  }

  async loadCustomerAsync(id: number): Promise<Customer> {
    return await lastValueFrom(this.http.get<Customer>(`${this.baseUrl}api/customers/${id}`))
  }

  async deleteCustomerAsync(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(`${this.baseUrl}api/customers/${id}`));
  }
}
