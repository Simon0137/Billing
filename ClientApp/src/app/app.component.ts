import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';
    private services: App.Service[] = [{ id: 0, name: 'TestName1' }, { id: 1, name: 'TestName2' }];
    private displayedParams: App.DisplayedParam[] = [{ paramName: 'id', tableName: 'Id' }, { paramName: 'name', tableName: 'Name' }];

    public params: App.ObjectsTableParams<App.Service> = {
        tableName: 'TestTable',
        displayedParams: this.displayedParams,
        entities: this.services
    }
}
