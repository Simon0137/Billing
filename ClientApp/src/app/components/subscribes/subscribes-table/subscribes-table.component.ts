import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-sub-table',
    templateUrl: './subscribes-table.component.html'
})
export class SubscribesTableComponent {
    @Input() subscribes?: App.Subscribe[];
    public displayedColumns: string[] = ['sub-service-name', 'sub-tariff', 'sub-start-date', 'sub-end-date'];
}
