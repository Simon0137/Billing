import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
    RouterModule.forRoot([
      { path: '', component: CustomersTableComponent, pathMatch: 'full' },
      { path: 'edit-customer', component: EditCustomerComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
