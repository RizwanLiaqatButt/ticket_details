import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { CustomerInvoice } from '../../models/customerInvoice';
import { Total } from '../../models/Total';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit, OnDestroy {

  customer: CustomerInvoice = null;
  totals: Total = null;
  rowData;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(public store: Store<any>) { }

  ngOnInit() {
    this.store.select('paramsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if(data.customerInvoice) {
        this.customer = data.customerInvoice;
      }
    });

    this.store.select('customerDetailsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (data.customerInvoiceDetails) {
        this.rowData = data.customerInvoiceDetails;
        if(this.customer) {
          this.totals = new Total();
          this.totals.DEL_CHG = +this.customer.DEL_CHG;
          this.totals.SETUP_CHG = +this.customer.SETUP_CHG;
          this.totals.TAX_CHG = +this.customer.TAX_CHG;
          this.totals.NetValue = 0;
          this.totals.Taxes = 0;
          this.totals.TotalTicket = 0;
          this.rowData.forEach(row => {
             this.totals.NetValue += row.Calculated_NetLine_Amount;
             this.totals.Taxes += +row.CUST_TAX_CHG;
            });
          this.totals.TotalTicket = this.totals.NetValue + this.totals.SETUP_CHG + this.totals.DEL_CHG + this.totals.TAX_CHG + this.totals.Taxes;
          localStorage.removeItem('totals');
          localStorage.setItem('totals', JSON.stringify(this.totals));
        }
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
