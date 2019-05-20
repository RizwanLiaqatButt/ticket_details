import { Component, ViewEncapsulation } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { LookupDataService } from './services/lookup.data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(
    public _cs: CustomerService,
    public _lkpds: LookupDataService
  ) {
  }
}
