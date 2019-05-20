import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as loadActions from '../../store/Actions/app.actions';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Total } from '../../models/Total';
import { EMP } from '../../models/EMP';
import { GridOptions } from 'ag-grid';
import * as moment from 'moment';
import { SO_CMNT } from '../../models/SO_CMNT';
import { CustomPinnedRowRenderer } from '../../data.grid/custom-pinned-row-renderer.component';
import { Common } from '../../common/common';

@Component({
  selector: 'app-customer-invoice-detail-print',
  templateUrl: './customer-invoice-detail-print.component.html'
})
export class CustomerInvoiceDetailPrintComponent implements OnInit, OnDestroy {
  public customerInformation: any = null;
  public totals: Total = null;
  public salePerson: EMP = null;
  public firstSalePerson: boolean = false;
  public secondSalePerson: boolean = false;
  public commentsColumnDefs: any = null;
  public commentsRowData: any[] = [];
  public commentsGridOptions: GridOptions;
  public saleOrderSelectedComment: SO_CMNT = null;

  public invoiceItemColumnDefs: any = null;
  public invoiceItemGridData: any[] = [];
  public invoiceItemGridOptions: GridOptions;
  public invoiceItemPinnedBottomRowData = null;
  public invoiceItemQtySum: number = 0;
  public invoiceItemShipQtySum: number = 0;
  public invoiceItemNetlineSum: number = 0;
  public invoiceItemFrameworkComponents;
  public invoiceItemGetRowStyle;
  public invoiceItemGridApi;
  private invoiceItemGridColumnApi;
  public invoiceItemGetRowHeight;
  
  public columnDefs;
  public rowData = null;
  public gridData: any[] = [];
  public gridOptions: GridOptions;
  public pinnedBottomRowData = null;
  private totalCredit: number = 0;
  private totalDebit: number = 0;
  private totalAmount: number = 0;
  public frameworkComponents;
  public getRowStyle;
  private gridApi;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
    this.customerInformation = JSON.parse(localStorage.getItem('customerInformation'));
    this.totals = JSON.parse(localStorage.getItem('totals'));
    this.salePerson = JSON.parse(localStorage.getItem('salePerson'));
    this.firstSalePerson = JSON.parse(localStorage.getItem('firstSalePerson'));
    this.secondSalePerson = JSON.parse(localStorage.getItem('secondSalePerson'));
    this.commentsRowData = localStorage.getItem('commentsRowData') ? JSON.parse(localStorage.getItem('commentsRowData')): [];
    this.saleOrderSelectedComment = JSON.parse(localStorage.getItem('saleOrderSelectedComment'));
    this.invoiceItemGridData = localStorage.getItem('invoiceItemGridData')? JSON.parse(localStorage.getItem('invoiceItemGridData')):[];
    this.gridData = localStorage.getItem('invoiceDepositGridData') ? JSON.parse(localStorage.getItem('invoiceDepositGridData')): [];

    this.commentsColumnDefs = [
      {
        headerName: 'ID', field: 'ID', width: 76
      },
      {
        headerName: 'Comment', field: 'TEXT', width: 588, cellStyle: { "white-space": "normal" }
      }
    ];

    this.commentsGridOptions = <GridOptions>{
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35
    };

    this.commentsGridOptions.getRowHeight = function (params) {
      if (params.data && params.data.TEXT && params.data.TEXT.length > 80 ) {
        return 26 * (Math.floor(params.data.TEXT.length / 75) + 1);
      }
      return 35;
    };

    this.invoiceItemColumnDefs = [
      { headerName: 'Finalize Date', field: 'FINAL_DT', width: 100, pinnedRowCellRenderer: "customPinnedRowRenderer" },
      { headerName: 'Item', field: 'ITM_CD', width: 100 },
      { headerName: 'Qty Ord', field: 'Quantity_Ordered', width: 66, pinnedRowCellRenderer: "customPinnedRowRenderer" },
      { headerName: 'Store', field: 'STORE_CD', width: 60 },
      { headerName: 'Type', field: 'Type', width: 72 },
      { headerName: 'Description', field: 'Description', width: 250, cellStyle: { "white-space": "normal" } },
      { headerName: 'Qty Shpd', field: 'Quantity_Shipped', width: 75, pinnedRowCellRenderer: "customPinnedRowRenderer" },
      { headerName: 'Unit Price', field: 'UNIT_PRC', width: 77, valueFormatter: Common.currencyFormatRenderer },
      { headerName: 'Net Line', field: 'Calculated_NetLine_Amount', width: 80, valueFormatter: Common.currencyFormatRenderer, pinnedRowCellRenderer: "customPinnedRowRenderer" }
    ];

    this.invoiceItemGridOptions = <GridOptions> {
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35
    };

    this.invoiceItemGridOptions.getRowHeight = function (params) {
      if (params.data && params.data.Description && params.data.Description.length > 50) {
        return 26 * (Math.floor(params.data.Description.length / 45) + 1);
      }
      return 35;
    };

    this.invoiceItemGetRowStyle = function(params) {
      if (params.node.rowPinned) {
        return { "font-weight": "bold" };
      }
    };

    this.invoiceItemFrameworkComponents = { customPinnedRowRenderer: CustomPinnedRowRenderer };
    this.invoiceItemPinnedBottomRowData = [
      {
        FINAL_DT: "Report total:",
        Quantity_Ordered: this.invoiceItemGridData ? this.totalQty(): 0,
        Quantity_Shipped: this.invoiceItemGridData ? this.totalShippedQty(): 0,
        Calculated_NetLine_Amount: this.invoiceItemGridData ? Common.currencyFormatter(this.totalNetLine()): Common.currencyFormatter(0)
      }
    ];
    if(this.invoiceItemGridApi) {
      this.invoiceItemGridApi.setPinnedBottomRowData(this.invoiceItemPinnedBottomRowData);
    }

    this.columnDefs = [
      {
        headerName: 'Post Date',
        field: 'POST_DT',
        width: 95,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        valueFormatter: Common.dateFormatRenderer
      },
      {
        headerName: 'Trans. Type',
        field: 'TRN_TP_CD',
        width: 100
      },
      {
        headerName: 'Trans Type Descr.',
        field: 'DES',
        width: 310,
        cellStyle: { "white-space": "normal" }
      },
      {
        headerName: 'Trans Method',
        field: 'MOP_DES',
        width: 142
      },
      {
        headerName: 'Debit',
        field: 'Debit',
        width: 70,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        valueFormatter: Common.currencyFormatRenderer
      },
      {
        headerName: 'Credit',
        field: 'Credit',
        width: 70,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        valueFormatter: Common.currencyFormatRenderer
      },
      {
        headerName: 'Amount',
        field: 'Amount',
        width: 82,
        pinnedRowCellRenderer: "customPinnedRowRenderer",
        valueFormatter: Common.currencyFormatRenderer
      }
    ];
    this.gridOptions = <GridOptions>{
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35
    };

    this.gridOptions.getRowHeight = function (params) {
      if (params.data && params.data.DES && params.data.DES.length > 28) {
        return 26 * (Math.floor(params.data.DES.length / 26 ) + 1);
      }
      return 35;
    };

    this.getRowStyle = function(params) {
      if (params.node.rowPinned) {
        return { "font-weight": "bold" };
      }
    };

    this.frameworkComponents = { customPinnedRowRenderer: CustomPinnedRowRenderer };
    this.pinnedBottomRowData = [
      {
        POST_DT: "Report total:",
        TRN_TP_CD: '',
        DES: '',
        MOP_DES: '',
        Debit: this.gridData ? Common.currencyFormatter(this.debitSum()): Common.currencyFormatter(0),
        Credit: this.gridData ? Common.currencyFormatter(this.creditSum()): Common.currencyFormatter(0),
        Amount: this.gridData ? Common.currencyFormatter(this.amountSum()): Common.currencyFormatter(0)
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

  private totalQty() {
    for (let i = 0; i < this.invoiceItemGridData.length; i++) {
      this.invoiceItemQtySum += +this.invoiceItemGridData[i].Quantity_Ordered
    }
    return this.invoiceItemQtySum;
  }

  private totalShippedQty() {
    for (let i = 0; i < this.invoiceItemGridData.length; i++) {
        this.invoiceItemShipQtySum += this.invoiceItemGridData[i].Quantity_Shipped
    }
    return this.invoiceItemShipQtySum;
  }

  private totalNetLine() {
    for (let i = 0; i < this.invoiceItemGridData.length; i++) {
      this.invoiceItemNetlineSum += +this.invoiceItemGridData[i].Calculated_NetLine_Amount ;
    }
    return this.invoiceItemNetlineSum.toFixed(2);
  }

  onInvoiceItemGridReady(params) {
    this.invoiceItemGridApi = params.api;
    this.invoiceItemGridColumnApi = params.columnApi;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  private debitSum() {
    for (let i = 0; i < this.gridData.length; i++) {
      this.totalDebit += +this.gridData[i].Debit;
    }
    return this.totalDebit.toFixed(2);
  }

  private creditSum() {
    for (let i = 0; i < this.gridData.length; i++) {
      this.totalCredit += +this.gridData[i].Credit
    }
    return this.totalCredit.toFixed(2);
  }

  private amountSum() {
    for (let i = 0; i < this.gridData.length; i++) {
      this.totalAmount += +this.gridData[i].Amount
    }
    return this.totalAmount.toFixed(2);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }
}
