import { Component, OnInit, OnDestroy } from '@angular/core';
import { SO } from '../../models/SO';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as searchActions from '../../store/Actions/app.actions';
import * as _ from 'lodash';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-customer-transactions-information',
  templateUrl: './customer-transactions-information.component.html',
  styleUrls: ['./customer-transactions-information.component.css']
})
export class CustomerTransactionsInformationComponent implements OnInit, OnDestroy {
public data$: Observable<any>;
public searchedSaleOrders: any[] = [];
private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public store: Store<any>) {
  }

  ngOnInit() {
     this.store.select('paramsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      const customer = data.customerSearch;
     });

     this.store.select('searchReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (data.searchState && data.searchState.searchResult) {
        const uniquedata = _.uniqBy(data.searchState.searchResult, 'CUST_CD');
         this.searchedSaleOrders = uniquedata.slice();
         localStorage.removeItem('customerTranInfoPrintObj');
         localStorage.setItem('customerTranInfoPrintObj', JSON.stringify(this.searchedSaleOrders[0]));
      }
    });
  }

  print() {
    let baseHref: string = document.getElementsByTagName("base")[0].href;
    window.open(baseHref + 'customerTransactionPrint','_blank','');
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
