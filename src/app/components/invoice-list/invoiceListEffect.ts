import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SO } from '../../models/SO';
import { Transformation } from '../../transformation/transformation';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import * as SearchActions from '../../store/Actions/app.actions';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class invoiceListEffects {
    @Effect({ dispatch: true })
    public GetInvoicelist$: Observable<Action> = this.action$
        .ofType(SearchActions.GET_INVOICE_LIST)
        .map((action: SearchActions.GetInvoiceList) => action.payload)
        .switchMap(payload => {
            return this.customerService.invoiceList(payload)
                .map((data) => {
                    if (data) {
                        const searchedInvoiceList = Transformation.getModelList<SO>((data as Array<SO>), Transformation.SOTransformation);
                        return new SearchActions.GetInvoiceListSuccess(searchedInvoiceList);
                    }
                });
        });


    constructor(private action$: Actions, private customerService: CustomerService) {

    }
}
