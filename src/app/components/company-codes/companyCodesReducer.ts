import { ActionReducerMap, Action } from '@ngrx/store';
import { CompaniesState } from './CompanyCodesState';

import * as LoadActions from '../../store/Actions/app.actions';

const search: CompaniesState = { companies: [] };

export function companyCodesReducer(state: CompaniesState = search, actions: LoadActions.AppActions): any {

  switch (actions.type) {

    case LoadActions.LOAD_COMPANIES:
      return state;

    case LoadActions.LOAD_COMPANIES_SUCCESS:
      const COMPANIES =  actions.payload;
     return Object.assign({}, state, {COMPANIES} );

    default:
      return state;
  }
}
