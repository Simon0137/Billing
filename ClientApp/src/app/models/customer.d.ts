declare module App {

    module Customer {
        export enum Genders {
            Undefined = 0,
            Male = 1,
            Female = 2
        }

        
    }

    export interface Customer {
        id: number;
        name: string;
        email: string;
        gender: Customer.Genders;
        subscribes?: App.Subscribe[];
    }

}
