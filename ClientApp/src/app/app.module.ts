import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { CustomersTableComponent } from './components/customers/customers-table/customers-table.component';
import { EditCustomerComponent } from './components/customers/edit-customer/edit-customer.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersTableComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot([
      { path: '', component: CustomersTableComponent, pathMatch: 'full' },
      { path: 'edit-customer/:id', component: EditCustomerComponent },
      { path: 'edit-customer', component: EditCustomerComponent }
    ]),

    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
