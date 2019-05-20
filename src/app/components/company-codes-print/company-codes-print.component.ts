import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GridOptions } from 'ag-grid';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { COMPANIES } from '../../models/COMPANIES';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { Common } from '../../common/common';

@Component({
  selector: 'app-company-codes-print',
  templateUrl: './company-codes-print.html'
})
export class CompanyCodesPrintComponent implements OnInit, OnDestroy {
  gridOptions: GridOptions;
  columnDefs: any[];
  pagedItems: any[];
  showList: boolean = false;
  isExclude: boolean = false;
  displayColumnsValues: boolean = false;
  public data$: Observable<any>;
  public companyCodes: COMPANIES[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {

    this.gridOptions = <GridOptions>{
      enableFilter: true,
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35,
      context: { gridContext: this }
    };
    this.createColumnDefs();
    this.gridOptions.columnDefs = this.columnDefs;

    this.gridOptions.getRowHeight = function (params) {
      if (params.data && params.data.NAME && params.data.NAME.length > 50) {
        return 26 * (Math.floor(params.data.NAME.length / 45) + 1);
      }
      return 35;
    };
    
    this.companyCodes = JSON.parse(localStorage.getItem('companyCodes'));
    this.isExclude = JSON.parse(localStorage.getItem('isExclude'));
    this.showList = JSON.parse(localStorage.getItem('showList'));
    this.pagedItems = JSON.parse(localStorage.getItem('pagedItems'));
    this.displayColumnsValues = JSON.parse(localStorage.getItem('displayColumnsValues'));
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
        headerName: 'Code', field: 'CODE', width: 110,
        getQuickFilterText: function(params) {
          return params.value.name;
      }
      },
      {
        headerName: 'Name', field: 'NAME', width: 300, cellStyle: { "white-space": "normal" }
      },
      {
        headerName: 'Added On', field: 'ADDED_ON', width: 150,
        valueFormatter: Common.dateFormatRenderer
      },
      {
        headerName: 'Originalsystem', field: 'ORIGINALSYSTEM', width: 250
      },
      {
        headerName: 'Project Name', field: 'PROJECT_NAME', width: 180
      },
      {
        headerName: 'Status', field: 'STATUS', width: 145
      },
    ];
  }

}
