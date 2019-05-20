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
import { CompanyService } from '../../services/company.service';

@Injectable()
export class companyCodesEffects {
    @Effect({ dispatch: true })
    public GetCompanyCodeslist$: Observable<Action> = this.action$
        .ofType(SearchActions.LOAD_COMPANIES)
        .map((action: SearchActions.GetCompanyCodeslist) => action.payload)
        .switchMap(payload => {
            return this.companyService.searchCompanies(payload)//
                .map((data) => {
                    if (data) {
                        return new SearchActions.GetCompanyCodeslistSUCCESS(data);
                    }
                });
        });
    constructor(private action$: Actions, private companyService: CompanyService) {}
}
