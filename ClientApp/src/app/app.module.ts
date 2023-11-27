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

import { AppComponent } from './app.component';
import { CustomersTableComponent } from './components/customers/customers-table/customers-table.component';
import { dlg } from './components/dialogs/dlg';
import { EditCustomerComponent } from './components/customers/edit-customer/edit-customer.component';
import { SimpleDialogComponent } from './components/dialogs/simple-dialog/simple-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


@NgModule({
    declarations: [
        AppComponent,
        CustomersTableComponent,
        EditCustomerComponent,
        SimpleDialogComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        BrowserAnimationsModule,
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
        MatFormFieldModule,
        MatDialogModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private injector: Injector) {    // Create global Service Injector.
        dlg.injector = this.injector;
    }
}
