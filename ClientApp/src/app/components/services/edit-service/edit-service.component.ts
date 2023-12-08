import { Component, OnDestroy } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-service',
    templateUrl: './edit-service.component.html',
    styleUrls: ['./edit-service.component.scss'],
    providers: [ServicesService]
})

export class EditServiceComponent implements OnDestroy {
    public model!: App.Service;
    private _subscription: Subscription;
    public form;
    public defaultModel: App.Service = {
        id: 0,
        name: '',
        descriprion: ''
    };

    constructor(
        private servicesService: ServicesService,
        private location: Location,
        activatedRoute: ActivatedRoute,
        private fb: FormBuilder) {

        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['']
        });
        this._subscription = activatedRoute.params.subscribe(params => this.loadServiceAsync(params['id']));
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    private async loadServiceAsync(id?: number) {

        console.log('Loading service: ', id);
        if (id) {
            this.model = await this.servicesService.loadByIdAsync(id) || this.defaultModel;
        } else {
            this.model = this.defaultModel;
        }
        this.setFormValue();
    }

    public async submitChangesAsync() {
        if (this.form?.valid) {
            this.setModelValue();
            if (this.model!.id > 0) {
                await this.editServiceAsync();
            } else {
                await this.addServiceAsync();
            }
        }
    }

    public cancel() {
        this.location.back();
    }

    private async addServiceAsync() {
        await this.servicesService.addAsync(this.model);
        this.location.back();
    }

    private async editServiceAsync() {
        await this.servicesService.editAsync(this.model);
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
