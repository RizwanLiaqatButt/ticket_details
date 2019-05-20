import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { SO } from '../../models/SO';
import { AnchorInvoiceListComponent } from '../../data.grid/grid.anchor.invoiceList.component';
import { Store } from '@ngrx/store';
import * as searchActions from '../../store/Actions/app.actions';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Common } from '../../common/common';
import * as _ from 'lodash';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, OnDestroy {
  public gridOptions: GridOptions;
  public columnDefs: any[];
  public rowData: any[];
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  @Input() public searchedSaleOrders: SO[] = [];

  constructor(public store: Store<any>) {

    this.store.select('invoiceListReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (data.iListState && data.iListState.searchResult) {
       data.iListState.searchResult.forEach(element => {
         element.FINAL_DT = Common.dateFormatter(element.FINAL_DT);
       }); 

       this.rowData = _.sortBy(data.iListState.searchResult, (o) => {
        return moment(o.FINAL_DT);
      });
        
        localStorage.removeItem('printObj');
        localStorage.setItem('printObj', JSON.stringify(this.rowData));
      }
    });

    this.gridOptions = <GridOptions>{
      enableFilter: true,
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35
    };
    this.createColumnDefs();
    this.gridOptions.columnDefs = this.columnDefs;
  }

  ngOnInit() {
    this.store.select('paramsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      const customer = data.customerSearch;
      if(customer)
      this.store.dispatch(new searchActions.GetInvoiceList({ 'CO_CD': customer.CO_CD, 'CUST_CD': customer.CUST_CD }));
    });
  }

  print() {
    let baseHref: string = document.getElementsByTagName("base")[0].href;
    window.open(baseHref + 'customerInvoiceListPrint','_blank','');
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
        headerName: 'DEL DOC NUM', field: 'DEL_DOC_NUM', width: 180, cellRendererFramework: AnchorInvoiceListComponent

      },
      {
        headerName: 'Customer Name', field: 'CUST_NAME', width: 184
      },
      {
        headerName: 'Address', field: 'SHIP_TO_ADDR1', width: 451
      },
      {
        headerName: 'Invoice Date', field: 'FINAL_DT', width: 133, valueFormatter: Common.dateFormatRenderer
      }
    ];
  }

}