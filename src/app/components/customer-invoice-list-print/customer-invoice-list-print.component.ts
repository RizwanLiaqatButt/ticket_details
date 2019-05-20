import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { SO } from '../../models/SO';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Common } from '../../common/common';

@Component({
  selector: 'app-customer-invoice-list-print',
  templateUrl: './customer-invoice-list-print.html'
})
export class CustomerInvoiceListPrintComponent implements OnInit, OnDestroy {
  public gridOptions: GridOptions;
  public columnDefs: any[];
  public rowData: any[];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {

    this.gridOptions = <GridOptions>{
      enableFilter: true,
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35
    };
    this.createColumnDefs();
    this.gridOptions.columnDefs = this.columnDefs;
    this.rowData = JSON.parse(localStorage.getItem('printObj'));

    this.gridOptions.getRowHeight = function (params) {
      if (params.data && params.data.SHIP_TO_ADDR1 && params.data.SHIP_TO_ADDR1.length > 50) {
        return 26 * (Math.floor(params.data.SHIP_TO_ADDR1.length / 45) + 1);
      }
      return 35;
    };

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

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: 'Company Code', field: 'CO_CD', width: 114
      },
      {
        headerName: 'Customer ID', field: 'CUST_CD', width: 120
      },
      {
        headerName: 'DEL DOC NUM', field: 'DEL_DOC_NUM', width: 180

      },
      {
        headerName: 'Customer Name', field: 'CUST_NAME', width: 184
      },
      {
        headerName: 'Address', field: 'SHIP_TO_ADDR1', width: 351, cellStyle: { "white-space": "normal" }
      },
      {
        headerName: 'Invoice Date', field: 'FINAL_DT', width: 133, valueFormatter: Common.dateFormatRenderer
      }
    ];
  }

}