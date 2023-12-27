import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';

@Injectable()
export class CustomersService extends CRUDService<App.Customer>{
    serviceName = 'customers';
}
