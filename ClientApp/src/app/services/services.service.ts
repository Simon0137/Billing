import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ServicesService {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    async addAsync(service: App.Service): Promise<App.Service> {
        return await lastValueFrom(this.http.post<App.Customer>(`${this.baseUrl}api/services`, service));
    }

    async editAsync(service: App.Service): Promise<App.Service> {
        return await lastValueFrom(this.http.put<App.Service>(`${this.baseUrl}api/services`, service));
    }

    async loadAsync(): Promise<App.Service[]> {
        return await lastValueFrom(this.http.get<App.Service[]>(`${this.baseUrl}api/services`));
    }

    async loadByIdAsync(id: number): Promise<App.Service> {
        return await lastValueFrom(this.http.get<App.Service>(`${this.baseUrl}api/services/${id}`))
    }

    async deleteAsync(id: number): Promise<void> {
        await lastValueFrom(this.http.delete(`${this.baseUrl}api/services/${id}`));
    }
}
