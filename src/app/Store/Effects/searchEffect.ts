import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SO } from '../../models/SO';
import { Transformation } from '../../transformation/transformation';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import * as SearchActions from '../Actions/app.actions';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class searchEffects {
    @Effect({ dispatch: true })
    public GetSearchResults$: Observable<Action> = this.action$
        .ofType(SearchActions.GET_SEARCH_RESULTS)
        .map((action: SearchActions.GetSearchResults) => action.payload)
        .switchMap(payload => {
            return this.customerService.searchSaleOrders(payload, "\\\"")
                .map((data) => {
                    if (data && data.length > 0) {
                        const searchedSaleOrders = Transformation.getModelList<SO>((data as Array<SO>), Transformation.SOTransformation);
                        return new SearchActions.GetSearchResultsSuccess(searchedSaleOrders);
                    }
                    if(data && data.length <=0 ) {
                        return new SearchActions.GetSearchResultsRetry(payload);
                    }
                });
        });

        @Effect({ dispatch: true })
        public GetSearchResultsRetry$: Observable<Action> = this.action$
        .ofType(SearchActions.GET_SEARCH_RESULTS_RETRY)
        .map((action: SearchActions.GetSearchResultsRetry) => action.payload)
        .switchMap(payload => {
            return this.customerService.searchSaleOrders(payload, "")
                .map((data) => {
                    if (data) {
                        const searchedSaleOrders = Transformation.getModelList<SO>((data as Array<SO>), Transformation.SOTransformation);
                        return new SearchActions.GetSearchResultsSuccess(searchedSaleOrders);
                    }
                });
        });

    constructor(private action$: Actions, private customerService: CustomerService) {

    }
}
