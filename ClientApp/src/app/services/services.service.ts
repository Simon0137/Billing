import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';

@Injectable()
export class ServicesService extends CRUDService<App.Service> {
    serviceName = 'services';
}
