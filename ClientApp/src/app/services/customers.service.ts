import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomersService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    async addAsync(customer: App.Customer): Promise<App.Customer> {
        return await lastValueFrom(this.http.post<App.Customer>(`${this.baseUrl}api/customers`, customer));
    }

    async editAsync(customer: App.Customer): Promise<App.Customer> {
        return await lastValueFrom(this.http.put<App.Customer>(`${this.baseUrl}api/customers`, customer));
    }

    async loadAsync(): Promise<App.Customer[]> {
        return await lastValueFrom(this.http.get<App.Customer[]>(`${this.baseUrl}api/customers`));
    }

    async loadByIdAsync(id: number): Promise<App.Customer> {
        return await lastValueFrom(this.http.get<App.Customer>(`${this.baseUrl}api/customers/${id}`))
    }

    async deleteAsync(id: number): Promise<void> {
        await lastValueFrom(this.http.delete(`${this.baseUrl}api/customers/${id}`));
    }
}
