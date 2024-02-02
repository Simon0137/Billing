import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

import { dlg } from '../../dialogs/dlg';
import { SubscribesService } from '../../../services/subscribes.service';

@Component({
    selector: 'app-sub-table',
    templateUrl: './subscribes-table.component.html',
    styleUrls: ['subscribes-table.component.scss']
})
export class SubscribesTableComponent implements OnInit {
    @Input() subscribes?: App.Subscribe[];
    @Input() customerId: number = 0;
    public displayedColumns: string[] = ['sub-service-name', 'sub-tariff', 'sub-start-date', 'sub-end-date'];
    public currentSubscribeId: number = 0;

    @ViewChild(MatTable) table?: MatTable<App.Customer>;

    constructor(
        private subscribesService: SubscribesService,
        private router: Router
    ) { }
    ngOnInit(): void {
        this.updateSubscribesAsync();
    }

    public async addSubscribeAsync() {
        await this.router.navigate(['add-subscribe', this.customerId]);
    }

    public async editSubscribeAsync(subscribeId: number) {
        await this.router.navigate(['edit-subscribe', subscribeId]);
    }

    public async deleteSubscribeAsync(subscribeId: number) {
        if (await dlg.askAsync("Remove subscribe?")) {
            await this.subscribesService.deleteAsync(subscribeId);
            await this.updateSubscribesAsync();
        }
    }

    public async updateSubscribesAsync() {
        this.currentSubscribeId = 0;
        this.subscribes = undefined;
        this.subscribes = await this.subscribesService.loadByCustomerIdAsync(this.customerId);
        this.table?.renderRows();
    }

    public onRowClicked(id: number) {
        this.currentSubscribeId = id;
        this.table?.renderRows();
    }

    public isRowSelected(id: number): boolean {
        return this.currentSubscribeId === id;
    }
}
