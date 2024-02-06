import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

type HttpResponseIdObject = {
    $id: number;
    [k: string]: any;
}
type HttpResponseRefObject = {
    $ref: number;
}

function isNonNullableObject(variable: any): variable is object {
    return typeof variable === 'object' && variable !== null;
}
function isHttpResponseIdObject(variable: object): variable is HttpResponseIdObject {
    return "$id" in variable;
}
function isHttpResponseRefObject(variable: object): variable is HttpResponseRefObject {
    return "$ref" in variable;
}
function isHRObjectsArray(array: Array<any>): array is Array<HttpResponseIdObject | HttpResponseRefObject> {
    return array.every(item => isHttpResponseIdObject(item) || isHttpResponseRefObject(item));
}

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

    protected resolveRefs(entities: TEntity | TEntity[]): TEntity[] {
        if (!Array.isArray(entities)) {
            entities = [entities];
        }

        //Реализовываем рекурсивную функцию resolve, которая будет заполнять словарь id-объектов
        const resolve = (objs: object[], dict: Record<number, HttpResponseIdObject>): void => {
            for (let obj of objs) {
                if (isHttpResponseIdObject(obj)) {
                    dict[obj.$id] = obj;
                    for (let key in obj) {
                        const prop = obj[key];
                        if (isNonNullableObject(prop)) {
                            if (Array.isArray(prop) && isHRObjectsArray(prop)) {
                                resolve(prop, dict);
                            } else if (isHttpResponseIdObject(prop)) {
                                resolve([prop], dict);
                            }
                        }
                    }
                }
            }
        }

        //Заполняем словарь всеми объектами со свойством $id
        let dict: Record<number, HttpResponseIdObject> = {};
        const objects = (entities as Array<HttpResponseIdObject | HttpResponseRefObject>);
        resolve(objects, dict);

        //Заполняем итоговый массив, заменяя ref-объекты, используя заполненный словарь
        let resArr: HttpResponseIdObject[] = [];
        for (let obj of objects) {
            if (isHttpResponseIdObject(obj)) {
                resArr.push(obj);
            } else if (isHttpResponseRefObject(obj)) {
                resArr.push(dict[obj.$ref]);
            }
        }

        //Возвращаем итоговый массив
        return (resArr as TEntity[]);
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
