import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent {
  public customers: Customers[] = [];


}

interface Customers {
  id: number;
  name: string;
}
