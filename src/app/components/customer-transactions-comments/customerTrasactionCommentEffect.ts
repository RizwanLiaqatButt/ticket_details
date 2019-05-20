import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SO_CMNT } from '../../models/SO_CMNT';
import { Transformation } from '../../transformation/transformation';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import * as LoadActions from '../../store/Actions/app.actions';
import { CustomerService } from '../../services/customer.service';


@Injectable()
export class customerTransactionCommentsEffect {
    @Effect({ dispatch: true })
    public LoadCustomerComments$: Observable<Action> = this.action$
        .ofType(LoadActions.LOAD_CUSTOMER_COMMENTS)
        .map((action: LoadActions.LoadCustomerComments) => action.payload)
        .switchMap(payload => {
            return this.customerService.SearchCustomerComments(payload)
                .map((data) => {
                    if (data) {
                        
                        const searchedSaleOrders = Transformation.getModelList<SO_CMNT>((data as Array<SO_CMNT>), Transformation.SOCMNTransformation);
                     
                        return new LoadActions.LoadCustomerCommentsSuccess(searchedSaleOrders);
                    }
                });
        });

        
            


    constructor(private action$: Actions, private customerService: CustomerService) {

    }
}
