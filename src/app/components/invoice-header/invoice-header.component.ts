import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import * as loadActions from '../../store/Actions/app.actions';
import 'rxjs/add/operator/takeUntil';
import * as moment from 'moment';
import { Common } from '../../common/common';

@Component({
  selector: 'app-invoice-header',
  templateUrl: './invoice-header.component.html',
  styleUrls: ['./invoice-header.component.css']
})
export class InvoiceHeaderComponent implements OnInit, OnDestroy {
  public customerInformation: any = null;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  constructor(public store: Store<any>) {
  }

  ngOnInit() {
    this.store.select('customerInformationReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if ( data.customerInformation.length > 0 ) {
          data.customerInformation[0].SO_WR_DT = Common.dateFormatter(data.customerInformation[0].SO_WR_DT);
          data.customerInformation[0].FINAL_DT = Common.dateFormatter(data.customerInformation[0].FINAL_DT);
          data.customerInformation[0].PU_DEL_DT = Common.dateFormatter(data.customerInformation[0].PU_DEL_DT);
          this.customerInformation = data.customerInformation[0];
          localStorage.removeItem('customerInformation');
          localStorage.setItem('customerInformation', JSON.stringify(this.customerInformation));
        }

    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
