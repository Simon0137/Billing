import { CRUDService } from './crud.service';

export class ServicesService extends CRUDService<App.Service> {
    serviceName = 'services';
}
