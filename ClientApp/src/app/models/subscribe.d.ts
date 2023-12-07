declare module App {

    module Subscribe {
        export enum TariffPlans {
            Undefined = 0,
            Free = 1,
            Basic = 2,
            Premium = 3
        }
    }

    export interface Subscribe {
        id: number;
        tariff: Subscribe.TariffPlans;
        startDate: Date;
        endDate: Date;
        customerId: number;
        customer?: App.Customer;
        serviceId: number;
        service?: App.Service;
    }

}
