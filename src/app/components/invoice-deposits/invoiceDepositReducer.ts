import { ActionReducerMap, Action } from '@ngrx/store';
import { InvoiceDepositState } from './invoiceDepositState';

import * as LoadActions from '../../store/Actions/app.actions';

const search: InvoiceDepositState = { invoiceDeposits: [], invoiceTrn: [], mopTrn: [],
  customerTransactions: [] };

export function InvoiceDepositReducer(state: InvoiceDepositState = search, actions: LoadActions.AppActions): any {

  switch (actions.type) {

    case LoadActions.LOAD_INVOICE_DEPOSITS_SUCCESS:
      const invoiceDeposits =  actions.payload;
     return Object.assign({}, state, { invoiceDeposits } );

      case LoadActions.LOAD_INVOICE_DEPOSITS:
      return state;

      case LoadActions.LOAD_INVOICE_DEPOSITS_TRN_SUCCESS:
      const invoiceTrn =  actions.payload;
     return Object.assign({}, state, { invoiceTrn } );

      case LoadActions.LOAD_INVOICE_DEPOSITS_TRN:
      return state;

      case LoadActions.LOAD_INVOICE_DEPOSIT_MOP_TRN_SUCCESS:
      const mopTrn =  actions.payload;
     return Object.assign({}, state, { mopTrn } );

      case LoadActions.LOAD_INVOICE_DEPOSIT_MOP_TRN:
      return state;

      case LoadActions.LOAD_CUSTOMER_TRANSACTIONS_SUCCESS:
      const customerTransactions =  actions.payload;
     return Object.assign({}, state, { customerTransactions } );

      case LoadActions.LOAD_CUSTOMER_TRANSACTIONS:
      return state;

      case LoadActions.DESTROY_INVOICE_DEPOSITS_TRN:
      state.invoiceDeposits = [];
      state.invoiceTrn = [];
      state.mopTrn = [];
      state.customerTransactions = [];
      return Object.assign({}, state, state );

    default:
      return state;
  }
}
