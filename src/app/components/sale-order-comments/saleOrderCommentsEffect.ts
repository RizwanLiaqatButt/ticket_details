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
export class SaleOrderCommentsEffect {

    @Effect({ dispatch: true })
    public LoadSaleOrderComment$: Observable<Action> = this.action$
        .ofType(LoadActions.LOAD_SALE_ORDER_COMMENTS)
        .map((action: LoadActions.LoadSaleOrderComments) => action.payload)
        .switchMap(payload => {
            return this.customerService.SearchSaleOrderComments(payload)
                .map((data) => {
                    if (data) {
                        const searchedSaleOrders =
                        Transformation.getModelList<SO_CMNT>((data as Array<SO_CMNT>), Transformation.SOCMNTransformation);
                        return new LoadActions.LoadSaleOrderCommentSuccess(searchedSaleOrders);
                    }
                });
        });

    constructor(private action$: Actions, private customerService: CustomerService) {

    }
}
