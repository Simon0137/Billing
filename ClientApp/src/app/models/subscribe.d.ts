declare module App {

    module Subscribe {
        export enum TariffPlans {
            Undefined = '',
            Free = 'Free',
            Basic = 'Basic',
            Premium = 'Premium'
        }
    }

    export interface Subscribe {
        id: number;
        tariff: Subscribe.TariffPlans;
        startDate: Date;
        endDate: Date | null;
        customerId: number;
        customer?: App.Customer;
        serviceId: number;
        service?: App.Service;
    }

}
