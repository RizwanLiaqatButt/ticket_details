import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid';
import { Store } from '@ngrx/store';
import * as loadActions from '../../store/Actions/app.actions';
import * as grid from './grid-potions';
import * as moment from 'moment';
import * as _ from 'lodash';
import { PagerService } from '../../services/pager.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ListViewComponent } from "../../data.grid/grid-anchor.listView.component";
import { CustomPinnedRowRenderer } from '../../data.grid/custom-pinned-row-renderer.component';
import * as searchActions from '../../store/Actions/app.actions';
import { Common } from '../../common/common';


@Component({
  selector: 'app-customer-transactions-grid',
  templateUrl: './customer-transactions-grid.component.html',
  styleUrls: ['./customer-transactions-grid.component.css']
})
export class CustomerTransactionsGridComponent implements OnInit, OnDestroy {
  public gridApi: any;
  public RowsDisplayed: number = 100;
  public gridOptions: GridOptions;
  public rowData = null;
  public columnDefs: any[];
  showList = false;
  private allItems: any[] = [];
  public CompanyCode: string;
  public DisplayedCoulmnsData: any = [];
  public isExclude: boolean = false;
  public displayColumnsValues: boolean = false;
  private previousObj = [];
  pager: any = {};
  totalData = 0;
  myData = 0;
  searchTerm: string;
  gridData: any[] = [];
  totalDebit: number = 0;
  totalCredit: number = 0;
  // paged items
  pagedItems: any[];

  private api: GridApi;
  private columnApi: ColumnApi;
  public pinnedBottomRowData = null;
  public frameworkComponents;
  public getRowStyle;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private pagerService: PagerService, public store: Store<any>) {
    this.gridOptions = <GridOptions>{
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35,
      context: { gridContext: this }
    };

    this.columnDefs = this.getColumnDefs();
    this.getRowStyle = function(params) {
      if (params.node.rowPinned) {
        return { "font-weight": "bold" };
      }
    };

    this.frameworkComponents = { customPinnedRowRenderer: CustomPinnedRowRenderer };
    this.store.select('invoiceDepositReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (!this.rowData && data && data.customerTransactions.length > 0 && data.invoiceTrn && data.invoiceTrn.length <= 0) {
        let runningTotal: number = 0;
        data.customerTransactions.forEach(element => {
          element.POST_DT = Common.dateFormatter(element.POST_DT);
        });
        this.rowData = _.orderBy(data.customerTransactions, ['POST_DT','IVC_CD'], ['asc']);
        _.remove(this.rowData, function(arr: any) {
          return (+arr.AMT) == 0  || (arr.Debit == 0 && arr.Credit == 0);
        });
        this.rowData.forEach(item => {
          runningTotal = runningTotal + (item.Debit - item.Credit);
          item.Total = runningTotal;
        });

        this.pinnedBottomRowData = [
          {
            
            Credit: this.rowData ? Common.currencyFormatter(this.GetCreditSum()): Common.currencyFormatter(0),
            Debit: this.rowData ? Common.currencyFormatter(this.GetDebitSum()): Common.currencyFormatter(0),
          }
        ];
        if(this.gridApi) {
          this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
        }
        
        localStorage.removeItem('customerTranGridPrintObj');
        localStorage.setItem('customerTranGridPrintObj', JSON.stringify(this.rowData));

        localStorage.removeItem('isExclude');
        localStorage.setItem('isExclude', JSON.stringify(this.isExclude));

        localStorage.removeItem('showList');
        localStorage.setItem('showList', JSON.stringify(this.showList));

        localStorage.removeItem('pagedItems');
        localStorage.setItem('pagedItems', JSON.stringify(this.pagedItems));
        
        localStorage.removeItem('displayColumnsValues');
        localStorage.setItem('displayColumnsValues', JSON.stringify(this.displayColumnsValues));

        let uniqueTrnTpRows: any = _.uniqBy(this.rowData, 'TRN_TP_CD');
        let uniqueTrnTpCodes: any = _.map(uniqueTrnTpRows, this.setQuotes).join(' OR ');
        let uniqueMopCodeRows: any = _.uniqBy(this.rowData, 'MOP_CD');
        let uniqueMopCodes: any = _.map(uniqueMopCodeRows, this.setMopQuotes).join(' OR ');
        this.store.dispatch(new loadActions.LoadInvoiceDepositTrn({ CO_CD: this.rowData[0].CO_CD, TRN_TP_CD_LIST: uniqueTrnTpCodes }));
        this.store.dispatch(new loadActions.LoadInvoiceDepositMopTrn({ CO_CD: this.rowData[0].CO_CD, MOP_CD_LIST: uniqueMopCodes }));
      }
      let newArr = [];
      if (data && data.invoiceTrn && data.invoiceTrn.length > 0) {
        data.invoiceTrn.forEach(inv => {
          let inner: number = 0;
          this.rowData.forEach(row => {
            this.rowData[inner].Reference = this.rowData[inner].DES;
            this.rowData[inner].Balance = this.rowData[inner].Amount;
            if (row.TRN_TP_CD === inv.TRN_TP_CD) {
              this.rowData[inner].DES = inv.DES;
            }
            inner++;
          });
        });
        this.gridData = this.rowData && this.rowData.length > 0 ? this.rowData.slice() : [];
        localStorage.removeItem('customerTranGridPrintObj');
        localStorage.setItem('customerTranGridPrintObj', JSON.stringify(this.gridData));
        this.allItems = this.gridData;


      }

      if (data && data.mopTrn && data.mopTrn.length > 0) {
        data.mopTrn.forEach(mop => {
          let inner: number = 0;
          newArr = this.rowData.slice();
          newArr.forEach(row => {
            if (row.MOP_CD === mop.MOP_CD) {
              newArr[inner].MOP_DES = mop.DES;
            }
            inner++;
          });
        });
        this.gridData = newArr && newArr.length > 0 ? newArr : [];
        localStorage.removeItem('customerTranGridPrintObj');
        localStorage.setItem('customerTranGridPrintObj', JSON.stringify(this.gridData));
        this.allItems = this.gridData;
        // this.buildOnlyDisplayedCoulmnData(this.allItems);
        this.setPage(1);
      }


    });

  }

  displayColumns(event) {
    this.displayColumnsValues = event.target.checked;
    localStorage.removeItem('displayColumnsValues');
    localStorage.setItem('displayColumnsValues', JSON.stringify(this.displayColumnsValues));
  }
  buildOnlyDisplayedCoulmnData(allItems: any) {
    this.columnDefs.forEach(element => {
      if (element.headerName) {
        for (var i = 0; i < allItems.length; i++) {
          let obj = {};
          for (var key in allItems[i]) {
            if (key == element.field) {
              obj[`${key}`] = allItems[i].value;
            }
          }
          this.DisplayedCoulmnsData.push(obj);
        }
      }
    });
  }
  getColumnDefs() {
    const colDefs = [
      {
        headerName: '',
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        cellRendererFramework: ListViewComponent,
        width: 30
      },
      {
        headerName: 'Invoice #',
        field: 'IVC_CD',
        width: 118
      },
      {
        headerName: 'Reference',
        field: 'DES',
        width: 90
      },
      {
        headerName: 'Post Date',
        field: 'POST_DT',
        width: 95,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        valueFormatter: Common.dateFormatRenderer
      },
      {
        headerName: 'MOP',
        field: 'MOP_CD',
        width: 90
      },
      {
        headerName: 'TRN',
        field: 'TRN_TP_CD',
        width: 95
      },
      {
        headerName: 'TRN Description',
        field: 'DES',
        width: 290
      },
      {
        headerName: 'Status',
        field: 'STAT_CD',
        width: 80
      },
      {
        headerName: 'Debit',
        field: 'Debit',
        width: 71,
        valueFormatter: Common.currencyFormatRenderer,
        pinnedRowCellRenderer: "customPinnedRowRenderer"
      },
      {
        headerName: 'Credit',
        field: 'Credit',
        width: 72,
        valueFormatter: Common.currencyFormatRenderer,
        pinnedRowCellRenderer: "customPinnedRowRenderer"
      },
      {
        headerName: 'Running Total',
        field: 'Total',
        width: 120,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        valueFormatter: Common.currencyFormatRenderer
      }
    ];
    return colDefs;
  }

  setQuotes(params) {
    let res: string = "\\\"" + params.TRN_TP_CD + "\\\"";
    return res;
  }

  setMopQuotes(params) {
    let res: string = "\\\"" + params.MOP_CD + "\\\"";
    return res;
  }

  ngOnInit() {
    this.store.select('paramsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      const customer = data.customerSearch;
      if (customer) {
        this.store.dispatch(new loadActions.GetCustomerTransaction({ CO_CD: customer.CO_CD, CUST_CD: customer.CUST_CD }));
      }
    });
  }

  private onReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }
  toogleList() {
    this.showList = !this.showList;
    localStorage.removeItem('showList');
    localStorage.setItem('showList', JSON.stringify(this.showList));
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page, 1);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    localStorage.removeItem('pagedItems');
    localStorage.setItem('pagedItems', JSON.stringify(this.pagedItems));
  }



  excludeNullValues(event) {
    this.isExclude = event.target.checked;
    localStorage.removeItem('isExclude');
    localStorage.setItem('isExclude', JSON.stringify(this.isExclude));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter(this.searchTerm);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.store.dispatch(new loadActions.DestroyInvoiceDepositTrn(null));
  }
  onChange(value) {
    this.RowsDisplayed = value;
    this.gridApi.paginationSetPageSize(this.RowsDisplayed);  
  }

  private GetCreditSum() {
    for (let i = 0; i < this.rowData.length; i++) {
      this.totalCredit += this.rowData[i].Credit;
    }
    return this.totalCredit.toFixed(2);
  }

  private GetDebitSum() {
    for (let i = 0; i < this.rowData.length; i++) {
      this.totalDebit += +this.rowData[i].Debit
    }
    return this.totalDebit.toFixed(2);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }
}