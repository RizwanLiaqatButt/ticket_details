import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as loadActions from '../../store/Actions/app.actions';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-customer-invoice-detail',
  templateUrl: './customer-invoice-detail.component.html',
  styleUrls: ['./customer-invoice-detail.component.css']
})
export class CustomerInvoiceDetailComponent implements OnInit, OnDestroy {
  public CompanyCode: string;
  public Del_Doc_Num: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public store: Store<any>) {
    }

  print() {
    let baseHref: string = document.getElementsByTagName("base")[0].href;
    window.open(baseHref + 'customerInvoiceDetailPrint','_blank','');
  }

  ngOnInit() {
    this.store.select('paramsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      const customer = data.customerInvoice;
      if(customer) {
        this.store.dispatch(new loadActions.LoadCustomerInformation({ CompanyCode: customer.CO_CD, SearchText: customer.DEL_DOC_NUM }));
        this.store.dispatch(new loadActions.LoadSaleOrderComments({ CO_CD: customer.CO_CD, SO_SEQ_NUM: customer.SO_SEQ_NUM,
                                SO_STORE_CD: customer.SO_STORE_CD }));
        this.store.dispatch(new loadActions.GetCustomerInvoiceDetail({ SearchText: customer.DEL_DOC_NUM, CompanyCode: customer.CO_CD }));
        this.store.dispatch(new loadActions.GetInvoiceDeposit({ CO_CD: customer.CO_CD, IVC_CD: customer.DEL_DOC_NUM }));
        this.store.dispatch(new loadActions.GetSalePerson({ CO_CD: customer.CO_CD, SO_EMP_SLSP_CD1: customer.SO_EMP_SLSP_CD1, SO_EMP_SLSP_CD2: customer.SO_EMP_SLSP_CD2 }));
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
