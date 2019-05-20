import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SO } from '../../models/SO';
import { Transformation } from '../../transformation/transformation';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import * as LoadActions from '../../store/Actions/app.actions';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class CustomerInformationEffect {

    @Effect({ dispatch: true })
    public LoadCustomerInformation$: Observable<Action> = this.action$
        .ofType(LoadActions.LOAD_CUSTOMER_INFORMATION)
        .map((action: LoadActions.LoadCustomerInformation) => action.payload)
        .switchMap(payload => {
            return this.customerService.SearchCustomerInformation(payload)
                .map((data) => {
                    if (data) {
                        const searchedSaleOrders = Transformation.getModelList<SO>((data as Array<SO>), Transformation.SOTransformation);
                        return new LoadActions.LoadCustomerInformationSuccess(searchedSaleOrders);
                    }
                });
        });

    constructor(private action$: Actions, private customerService: CustomerService) {

    }
}
