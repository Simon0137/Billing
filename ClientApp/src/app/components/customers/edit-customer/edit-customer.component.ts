import { Component, OnDestroy } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-customer',
    templateUrl: './edit-customer.component.html',
    styleUrls: ['./edit-customer.component.scss'],
    providers: [CustomersService]
})

export class EditCustomerComponent implements OnDestroy {
    public model!: App.Customer;
    private _subscription: Subscription;
    public form;
    public defaultModel: App.Customer = {
        id: 0,
        name: '',
        email: '',
        gender: 0
    };
    
    constructor(
        private customersService: CustomersService,
        private location: Location,
        activatedRoute: ActivatedRoute,
        private fb: FormBuilder) {

        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            gender: [0, Validators.required]
        });
        this._subscription = activatedRoute.params.subscribe(params => this.loadCustomerAsync(params['id']));
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    private async loadCustomerAsync(id?: number) {
        
        console.log('Loading customer: ', id);
        if (id) {
            this.model = await this.customersService.loadByIdAsync(id) || this.defaultModel;
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
