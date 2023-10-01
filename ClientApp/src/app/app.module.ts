import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AddFormComponent } from './components/add-form/add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AddFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: CustomersComponent, pathMatch: 'full' },
      { path: 'form-add-customer', component: AddFormComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
