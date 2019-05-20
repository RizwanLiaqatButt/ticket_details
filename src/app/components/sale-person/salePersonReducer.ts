import { ActionReducerMap, Action } from '@ngrx/store';
import { SalePersonState } from './salePersonState';

import * as LoadActions from '../../store/Actions/app.actions';

const search: SalePersonState = { salePerson: null };

export function SalePersonReducer(state: SalePersonState = search, actions: LoadActions.AppActions): any {

  switch (actions.type) {

    case LoadActions.GET_SALE_PERSON_SUCCESS:
      const salePerson =  actions.payload;
     return Object.assign({}, state, { salePerson } );

      case LoadActions.GET_SALE_PERSON:
      return state;

    default:
      return state;
  }
}
