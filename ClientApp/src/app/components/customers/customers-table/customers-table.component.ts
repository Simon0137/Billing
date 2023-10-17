import { Component } from '@angular/core';
import { Customer } from '../../../types/customer';
import { CustomersService } from '../../../services/customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  providers: [CustomersService]
})
export class CustomersTableComponent {
  public customers?: Customer[];

  constructor(private customersService: CustomersService, private router: Router) {
    this.updateCustomersAsync();
  }

  public addCustomer() {
    this.router.navigate(['edit-customer']);
  }

  public async editCustomer(customerId: number) {
    this.router.navigate(['edit-customer', customerId]);
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


