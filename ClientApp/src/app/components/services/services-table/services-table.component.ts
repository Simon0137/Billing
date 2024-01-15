import { Component, ViewChild } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { Router } from '@angular/router';

import { MatTable } from '@angular/material/table';

import { dlg } from '../../dialogs/dlg';

@Component({
    selector: 'app-services-table',
    templateUrl: './services-table.component.html',
    styleUrls: ['services-table.component.scss'],
    providers: [ServicesService]
})
export class ServicesTableComponent {
    public services?: App.Service[];
    public displayedColumns: string[] = ['service-id', 'service-name'];
    public chosenId: number = 0;

    @ViewChild(MatTable) table?: MatTable<App.Service>;

    constructor(
        private servicesService: ServicesService,
        private router: Router
    ) {
        this.updateServicesAsync();
    }

    public async addServiceAsync() {
        await this.router.navigate(['edit-service']);
    }

    public async editServiceAsync(serviceId: number) {
        await this.router.navigate(['edit-service', serviceId]);
    }

    public async deleteServiceAsync(id: number) {
        if (await dlg.askAsync("Remove service?")) {
            await this.servicesService.deleteAsync(id);
            await this.updateServicesAsync();
        }
    }

    public async updateServicesAsync() {
        this.services = undefined;
        this.services = await this.servicesService.loadAsync();
        this.table?.renderRows();
    }

    public onRowClicked(id: number) {
        this.chosenId = id;
        this.table?.renderRows();
    }

    public isRowSelected(id: number): boolean {
        return this.chosenId === id;
    }
}

