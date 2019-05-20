import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import * as loadActions from '../../store/Actions/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
import { GridOptions } from 'ag-grid';
import 'rxjs/add/operator/takeUntil';
import { Common } from '../../common/common';

@Component({
  selector: 'app-customer-transactions-comments',
  templateUrl: './customer-transactions-comments.component.html',
  styleUrls: ['./customer-transactions-comments.component.css']
})
export class CustomerTransactionsCommentsComponent implements OnInit, OnDestroy {
  comments: any[] = [];
  columnDefs;
  public gridOptions: GridOptions;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public store: Store<any>) {
    this.columnDefs = [
      {
        headerName: 'Date', field: 'CMNT_DT', width: 85, valueFormatter: Common.dateFormatRenderer
      },
      {
        headerName: 'Comments', field: 'TEXT', width: 1066
      }
    ];
    this.gridOptions = <GridOptions>{
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35
    };
  }

  ngOnInit() {
    this.store.select('paramsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      const customer = data.customerSearch;
      if (customer) {
        this.store.dispatch(new loadActions.LoadCustomerComments({ CUST_CD: customer.CUST_CD }));
      }
    });

    this.store.select('customerCommentsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (data && data.customerTransactionComments && data.customerTransactionComments.length > 0) {
        data.customerTransactionComments.forEach(element => {
          element.CMNT_DT = Common.dateFormatter(element.CMNT_DT);
        });
        
        this.comments = _.sortBy(data.customerTransactionComments, function (o) {
          return moment(o.CMNT_DT);
        }
        ).reverse();
        localStorage.removeItem('commentsPrintObj');
        localStorage.setItem('commentsPrintObj', JSON.stringify(this.comments));
      }

    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
