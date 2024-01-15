import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CustomersService } from '../../../services/customers.service';
import { SubscribesService } from '../../../services/subscribes.service';
import { ServicesService } from '../../../services/services.service';

@Component({
    selector: 'app-edit-customer',
    templateUrl: './edit-customer.component.html',
    styleUrls: ['./edit-customer.component.scss'],
    providers: [CustomersService, SubscribesService, ServicesService]
})

export class EditCustomerComponent implements OnDestroy {
    public model!: App.Customer;
    public customerId: number = 0;
    private _subscription: Subscription;
    public displayedColumns: string[] = ['sub-service-name', 'sub-tariff', 'sub-start-date', 'sub-end-date'];
    public form;
    public defaultModel: App.Customer = {
        id: 0,
        name: '',
        email: '',
        gender: 0,
        subscribes: undefined
    };
    
    constructor(
        private customersService: CustomersService,
        private subscribesService: SubscribesService,
        private location: Location,
        activatedRoute: ActivatedRoute,
        private fb: FormBuilder) {

        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            gender: [0, Validators.required]
        });
        this._subscription = activatedRoute.params.subscribe(params => {
            this.customerId = params['id'];
            return this.loadCustomerAsync(this.customerId);
        });
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    private async loadCustomerAsync(id?: number) {
        
        console.log('Loading customer: ', id);
        if (id) {
            this.model = await this.customersService.loadByIdAsync(id) || this.defaultModel;
            this.model.subscribes = await this.subscribesService.loadByCustomerIdAsync(id) || undefined;
        } else {
            this.model = this.defaultModel;
        }
        this.setFormValue();
    }

    public async submitChangesAsync() {
        if (this.form?.valid) {
            this.setModelValue();
            if (this.model!.id > 0) {
                await this.editCustomerAsync();
            } else {
                await this.addCustomerAsync();
            }
        }
    }

    public cancel() {
        this.location.back();
    }

    private async addCustomerAsync() {
        await this.customersService.addAsync(this.model);
        this.location.back();
    }

    private async editCustomerAsync() {
        await this.customersService.editAsync(this.model);
        this.location.back();
    }

    private setFormValue() {
        for (let controlName in this.form.controls) {
            if (this.model.hasOwnProperty(controlName)) {
                const c = (this.form.controls as any)[controlName];
                if (c instanceof AbstractControl) {
                    c.setValue((this.model as any)[controlName]);
                }
            }
        }

    }

    private setModelValue() {
        for (let controlName in this.form.controls) {
            if (this.model.hasOwnProperty(controlName)) {
                const c = (this.form.controls as any)[controlName];
                if (c instanceof AbstractControl) {
                    (this.model as any)[controlName] = c.value || null;
                }
            }
        }

    }
}
