import { Component } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { Customer } from '../../../types/customer';
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  providers: [CustomersService]
})
export class EditCustomerComponent {
  public customerName = '';

  constructor(private customersService: CustomersService, private location: Location) { }

  public async addCustomer() {
    await this.customersService.addCustomerAsync(new Customer(0, this.customerName));
    this.location.back();
  }

  public async cancel() {
    this.location.back();
  }
}
