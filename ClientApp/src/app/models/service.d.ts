declare module App {

    export interface Service {
        id: number;
        name: string;
        descriprion?: string;
        subscribes?: App.Subscribe[];
    }

}
