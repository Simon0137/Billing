import { Component } from '@angular/core';
import { Customer } from '../../types/customer';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  providers: [CustomersService]
})
export class CustomersComponent {
  public customers?: Customer[];

  constructor(private customersService: CustomersService) {
    this.updateCustomersAsync();
  }

  public async deleteCustomerAsync(id: number) {
    await this.customersService.deleteCustomerAsync(id);
    await this.updateCustomersAsync();
  }

  public async updateCustomersAsync() {
    this.customers = undefined;
    this.customers = await this.customersService.loadCustomersAsync();
  }
}


