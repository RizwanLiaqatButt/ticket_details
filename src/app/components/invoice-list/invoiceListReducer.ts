import { ActionReducerMap, Action } from '@ngrx/store';
import { InvoiceListState } from './invoiceListState';

import * as SearchActions from '../../store/Actions/app.actions';

const search: InvoiceListState = { invoiceList: [] };

export function invoiceListReducer(state: InvoiceListState = search, actions: SearchActions.AppActions): any {
  switch (actions.type) {

    case SearchActions.GET_INVOICE_LIST:
      return state;

    case SearchActions.GET_INVOICE_LIST_SUCCESS:
      const iListState = {
        searchResult: actions.payload
      };
      return Object.assign({}, state, { iListState });

    default:
      return state;
  }
}
