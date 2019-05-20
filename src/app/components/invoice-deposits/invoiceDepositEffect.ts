import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TRN } from '../../models/TRN';
import { Transformation } from '../../transformation/transformation';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import * as LoadActions from '../../store/Actions/app.actions';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class InvoiceDepositEffect {

    @Effect({ dispatch: true })
    public LoadInvoiceDeposit$: Observable<Action> = this.action$
        .ofType(LoadActions.LOAD_INVOICE_DEPOSITS)
        .map((action: LoadActions.GetInvoiceDeposit) => action.payload)
        .switchMap(payload => {
            return this.customerService.SearchInvoiceDeposits(payload)
                .map((data) => {
                    if (data) {
                        const searchedSaleOrders =
                        Transformation.getModelList<TRN>((data as Array<TRN>), Transformation.TrnTransformation);
                        return new LoadActions.GetInvoiceDepositSUCCESS(searchedSaleOrders);
                    }
                });
        });

        @Effect({ dispatch: true })
        public LoadCustomerTransaction$: Observable<Action> = this.action$
            .ofType(LoadActions.LOAD_CUSTOMER_TRANSACTIONS)
            .map((action: LoadActions.GetCustomerTransaction) => action.payload)
            .switchMap(payload => {
                return this.customerService.SearchCustomerTransactions(payload)
                    .map((data) => {
                        if (data) {
                            const searchedSaleOrders =
                            Transformation.getModelList<TRN>((data as Array<TRN>), Transformation.TrnTransformation);
                            return new LoadActions.GetCustomerTransactionSuccess(searchedSaleOrders);
                        }
                    });
            });

        @Effect({ dispatch: true })
        public LoadInvoiceDepositTrn$: Observable<Action> = this.action$
            .ofType(LoadActions.LOAD_INVOICE_DEPOSITS_TRN)
            .map((action: LoadActions.LoadInvoiceDepositTrn) => action.payload)
            .switchMap(payload => {
                return this.customerService.SearchInvoiceDepositsByTRNTP(payload)
                    .map((data) => {
                        if (data) {
                            const searchedSaleOrders =
                            Transformation.getModelList<TRN>((data as Array<TRN>), Transformation.TrnTransformation);
                            return new LoadActions.LoadInvoiceDepositTrnSuccess(searchedSaleOrders);
                        }
                    });
            });

            @Effect({ dispatch: true })
        public LoadInvoiceDepositMop$: Observable<Action> = this.action$
            .ofType(LoadActions.LOAD_INVOICE_DEPOSIT_MOP_TRN)
            .map((action: LoadActions.LoadInvoiceDepositMopTrn) => action.payload)
            .switchMap(payload => {
                return this.customerService.SearchInvoiceDepositsByMop(payload)
                    .map((data) => {
                        if (data) {
                            const searchedSaleOrders =
                            Transformation.getModelList<TRN>((data as Array<TRN>), Transformation.TrnTransformation);
                            return new LoadActions.LoadInvoiceDepositMopTrnSuccess(searchedSaleOrders);
                        }
                    });
            });

    constructor(private action$: Actions, private customerService: CustomerService) {

    }
}
