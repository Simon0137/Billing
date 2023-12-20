import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-objects-table',
    templateUrl: './objects-table.component.html'
})
export class ObjectsTableComponent<TEntity> {
    @Input() public params: App.ObjectsTableParams<TEntity> = {
        tableName: 'Empty name'
    }
    //public displayedColumns: string[];

    constructor(/*params: App.ObjectsTableParams<TEntity>*/) {
        //this.params = params | {
        //    tableName: 'Empty name'
        //}
        //for (let param in this.params.displayedParams) {
        //    this.displayedColumns += param.
        //}
    } 

    public valueByName(name: string): any {
        if (this.params.displayedParams) {
            if (this.params.displayedParams.hasOwnProperty(name)) {
                return (this.params.displayedParams as any)[name];
            }
        }
    }
}
