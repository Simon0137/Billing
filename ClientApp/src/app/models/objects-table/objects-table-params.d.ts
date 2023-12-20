declare module App {

    export interface ObjectsTableParams<TEntity> {
        tableName: string;
        displayedParams?: App.DisplayedParam[];
        entities?: TEntity[];
    }

}
