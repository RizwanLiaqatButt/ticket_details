import { Component, OnInit, OnDestroy } from '@angular/core';
import { getColumnDefs } from './grid-options';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import * as loadActions from '../../store/Actions/app.actions';
import { GridOptions } from 'ag-grid';
import 'rxjs/add/operator/takeUntil';
import * as _ from 'lodash';

@Component({
  selector: 'app-sale-order-comments',
  templateUrl: './sale-order-comments.component.html',
})
export class SaleOrderCommentsComponent implements OnInit, OnDestroy {
  public columnDefs ;
  public rowData: any[] = [];
  public gridOptions: GridOptions;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public store: Store<any>) {
    this.columnDefs = getColumnDefs();
    this.gridOptions = <GridOptions>{
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35
    };
  }

  ngOnInit() {
    this.store.select('saleOrderCommentsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if ( data.saleOrderComments.length > 0) {
          this.rowData = _.orderBy(data.saleOrderComments, ['ID'], ['desc']);
          localStorage.removeItem('commentsRowData');
          localStorage.setItem('commentsRowData', JSON.stringify(this.rowData));
        }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.store.dispatch(new loadActions.DestroySaleOrderComments(null));
  }

}
