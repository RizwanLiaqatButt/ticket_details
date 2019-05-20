import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as loadActions from '../../store/Actions/app.actions';
import { EMP } from '../../models/EMP';
import { CustomerInvoice } from '../../models/customerInvoice';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-sale-person',
  templateUrl: './sale-person.component.html',
  styleUrls: ['./sale-person.component.css']
})
export class SalePersonComponent implements OnInit, OnDestroy {

  public salePerson: EMP = null;
  public customer: CustomerInvoice = null;
  public firstSalePerson: boolean = false;
  public secondSalePerson: boolean = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  constructor(public store: Store<any>) { }

  ngOnInit() {
    this.store.select('salePersonReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if ( data && data.salePerson && data.salePerson.length > 0 ) {
          this.salePerson = data.salePerson[0];

          if(this.customer && this.salePerson.EMP_CD == this.customer.SO_EMP_SLSP_CD1) {
            this.firstSalePerson = true;

          }
          else if (this.customer && this.salePerson.EMP_CD == this.customer.SO_EMP_SLSP_CD2) {
            this.secondSalePerson = true;
          }

          localStorage.removeItem('salePerson');
          localStorage.setItem('salePerson', JSON.stringify(this.salePerson));

          localStorage.removeItem('firstSalePerson');
          localStorage.setItem('firstSalePerson', JSON.stringify(this.firstSalePerson));

          localStorage.removeItem('secondSalePerson');
          localStorage.setItem('secondSalePerson', JSON.stringify(this.secondSalePerson));
        }
    });

    this.store.select('paramsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if(data.customerInvoice) {
        this.customer = data.customerInvoice;
      }
    });
    
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
