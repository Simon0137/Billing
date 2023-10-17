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
  public customerName: string = '';
  public customerId: number = 0;
  private _subscription: Subscription;

  constructor(private customersService: CustomersService, private location: Location, private activatedRoute: ActivatedRoute) {
    this._subscription = activatedRoute.params.subscribe(params => this.customerId = params['id']);
  }

  public async submitChanges() {
    if (this.customerId > 0) {
      this.editCustomer();
    } else {
      this.addCustomer();
    }
  }

  public async cancel() {
    this.location.back();
  }

  public async getName(): Promise<string> {
    if (this.customerId == 0) {
      return '';
    } else {
      var customer = await this.customersService.loadCustomerAsync(this.customerId);
      return customer.name;
    }
  }

  private async addCustomer() {
    await this.customersService.addCustomerAsync(new Customer(0, this.customerName));
    this.location.back();
  }

  private async editCustomer() {
    await this.customersService.editCustomerAsync(new Customer(this.customerId, this.customerName));
    this.location.back();
  }
}
