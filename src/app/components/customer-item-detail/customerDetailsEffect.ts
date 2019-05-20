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
import { SOLN } from '../../models/SO_LN';
import { ITM } from '../../models/ITM';

@Injectable()
export class customerDetailsEffect {
    @Effect({ dispatch: true })
    public LoadCustoemrDetails$: Observable<Action> = this.action$
        .ofType(LoadActions.LOAD_CUSTOMER_DETAILS)
        .map((action: LoadActions.LoadCustoemrDetails) => action.payload)
        .switchMap(payload => {
            return this.customerService.searchSaleOrdersLine(payload)
                .map((data) => {
                    if (data) {
                        
                        const searchedSaleOrders = Transformation.getModelList<SO>((data as Array<SO>), Transformation.SOTransformation);
                     
                        return new LoadActions.LoadCustomerDetailsSuccess(searchedSaleOrders);
                    }
                });
        });
            
              @Effect({ dispatch: true })
    public LoadItemDetails$: Observable<Action> = this.action$
        .ofType(LoadActions.LOAD_ITEM_DETAILS)
        .map((action: LoadActions.LoadItemDetails) => action.payload)
        .switchMap(payload => {
            return this.customerService.searchItemsOrdersLine(payload)
                .map((data) => {
                    if (data) {
                        
                        const searchedSaleOrders = Transformation.getModelList<SO>((data as Array<SO>), Transformation.SOTransformation);
                     
                        return new LoadActions.LoadItemDetailsSuccess(searchedSaleOrders);
                    }
                });
        });

        @Effect({ dispatch: true })
        public GetCustomerInvoiceDetail$: Observable<Action> = this.action$
            .ofType(LoadActions.GET_CUSTOMER_INVOICE_DETAIL)
            .map((action: LoadActions.GetCustomerInvoiceDetail) => action.payload)
            .switchMap(payload => {
                return this.customerService.SearchInvoiceDetails(payload)
                    .map((data) => {
                        if (data) {
                            
                            const searchedSaleOrders = Transformation.getModelList<SOLN>((data as Array<SOLN>), Transformation.SOLNTransformation);
                            return new LoadActions.GetCustomerInvoiceDetailSuccess(searchedSaleOrders);
                        }
                    });
            });

            @Effect({ dispatch: true })
            public GetItemsDetail$: Observable<Action> = this.action$
                .ofType(LoadActions.GET_ITEMS_DETAIL)
                .map((action: LoadActions.GetItemsDetail) => action.payload)
                .switchMap(payload => {
                    return this.customerService.GetItemsForInvoiceDetail(payload)
                        .map((data) => {
                            if (data) {
                                
                                const searchedSaleOrders = Transformation.getModelList<ITM>((data as Array<ITM>), Transformation.ItemTransformation);
                                return new LoadActions.GetItemsDetailSuccess(searchedSaleOrders);
                            }
                        });
                });

    constructor(private action$: Actions, private customerService: CustomerService) {

    }
}
