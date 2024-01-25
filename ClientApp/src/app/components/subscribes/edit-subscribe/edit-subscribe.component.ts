import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SubscribesService } from '../../../services/subscribes.service';
import { ServicesService } from '../../../services/services.service';

@Component({
    selector: 'app-edit-subscribe',
    templateUrl: './edit-subscribe.component.html',
    //styleUrls: ['./edit-subscribe.component.scss'],
    providers: [SubscribesService, ServicesService]
})

export class EditSubscribeComponent implements OnDestroy {
    public model!: App.Subscribe;
    private _subscription: Subscription;
    public form;
    public defaultModel: App.Subscribe = {
        id: 0,
        serviceId: 0,
        customerId: 0,
        tariff: App.Subscribe.TariffPlans.Undefined,
        startDate: new Date(),
        endDate: null
    };

    constructor(
        private subscribesService: SubscribesService,
        private servicesService: ServicesService,
        private location: Location,
        activatedRoute: ActivatedRoute,
        private fb: FormBuilder) {

        this.form = this.fb.group({
            serviceId: [this.defaultModel.serviceId, Validators.required],
            tariff: [this.defaultModel.tariff, Validators.required],
            startDate: [this.defaultModel.startDate, Validators.required],
            endDate: [this.defaultModel.endDate]
        });
        this._subscription = activatedRoute.params.subscribe(params => this.loadSubscribeAsync(params['id']));
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    private async loadSubscribeAsync(id?: number) {

        console.log('Loading subscribe: ', id);
        if (id) {
            this.model = await this.subscribesService.loadByIdAsync(id) || this.defaultModel;
        } else {
            this.model = this.defaultModel;
        }
        this.setFormValue();
    }

    public async submitChangesAsync() {
        if (this.form?.valid) {
            this.setModelValue();
            if (this.model!.id > 0) {
                await this.editSubscribeAsync();
            } else {
                await this.addSubscribeAsync();
            }
        }
    }

    public cancel() {
        this.location.back();
    }

    private async addSubscribeAsync() {
        await this.subscribesService.addAsync(this.model);
        this.location.back();
    }

    private async editSubscribeAsync() {
        await this.subscribesService.editAsync(this.model);
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
