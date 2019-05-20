import { ActionReducerMap, Action } from '@ngrx/store';
import { CustomerCommentState } from './customerTransactionCommentState';

import * as LoadActions from '../../store/Actions/app.actions';

const search: CustomerCommentState = { customerTransactionComments: [] };

export function CustomerCommentsReducer(state: CustomerCommentState = search, actions: LoadActions.AppActions): any {
  switch (actions.type) {

    case LoadActions.LOAD_CUSTOMER_COMMENTS_SUCCESS:
      const customerTransactionComments =  actions.payload;
     return Object.assign({}, state, { customerTransactionComments } );

      case LoadActions.LOAD_CUSTOMER_COMMENTS:
      return state;

      

      case LoadActions.DESTROY_SALE_ORDER_COMMENTS:
      state.customerTransactionComments = [];
      return Object.assign({}, state, state);

    default:
      return state;
  }
}
