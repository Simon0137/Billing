import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SubscribesService } from '../../../services/subscribes.service';
import { ServicesService } from '../../../services/services.service';

@Component({
    selector: 'app-edit-subscribe',
    templateUrl: './edit-subscribe.component.html',
    styleUrls: ['./edit-subscribe.component.scss'],
    providers: [SubscribesService, ServicesService]
})

export class EditSubscribeComponent {
    public model!: App.Subscribe;
    public tariffs = [App.Subscribe.TariffPlans.Free, App.Subscribe.TariffPlans.Basic, App.Subscribe.TariffPlans.Premium];
    public services!: App.Service[];
    public form;
    public defaultModel: App.Subscribe = {
        id: 0,
        serviceId: 0,
        customerId: 0,
        tariff: App.Subscribe.TariffPlans.Undefined,
        startDate: new Date(),
        endDate: null
    };
    mode?: 'add' | 'edit';

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

        activatedRoute.pathFromRoot[1].url.subscribe(urlSegment => {
            if (urlSegment[0].path == 'add-subscribe') {
                this.mode = 'add';
            } else if (urlSegment[0].path == 'edit-subscribe') {
                this.mode = 'edit';
            }
            this.loadSubscribeAsync(parseInt(urlSegment[1].path));
        });
        
    }

    private async loadSubscribeAsync(id: number) {
        this.services = await this.servicesService.loadAsync();
        if (this.mode === 'edit') {
            this.model = await this.subscribesService.loadByIdAsync(id);
        } else if (this.mode === 'add') {
            this.model = this.defaultModel;
            this.model.customerId = id;
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
