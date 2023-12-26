import { Component, ViewChild } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { dlg } from '../../dialogs/dlg';

@Component({
    selector: 'app-customers-table',
    templateUrl: './customers-table.component.html',
    styleUrls: ['./customers-table.component.scss'],
    providers: [CustomersService]
})
export class CustomersTableComponent {
    public customers?: App.Customer[];
    public displayedColumns: string[] = ['customer-id', 'customer-name'];
    public chosenId: number = 0;

    @ViewChild(MatTable) table?: MatTable<App.Customer>;

    constructor(
        private customersService: CustomersService,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.updateCustomersAsync();
    }

    public async addCustomerAsync() {
        await this.router.navigate(['edit-customer']);
    }

    public async editCustomerAsync(customerId: number) {
        await this.router.navigate(['edit-customer', customerId]);
    }

    public async deleteCustomerAsync(id: number) {
        if (await dlg.askAsync("Remove customer?")) {
            await this.customersService.deleteAsync(id);
            await this.updateCustomersAsync();
        }
    }

    public async updateCustomersAsync() {
        this.chosenId = 0;
        this.customers = undefined;
        this.customers = await this.customersService.loadAsync();
        this.table?.renderRows();
    }
}

