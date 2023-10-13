import { Component } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../types/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  providers: [CustomersService]
})
export class AddFormComponent {
  public customerName = '';

  constructor(private customersService: CustomersService, private router: Router) { }

  public async addCustomer() {
    await this.customersService.addCustomerAsync(new Customer(0, this.customerName));
    this.router.navigate(['']);
  }

  public async cancel() {
    this.router.navigate(['']);
  }
}
