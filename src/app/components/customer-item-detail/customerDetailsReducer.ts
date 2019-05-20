import { ActionReducerMap, Action } from '@ngrx/store';
import { CustomerDetailState } from './customerDetailState';

import * as LoadActions from '../../store/Actions/app.actions';

const search: CustomerDetailState = { customerItemDetails: [], invoiceItemsDetail: [], customerInvoiceDetails: [] };

export function CustomerDetailsReducer(state: CustomerDetailState = search, actions: LoadActions.AppActions): any {

  switch (actions.type) {

    case LoadActions.LOAD_CUSTOMER_DETAILS:
      return state;

    case LoadActions.LOAD_CUSTOMER_DETAILS_SUCCESS:
      const customerDetails =  actions.payload;
     return Object.assign({}, state, {customerDetails} );

      case LoadActions.LOAD_ITEM_DETAILS:
      return state;

      case LoadActions.LOAD_ITEM_DETAILS_SUCCESS:
      const itemDetails =  actions.payload;
      return Object.assign({}, state, { itemDetails });

      case LoadActions.GET_CUSTOMER_INVOICE_DETAIL:
      return state;

      case LoadActions.GET_CUSTOMER_INVOICE_DETAIL_SUCCESS:
        const customerInvoiceDetails =  actions.payload;
      return Object.assign({}, state, { customerInvoiceDetails } );

      case LoadActions.GET_ITEMS_DETAIL:
      return state;

      case LoadActions.GET_ITEMS_DETAIL_SUCCESS:
        const invoiceItemsDetail =  actions.payload;
      return Object.assign({}, state, { invoiceItemsDetail } );

      case LoadActions.GET_CUSTOMER_ITEM_DETAILS_FROM_STORE:
      return state;

      case LoadActions.DESTROY_ITEMS_DETAIL:
      state.customerInvoiceDetails = [];
      state.invoiceItemsDetail = [];
      state.customerItemDetails = [];
      return Object.assign({}, state, state );

    default:
      return state;
  }
}
