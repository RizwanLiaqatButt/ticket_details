import { ActionReducerMap, Action } from '@ngrx/store';
import { ParamState } from '../state/paramState';

import * as ParamActions from '../Actions/app.actions';

const search: ParamState = { searchParams: null,
                            customerInvoice: null,
                            customerSearch: null,
                            customerInvoiceDetail: null
                        };

export function paramsReducer(state: ParamState = search, actions: ParamActions.AppActions): any {
  switch (actions.type) {

    case ParamActions.GET_SEARCH_PARAMS:
    const searchParams = {
      searchParams: actions.payload
    };
    return Object.assign({}, state, { searchParams: actions.payload });

    case ParamActions.GET_CUSTOMER_SEARCH_ROW:
    const customerSearch = {
        customerSearch: actions.payload
    };
    return Object.assign({}, state, { customerSearch: actions.payload });

    case ParamActions.GET_CUSTOMER_INVOICE_ROW:
    const customerInvoice = {
        customerInvoice: actions.payload
    };
    return Object.assign({}, state, { customerInvoice: actions.payload });

    case ParamActions.GET_CUSTOMER_INVOICE_DETAIL_ROW:
    const customerInvoiceDetail = {
        customerInvoiceDetail: actions.payload
    };
    return Object.assign({}, state, { customerInvoiceDetail: actions.payload });

    default:
      return state;
  }
}
