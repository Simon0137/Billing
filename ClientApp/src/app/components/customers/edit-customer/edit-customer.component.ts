import { Component } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { Customer } from '../../../types/customer';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  providers: [CustomersService]
})
export class EditCustomerComponent {
  public customerName = '';
  public customerId: number | undefined;
  private _subscription: Subscription;

  constructor(private customersService: CustomersService, private location: Location, private activatedRoute: ActivatedRoute) {
    this._subscription = activatedRoute.params.subscribe(params => this.customerId = params['id']);
    if (this.customerId != 0) {
      
    }
  }

  public async addCustomer() {
    await this.customersService.addCustomerAsync(new Customer(0, this.customerName));
    this.location.back();
  }

  public async cancel() {
    this.location.back();
  }
}
