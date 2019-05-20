import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { GridOptions } from 'ag-grid';
import 'ag-grid-enterprise/main';
import * as moment from 'moment';
import * as searchActions from '../../store/Actions/app.actions';
import { SO } from '../../models/SO';
import { searchReducer } from '../../store/reducers/searchReducer';
import { AnchorComponent } from '../../data.grid/grid.anchor.component';
import { AnchorTransactionComponent } from '../../data.grid/grid.anchorTransaction.component';
import * as _ from 'lodash';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-customer-sale-orders',
  templateUrl: './customer-sale-orders.component.html',
  styleUrls: ['./customer-sale-orders.component.css']
})

export class CustomerSaleOrdersComponent implements OnInit, OnDestroy {
  public gridOptions: GridOptions;
  public gridApi: any;
  public columnDefs: any[];
  public rowsDisplayed = 100;
  public data$: Observable<any>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @Input() public searchedSaleOrders: any[] = [];

  constructor(public store: Store<any>) {

    this.store.select('searchReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (data.searchState && data.searchState.searchResult) {

        const uniquedata = _.uniqBy(data.searchState.searchResult,
          function (elem: any) {
            return [elem.CUST_CD, elem.SHIP_TO_B_PHONE, elem.SHIP_TO_H_PHONE
              , elem.SHIP_TO_ZIP_CD, elem.SHIP_TO_CITY, elem.SHIP_TO_ST_CD].join();
          });
        this.searchedSaleOrders = uniquedata;
      }
    });

  }

  ngOnInit() {

    this.createColumnDefs();
    this.gridOptions = <GridOptions>{
      columnDefs: this.columnDefs,
      enableFilter: true,
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35
    };

    this.gridOptions.columnDefs = this.columnDefs;

    this.store.select('paramsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (data.searchParams && data.searchParams.RowsDisplayed) {
        this.rowsDisplayed = +data.searchParams.RowsDisplayed;
        if (this.gridApi)
          this.gridApi.paginationSetPageSize(this.rowsDisplayed);
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: 'Company Code', field: 'CO_CD', width: 109
      },
      {
        headerName: 'Customer', field: 'CUST_NAME', width: 154

        , cellRendererFramework: AnchorComponent
      },
      {
        headerName: 'Cust Code OCINQ', field: 'CUST_CD', width: 124,
        cellRendererFramework: AnchorTransactionComponent
      },
      {
        headerName: 'Ship To Address', field: 'SHIP_TO_ADDR1', width: 250,
        cellRenderer: function (params) {
          return `<Div>${params.value}</Div>`;
        }
      },
      {
        headerName: 'City', field: 'SHIP_TO_CITY', width: 123
      },
      {
        headerName: 'State', field: 'SHIP_TO_ST', width: 90
      },
      {
        headerName: 'Zip', field: 'SHIP_TO_ZIP_CD', width: 60
      },
      {
        headerName: 'Home Phone', field: 'SHIP_TO_H_PHONE', width: 98
      },
      {
        headerName: 'Business Phone', field: 'SHIP_TO_B_PHONE', width: 115

      },
      {
        headerName: 'Email', field: 'EMAIL_ADDR', width: 225

      }
    ];
  }
}
