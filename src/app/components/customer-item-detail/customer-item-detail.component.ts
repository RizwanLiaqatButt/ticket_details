import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as loadActions from '../../store/Actions/app.actions';
import * as _ from 'underscore';
import { PagerService } from '../../services/pager.service'
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as moment from 'moment';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-customer-item-detail',
  templateUrl: './customer-item-detail.component.html',
  styleUrls: ['./customer-item-detail.component.css']
})
export class CustomerItemDetailComponent implements OnInit, OnDestroy {
  public SalerOrderDetailsData: any;
  public itemDetailsParams = [];
  public treatmentReference = [];
  public warrentyReference = [];
  public pager: any = {};
  public pagedItems: any[];
  public pageNo: number = 0;
  public ItemDetails: any;
  public companyCode: "";
  public FullName: string = "";
  public delDocNumber: string = "";
  rowData = null;
  public gridData: any[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public store: Store<any>, private pagerService: PagerService,public companyService:CompanyService) {
    this.store.select('customerDetailsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if (!this.rowData && data && data.customerInvoiceDetails && data.customerInvoiceDetails.length > 0 && data.invoiceItemsDetail && data.invoiceItemsDetail.length <= 0) {
        this.rowData = data.customerInvoiceDetails;
        let uniqueItemCodes: any = _.map(this.rowData, this.setQuotes).join(' OR ');
        this.store.dispatch(new loadActions.GetItemsDetail({ CO_CD: this.rowData[0].CO_CD, ITM_CD_LIST: uniqueItemCodes }));
      }
      else if (data && data.invoiceItemsDetail && data.invoiceItemsDetail.length > 0) {
        data.invoiceItemsDetail.forEach(inv => {
          this.rowData.forEach(row => {
            if (row.ITM_CD === inv.ITM_CD) {
              row.Description = inv.Description;
              row.FINISH = inv.FINISH;
              row.SIZ = inv.SIZ;
              row.VSN = inv.VSN;
              row.VE_CD = inv.VE_CD;
            }
          });
        });
      }
      this.SalerOrderDetailsData = this.rowData && this.rowData.length > 0 ? this.rowData : [];
      this.pager.totalPages = this.SalerOrderDetailsData.length;
      this.setPage(this.pageNo);
    });
  }
  setQuotes(params) {
    let res: string = "\\\"" + params.ITM_CD + "\\\"";
    return res;
  }
  setPage(page: number) {
    if (this.SalerOrderDetailsData) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }


      // get pager object from service
      this.pager = this.pagerService.getPager(this.SalerOrderDetailsData.length, page);

      // get current page of items
      this.pagedItems = this.SalerOrderDetailsData.slice(this.pager.startIndex, this.pager.endIndex + 1);
      localStorage.removeItem('pagedItems');
      localStorage.setItem('pagedItems', JSON.stringify(this.pagedItems));
    }

  }

  print() {
    
    let baseHref: string = document.getElementsByTagName("base")[0].href;
    window.open(baseHref + 'customerItemDetailPrint','_blank','');
  }

  ngOnInit() {

    this.store.select('paramsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      const customer = data.customerInvoiceDetail;
      this.FullName = data.customerSearch.CUST_FULL_NAME;
      localStorage.removeItem('FullName');
      localStorage.setItem('FullName', JSON.stringify(this.FullName ? this.FullName: ''));

      if (customer) {
        this.delDocNumber = customer.DEL_DOC_NUM;
        this.pageNo = customer.rowNumber;
        this.store.dispatch(new loadActions.GetCustomerItemDetailsFromStore({}));
        this.companyCode = customer.CO_CD;
        localStorage.removeItem('companyCode');
        localStorage.setItem('companyCode', JSON.stringify(this.companyCode? this.companyCode: ''));

        localStorage.removeItem('delDocNumber');
        localStorage.setItem('delDocNumber', JSON.stringify(this.delDocNumber? this.delDocNumber: ''));
      }
    });

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.store.dispatch(new loadActions.DestroyItemsDetail(null));
  }

}
