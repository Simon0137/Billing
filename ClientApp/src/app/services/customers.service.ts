import { CRUDService } from './crud.service';

export class CustomersService extends CRUDService<App.Customer>{
    serviceName = 'customers';
}
