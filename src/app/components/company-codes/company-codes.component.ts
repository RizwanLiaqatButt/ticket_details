import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { CompanyService } from '../../services/company.service';
import { COMPANIES } from '../../models/COMPANIES';
import { Subscription } from 'rxjs/Subscription';
import * as searchActions from '../../store/Actions/app.actions';
import { PagerService } from '../../services/pager.service';
import { ListViewComponent } from '../../data.grid/grid-anchor.listView.component';
import * as _ from 'lodash';
import 'rxjs/add/operator/takeUntil';
import { Common } from '../../common/common';

@Component({
  selector: 'app-company-codes',
  templateUrl: './company-codes.component.html',
  styleUrls: ['./company-codes.component.css']
})
export class CompanyCodesComponent implements OnInit, OnDestroy {
  public gridOptions: GridOptions;
  public columnDefs: any[];
  public data$: Observable<any>;
  public companyCodes: COMPANIES[] = [];
  showList = false;
  private allItems: any[] = [];
  pager: any = {};
  totalData = 0;
  myData = 0;
  totalCompanies = 0;
  pagedItems: any[];
  searchTerm: string;
  public rowsDisplayed = 100;
  public displayColumnsValues: boolean = false;
  public isExclude: boolean = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private pagerService: PagerService, public store: Store<any>) {
    this.store.select('companyCodesReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (data !== undefined && data.COMPANIES) {
        this.companyCodes = data.COMPANIES;
        _.remove(this.companyCodes, function(arr: any) {
          return arr.CODE == 'All';
        });
        this.companyCodes = _.orderBy(this.companyCodes, ['CODE'], ['asc']);

        localStorage.removeItem('companyCodes');
        localStorage.setItem('companyCodes', JSON.stringify(this.companyCodes));

        localStorage.removeItem('isExclude');
        localStorage.setItem('isExclude', JSON.stringify(this.isExclude));

        localStorage.removeItem('showList');
        localStorage.setItem('showList', JSON.stringify(this.showList));

        localStorage.removeItem('pagedItems');
        localStorage.setItem('pagedItems', JSON.stringify(this.pagedItems));
        
        localStorage.removeItem('displayColumnsValues');
        localStorage.setItem('displayColumnsValues', JSON.stringify(this.displayColumnsValues));
        
        this.totalCompanies = this.companyCodes.length;
        for (let i = 0; i < this.companyCodes.length; i++) {
          this.allItems.push(this.companyCodes[i]);
          for (const key in this.companyCodes[i]) {
            ++this.totalData;
          }
          this.myData = this.totalData;
          this.totalData = 0;
        }
        this.setPage(1);
      }
    });
    this.gridOptions = <GridOptions>{
      enableFilter: true,
      enableColResize: true,
      headerHeight: 35,
      rowHeight: 35,
      context: { gridContext: this }
    };
    this.createColumnDefs();
    this.gridOptions.columnDefs = this.columnDefs;
  }

  excludeNullValues() {
    this.isExclude = !this.isExclude;
    localStorage.removeItem('isExclude');
    localStorage.setItem('isExclude', JSON.stringify(this.isExclude));
  }

  ngOnInit() {
    
  }

  print() {
    let baseHref: string = document.getElementsByTagName("base")[0].href;
    window.open(baseHref + 'companyCodesPrint','_blank','');
  }

displayColumns()
  {
    this.displayColumnsValues=!this.displayColumnsValues;
    localStorage.removeItem('displayColumnsValues');
    localStorage.setItem('displayColumnsValues', JSON.stringify(this.displayColumnsValues));
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: '',
        cellRendererFramework: ListViewComponent,
        width: 30
      },
      {
        headerName: 'Code', field: 'CODE', width: 110,
        getQuickFilterText: function(params) {
          return params.value.name;
      }
      },
      {
        headerName: 'Name', field: 'NAME', width: 300
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
  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter(this.searchTerm);
  }

  onChange(value) {
    this.rowsDisplayed = value;
    this.gridOptions.api.paginationSetPageSize(this.rowsDisplayed);
  }

}
