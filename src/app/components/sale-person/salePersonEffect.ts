import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EMP } from '../../models/EMP';
import { Transformation } from '../../transformation/transformation';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import * as LoadActions from '../../store/Actions/app.actions';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class SalePersonEffect {

    @Effect({ dispatch: true })
    public GetSalePerson$: Observable<Action> = this.action$
        .ofType(LoadActions.GET_SALE_PERSON)
        .map((action: LoadActions.GetSalePerson) => action.payload)
        .switchMap(payload => {
            return this.customerService.SearchSalePerson(payload)
                .map((data) => {
                    if (data) {
                        const salePerson =
                        Transformation.getModelList<EMP>((data as Array<EMP>), Transformation.EmpTransformation);
                        return new LoadActions.GetSalePersonSuccess(salePerson);
                    }
                });
        });

    constructor(private action$: Actions, private customerService: CustomerService) {

    }
}
