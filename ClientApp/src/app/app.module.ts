import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { CustomersTableComponent } from './components/customers/customers-table/customers-table.component';
import { dlg } from './components/dialogs/dlg';
import { EditCustomerComponent } from './components/customers/edit-customer/edit-customer.component';
import { SimpleDialogComponent } from './components/dialogs/simple-dialog/simple-dialog.component';
import { ServicesTableComponent } from './components/services/services-table/services-table.component';
import { EditServiceComponent } from './components/services/edit-service/edit-service.component';
import { NavbarComponent } from './components/main-navbar/main-navbar.component';
import { ObjectsTableComponent } from './components/objects-table/objects-table.component';
import { SubscribesTableComponent } from './components/subscribes/subscribes-table/subscribes-table.component';
import { EditSubscribeComponent } from './components/subscribes/edit-subscribe/edit-subscribe.component';


@NgModule({
    declarations: [
        AppComponent,
        CustomersTableComponent,
        EditCustomerComponent,
        SimpleDialogComponent,
        ServicesTableComponent,
        EditServiceComponent,
        NavbarComponent,
        ObjectsTableComponent,
        SubscribesTableComponent,
        EditSubscribeComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        BrowserAnimationsModule,
        HttpClientModule,

        FormsModule,
        ReactiveFormsModule,

        RouterModule.forRoot([
            { path: '', redirectTo: '/customers', pathMatch: 'full' },
            { path: 'customers', component: CustomersTableComponent },
            { path: 'services', component: ServicesTableComponent },
            { path: 'edit-customer/:id', component: EditCustomerComponent },
            { path: 'edit-customer', component: EditCustomerComponent },
            { path: 'edit-service/:id', component: EditServiceComponent },
            { path: 'edit-service', component: EditServiceComponent },
            { path: 'edit-subscribe/:id', component: EditSubscribeComponent },
            { path: 'edit-subscribe', component: EditSubscribeComponent }
        ]),

        DatePipe,

        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        MatTabsModule,
        MatTooltipModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private injector: Injector) {    // Create global Service Injector.
        dlg.injector = this.injector;
    }
}
