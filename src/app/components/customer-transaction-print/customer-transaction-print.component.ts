import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid';
import { Subject } from 'rxjs/Subject';
import { ListViewComponent } from "../../data.grid/grid-anchor.listView.component";
import { CustomPinnedRowRenderer } from '../../data.grid/custom-pinned-row-renderer.component';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Common } from '../../common/common';

@Component({
  selector: 'app-customer-transaction-print',
  templateUrl: './customer-transaction-print.html'
})
export class CustomerTransactionPrintComponent implements OnInit, OnDestroy {
  comments: any[] = [];
  searchedSaleOrders: any = {};
  commentsColumnDefs;
  customerTransactionColumnDefs;
  public commentsGridOptions: GridOptions;
  public customerTranGridOptions: GridOptions;
  public getRowStyle;
  public pinnedBottomRowData = null;
  public frameworkComponents;
  public api: GridApi;
  public columnApi: ColumnApi;
  public gridApi: any;
  gridData: any[] = [];
  totalDebit: number = 0;
  totalCredit: number = 0;
  public rowData = null;
  pagedItems: any[];
  showList: boolean = false;
  isExclude: boolean = false;
  displayColumnsValues: boolean = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
    this.customerTransactionColumnDefs = [
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
        width: 290,
        cellStyle: { "white-space": "normal" }
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

    this.commentsColumnDefs = [
      {
        headerName: 'Date', field: 'CMNT_DT', width: 85, valueFormatter: Common.dateFormatRenderer
      },
      {
        headerName: 'Comments', field: 'TEXT', width: 1066
      }
    ];
    this.commentsGridOptions = <GridOptions>{
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35
    };

    this.customerTranGridOptions = <GridOptions>{
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35,
      context: { gridContext: this }
    };

    this.customerTranGridOptions.getRowHeight = function (params) {
      if (params.data && params.data.DES && params.data.DES.length > 40) {
        return 26 * (Math.floor(params.data.DES.length / 35) + 1);
      }
      return 35;
    };
    
    this.comments = JSON.parse(localStorage.getItem('commentsPrintObj'));
    this.searchedSaleOrders = JSON.parse(localStorage.getItem('customerTranInfoPrintObj'));
    this.rowData = JSON.parse(localStorage.getItem('customerTranGridPrintObj'));
    this.isExclude = JSON.parse(localStorage.getItem('isExclude'));
    this.showList = JSON.parse(localStorage.getItem('showList'));
    this.pagedItems = JSON.parse(localStorage.getItem('pagedItems'));
    this.displayColumnsValues = JSON.parse(localStorage.getItem('displayColumnsValues'));
    
    this.getRowStyle = function(params) {
      if (params.node.rowPinned) {
        return { "font-weight": "bold" };
      }
    };

    this.frameworkComponents = { customPinnedRowRenderer: CustomPinnedRowRenderer };
    this.pinnedBottomRowData = [
      {
        
        Credit: this.rowData ? Common.currencyFormatter(this.GetCreditSum()): Common.currencyFormatter(0),
        Debit: this.rowData ? Common.currencyFormatter(this.GetDebitSum()): Common.currencyFormatter(0),
      }
    ];
    if(this.gridApi) {
      this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
    }
  }

  ngOnInit() {
    setTimeout(()=>{
      window.print();  
   },1000);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  private onReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
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
}
