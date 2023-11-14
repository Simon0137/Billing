import { Component } from '@angular/core';
import { Customer } from '../../../models/customer';
import { CustomersService } from '../../../services/customers.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { ConfirmDeleteComponent } from '../../dialogs/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  providers: [CustomersService]
})
export class CustomersTableComponent {
  public customers?: Customer[];
  private deletion: boolean = false;

  constructor(
    private customersService: CustomersService,
    private router: Router,
    private dialog: MatDialog) {
      this.updateCustomersAsync();
  }

  public async addCustomerAsync() {
    await this.router.navigate(['edit-customer']);
  }

  public async editCustomerAsync(customerId: number) {
    await this.router.navigate(['edit-customer', customerId]);
  }

  public async deleteCustomerAsync(id: number) {
    let dialog = this.dialog.open(ConfirmDeleteComponent);
    console.log("dialog open");
    dialog.afterClosed().subscribe(deletion => this.deletion = deletion);
    console.log("dialog close");
    if (this.deletion) {
      await this.customersService.deleteCustomerAsync(id);
      await this.updateCustomersAsync();
    }
  }

  public async updateCustomersAsync() {
    this.customers = undefined;
    this.customers = await this.customersService.loadCustomersAsync();
  }
}


