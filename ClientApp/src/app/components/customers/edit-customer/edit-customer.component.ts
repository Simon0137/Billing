import { Component } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { Customer } from '../../../models/customer';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
  providers: [CustomersService]
})

export class EditCustomerComponent {
  public model?: Customer;
  public nameFormControl = new FormControl('', [Validators.required])
  public emailFormControl = new FormControl('', [Validators.email, Validators.required])
  private _subscription: Subscription;

  constructor(
    private customersService: CustomersService,
    private location: Location,
    private activatedRoute: ActivatedRoute) {
      this._subscription = activatedRoute.params.subscribe(params => this.loadCustomerAsync(params['id']));
  }

  private async loadCustomerAsync(id?: number) {
    console.log('Loading customer: ', id);
    if (id) {
      this.model = await this.customersService.loadCustomerAsync(id) || { id: 0, name: '' };
    } else {
      this.model = { id: 0, name: '' };
    }
  }

  public async submitChangesAsync() {
    if (this.model!.id > 0) {
      await this.editCustomerAsync();
    } else {
      await this.addCustomerAsync();
    }
  }

  public cancel() {
    this.location.back();
  }

  private async addCustomerAsync() {
    await this.customersService.addCustomerAsync(this.model!);
    this.location.back();
  }

  private async editCustomerAsync() {
    await this.customersService.editCustomerAsync(this.model!);
    this.location.back();
  }
}
