import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as loadActions from '../../store/Actions/app.actions';
import { SalesDetailComponent } from '../../data.grid/grid.anchor.saleDetails.component';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { GridOptions } from 'ag-grid';
import { CustomPinnedRowRenderer } from '../../data.grid/custom-pinned-row-renderer.component';
import 'rxjs/add/operator/takeUntil';
import { Common } from '../../common/common';

@Component({
  selector: 'app-customer-invoice-items',
  templateUrl: './customer-invoice-items.component.html',
})
export class CustomerInvoicesItemsComponent implements OnInit, OnDestroy {
  columnDefs;
  rowData = null;
  public gridData: any[] = [];
  public gridOptions: GridOptions;
  public pinnedBottomRowData = null;
  private qtySum: number = 0;
  private shipQtySum: number = 0;
  private netlineSum: number = 0;
  public frameworkComponents;
  public getRowStyle;
  private gridApi;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public store: Store<any>) {

    this.columnDefs = [
      { headerName: 'Finalize Date', field: 'FINAL_DT', width: 100, pinnedRowCellRenderer: "customPinnedRowRenderer" },
      { headerName: 'Item', field: 'ITM_CD', width: 100, cellRendererFramework: SalesDetailComponent },
      { headerName: 'Qty Ord', field: 'Quantity_Ordered', width: 66, pinnedRowCellRenderer: "customPinnedRowRenderer" },
      { headerName: 'Store', field: 'STORE_CD', width: 60 },
      { headerName: 'Type', field: 'Type', width: 72 },
      { headerName: 'Description', field: 'Description', width: 250 },
      { headerName: 'Qty Shpd', field: 'Quantity_Shipped', width: 75, pinnedRowCellRenderer: "customPinnedRowRenderer" },
      { headerName: 'Unit Price', field: 'UNIT_PRC', width: 77, valueFormatter: Common.currencyFormatRenderer },
      { headerName: 'Net Line', field: 'Calculated_NetLine_Amount', width: 80, valueFormatter: Common.currencyFormatRenderer, pinnedRowCellRenderer: "customPinnedRowRenderer" }
    ];

    this.gridOptions = <GridOptions> {
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
    let res: string = "\\\"" + params.ITM_CD + "\\\"";
    return res;
  }

  ngOnInit() {

    this.store.select('customerDetailsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (!this.rowData && data && data.customerInvoiceDetails && data.customerInvoiceDetails.length > 0 && data.invoiceItemsDetail && data.invoiceItemsDetail.length <= 0) {
        data.customerInvoiceDetails.forEach(element => {
          element.FINAL_DT = Common.dateFormatter(element.FINAL_DT);
        });
        this.rowData = _.orderBy(data.customerInvoiceDetails, ['FINAL_DT','ITM_CD'], ['asc']);
        this.pinnedBottomRowData = [
          {
            FINAL_DT: "Report total:",
            Quantity_Ordered: this.rowData ? this.totalQty(): 0,
            Quantity_Shipped: this.rowData ? this.totalShippedQty(): 0,
            Calculated_NetLine_Amount: this.rowData ? Common.currencyFormatter(this.totalNetLine()):Common.currencyFormatter(0)
          }
        ];
        if(this.gridApi) {
          this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
        }

        this.gridData = this.rowData;
        localStorage.removeItem('invoiceItemGridData');
        localStorage.setItem('invoiceItemGridData', JSON.stringify(this.rowData));

        let uniqueItemCodeRows: any = _.uniqBy(this.rowData, 'ITM_CD');
        let uniqueItemCodes: any = _.map(uniqueItemCodeRows, this.setQuotes).join(' OR ');
        this.store.dispatch(new loadActions.GetItemsDetail({ CO_CD: this.rowData[0].CO_CD, ITM_CD_LIST: uniqueItemCodes }));
      }
        
      if (data && data.invoiceItemsDetail && data.invoiceItemsDetail.length > 0) {
        data.invoiceItemsDetail.forEach(inv => {
          if (this.rowData && this.rowData.length > 0) {
            this.rowData.forEach(row => {
              if (row.ITM_CD === inv.ITM_CD) {
                row.Description = inv.Description;
              }
            });
          }
        });
        this.gridData = this.rowData && this.rowData.length > 0 ? this.rowData.slice() : [];
        localStorage.removeItem('invoiceItemGridData');
        localStorage.setItem('invoiceItemGridData', JSON.stringify(this.gridData));
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.store.dispatch(new loadActions.DestroyItemsDetail(null));
  }
  
  private totalQty() {
    for (let i = 0; i < this.rowData.length; i++) {
      this.qtySum += +this.rowData[i].Quantity_Ordered
    }
    return this.qtySum;
  }

  private totalShippedQty() {
    for (let i = 0; i < this.rowData.length; i++) {
        this.shipQtySum += this.rowData[i].Quantity_Shipped
    }
    return this.shipQtySum;
  }
  
  private totalNetLine() {
    for (let i = 0; i < this.rowData.length; i++) {
      this.netlineSum += +this.rowData[i].Calculated_NetLine_Amount
    }
    return this.netlineSum.toFixed(2);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }
}
