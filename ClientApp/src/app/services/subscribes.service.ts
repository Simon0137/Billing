import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SubscribesService extends CRUDService<App.Subscribe> {
    serviceName = 'subscribes';

    async loadByCustomerIdAsync(customerId: number): Promise<App.Subscribe[]> {
        let res = await lastValueFrom(this.http.get<App.Subscribe[]>(this.serviceUrl(`ByCustomerId/${customerId}`)));
        return this.resolveRefs(res);
    }
}
