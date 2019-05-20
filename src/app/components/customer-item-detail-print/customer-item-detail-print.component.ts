import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as loadActions from '../../store/Actions/app.actions';
import * as _ from 'underscore';
import { PagerService } from '../../services/pager.service'
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-item-detail-print',
  templateUrl: './customer-item-detail-print.html'
})
export class CustomerItemDetailPrintComponent implements OnInit, OnDestroy {
  private SalerOrderDetailsData: any;
  private itemDetailsParams = [];
  public pagedItems: any[];
  private ItemDetails: any;
  private companyCode: "";
  public FullName: string = "";
  public delDocNumber: string = "";
  rowData = null;
  public gridData: any[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
    this.FullName = JSON.parse(localStorage.getItem('FullName'));
    this.delDocNumber = JSON.parse(localStorage.getItem('delDocNumber'));
    this.companyCode = JSON.parse(localStorage.getItem('companyCode'));
    this.pagedItems = JSON.parse(localStorage.getItem('pagedItems'));
  }
  setQuotes(params) {
    let res: string = "\\\"" + params.ITM_CD + "\\\"";
    return res;
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

}
