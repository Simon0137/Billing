import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer } from '../types/customer';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  public getData<T>(url: string) {
    return this.http.get<T>(url);
  }

  public postData(url: string, id: number) {
    return this.http.post(url+'/'+id, {
      //params: new HttpParams().set('id', id)
    });
  }

  public deleteData(url: string, id: number) {
    return this.http.delete(`${url}/${id}`, {
      //params: new HttpParams().set('id', id)
    });
  }
}
