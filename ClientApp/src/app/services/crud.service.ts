import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CRUDService<TEntity> {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    async addAsync(entity: TEntity): Promise<TEntity> {
        return await lastValueFrom(this.http.post<TEntity>(`${this.baseUrl}api/services`, entity));
    }

    async editAsync(entity: TEntity): Promise<TEntity> {
        return await lastValueFrom(this.http.put<TEntity>(`${this.baseUrl}api/services`, entity));
    }

    async loadAsync(): Promise<TEntity[]> {
        return await lastValueFrom(this.http.get<TEntity[]>(`${this.baseUrl}api/services`));
    }

    async loadByIdAsync(id: number): Promise<TEntity> {
        return await lastValueFrom(this.http.get<TEntity>(`${this.baseUrl}api/services/${id}`))
    }

    async deleteAsync(id: number): Promise<void> {
        await lastValueFrom(this.http.delete(`${this.baseUrl}api/services/${id}`));
    }
}
