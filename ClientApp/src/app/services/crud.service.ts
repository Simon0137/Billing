import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CRUDService<TEntity> {

    /**
     * Название контроллера на бэкенде
     */
    serviceName: string = '';

    constructor(protected http: HttpClient, @Inject('BASE_URL') protected baseUrl: string) { }

    protected serviceUrl(suffix?: any): string {
        return `${this.baseUrl}api/${this.serviceName}/${suffix || ''}`;
    }

    async addAsync(entity: TEntity): Promise<TEntity> {
        return await lastValueFrom(this.http.post<TEntity>(this.serviceUrl(), entity));
    }

    async editAsync(entity: TEntity): Promise<TEntity> {
        return await lastValueFrom(this.http.put<TEntity>(this.serviceUrl(), entity));
    }

    async loadAsync(): Promise<TEntity[]> {
        return await lastValueFrom(this.http.get<TEntity[]>(this.serviceUrl()));
    }

    async loadByIdAsync(id: number): Promise<TEntity> {
        return await lastValueFrom(this.http.get<TEntity>(this.serviceUrl(id)));
    }

    async deleteAsync(id: number): Promise<void> {
        await lastValueFrom(this.http.delete(this.serviceUrl(id)));
    }
}
