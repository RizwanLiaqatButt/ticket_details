import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { SO } from '../../models/SO';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as searchActions from '../../store/Actions/app.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit, OnDestroy {

  pageTitle = 'Customer Research (Ticket Detail)';
  public searchedSaleOrders: any[] = [];
  private searchedSaleOrdersSubscription: Subscription;
  constructor(
    private _cs: CustomerService, public store: Store<any>
  ) {
  }
  ngOnInit() {
    this.store.select('searchReducer').subscribe(data => {
      if (data.searchState && data.searchState.searchResult.length > 0) {
        const uniquedata = _.uniqBy(data.searchState.searchResult,
          function (elem: any) {
            return [elem.CUST_CD, elem.SHIP_TO_B_PHONE, elem.SHIP_TO_H_PHONE
              , elem.SHIP_TO_ZIP_CD, elem.SHIP_TO_CITY, elem.SHIP_TO_ST_CD].join();
          });
        this.searchedSaleOrders = uniquedata;
      }
    });

    this.store.dispatch(new searchActions.GetSearchResultsFromStore(null));
  }
  ngOnDestroy() {
    this.unsubscribe();
  }

  private unsubscribe(): void {
    if (this.searchedSaleOrdersSubscription) {
      this.searchedSaleOrdersSubscription.unsubscribe();
    }
  }
  public onSearchClicked(event: any): void {
    this.store.dispatch(new searchActions.GetSearchParams(event));
    this.store.dispatch(new searchActions.GetSearchResults(event));
  }

}