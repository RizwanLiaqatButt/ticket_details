import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as loadActions from '../../store/Actions/app.actions';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { GridOptions } from 'ag-grid';
import { CustomPinnedRowRenderer } from '../../data.grid/custom-pinned-row-renderer.component';
import 'rxjs/add/operator/takeUntil';
import { Common } from '../../common/common';

@Component({
  selector: 'app-invoice-deposits',
  templateUrl: './invoice-deposits.component.html',
})
export class InvoiceDepositsComponent implements OnInit, OnDestroy {
  columnDefs;
  rowData = null;
  gridData: any[] = [];
  public gridOptions: GridOptions;
  public pinnedBottomRowData = null;
  private totalCredit: number = 0;
  private totalDebit: number = 0;
  private totalAmount: number = 0;
  public frameworkComponents;
  public getRowStyle;
  private gridApi;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public store: Store<any>) {
    this.columnDefs = this.getColumnDefs();
    this.gridOptions = <GridOptions>{
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35
    };

    this.getRowStyle = function(params) {
      if (params.node.rowPinned) {
        return { "font-weight": "bold" };
      }
    };

    this.frameworkComponents = { customPinnedRowRenderer: CustomPinnedRowRenderer };
  }

  setQuotes(params) {
    let res: string = "\\\"" + params.TRN_TP_CD + "\\\"";
    return res;
  }

  setMopQuotes(params) {
    let res: string = "\\\"" + params.MOP_CD + "\\\"";
    return res;
  }

  getColumnDefs() {
    const colDefs = [
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
        width: 310
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
    return colDefs;
  }

  ngOnInit() {
    this.store.select('invoiceDepositReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (!this.rowData && data && data.invoiceDeposits && data.invoiceDeposits.length > 0 && data.invoiceTrn && data.invoiceTrn.length <= 0) {
        
        this.rowData = data.invoiceDeposits;
        _.remove(this.rowData, function(arr: any) {
          return (+arr.AMT) == 0 || (arr.Debit == 0 && arr.Credit == 0);
        });
        
        this.pinnedBottomRowData = [
          {
            POST_DT: "Report total:",
            TRN_TP_CD: '',
            DES: '',
            MOP_DES: '',
            Debit: this.rowData ? Common.currencyFormatter(this.debitSum()): Common.currencyFormatter(0),
            Credit: this.rowData ? Common.currencyFormatter(this.creditSum()): Common.currencyFormatter(0),
            Amount: this.rowData ? Common.currencyFormatter(this.amountSum()): Common.currencyFormatter(0)
          }
        ];
        if(this.gridApi) {
          this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
        }
        
        this.rowData.forEach(element => {
          element.POST_DT = Common.dateFormatter(element.POST_DT);
        });

        this.rowData = _.orderBy(this.rowData, ['POST_DT','TRN_TP_CD'], ['asc']);
        this.gridData = this.rowData;
        localStorage.removeItem('invoiceDepositGridData');
        localStorage.setItem('invoiceDepositGridData', JSON.stringify(this.gridData));

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
          newArr = this.rowData.slice();
          newArr.forEach(row => {
            if (row.TRN_TP_CD === inv.TRN_TP_CD) {
              newArr[inner].DES = inv.DES;
            }
            inner++;
          });
        });
        this.gridData = newArr && newArr.length > 0 ? newArr : [];
        localStorage.removeItem('invoiceDepositGridData');
        localStorage.setItem('invoiceDepositGridData', JSON.stringify(this.gridData));
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
        localStorage.removeItem('invoiceDepositGridData');
        localStorage.setItem('invoiceDepositGridData', JSON.stringify(this.gridData));
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.store.dispatch(new loadActions.DestroyInvoiceDepositTrn(null));
  }

  private debitSum() {
    for (let i = 0; i < this.rowData.length; i++) {
      this.totalDebit += +this.rowData[i].Debit;
    }
    return this.totalDebit.toFixed(2);
  }

  private creditSum() {
    for (let i = 0; i < this.rowData.length; i++) {
      this.totalCredit += +this.rowData[i].Credit
    }
    return this.totalCredit.toFixed(2);
  }

  private amountSum() {
    for (let i = 0; i < this.rowData.length; i++) {
      this.totalAmount += +this.rowData[i].Amount
    }
    return this.totalAmount.toFixed(2);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }
}

