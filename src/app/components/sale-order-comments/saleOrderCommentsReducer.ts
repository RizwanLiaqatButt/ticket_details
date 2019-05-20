import { ActionReducerMap, Action } from '@ngrx/store';
import { SaleOrderCommentState } from './saleOrderCommentState';

import * as LoadActions from '../../store/Actions/app.actions';

const search: SaleOrderCommentState = { saleOrderComments: [], saleOrderSelectedComment: null };

export function SaleOrderCommentsReducer(state: SaleOrderCommentState = search, actions: LoadActions.AppActions): any {

  switch (actions.type) {

    case LoadActions.LOAD_SALE_ORDER_COMMENTS_SUCCESS:
      const saleOrderComments =  actions.payload;
     return Object.assign({}, state, { saleOrderComments } );

      case LoadActions.LOAD_SALE_ORDER_COMMENTS:
      return state;

      case LoadActions.LOAD_SALE_ORDER_SELECTED_COMMENT:
      const saleOrderSelectedComment = {
          customerInvoice: actions.payload
      };
      return Object.assign({}, state, { saleOrderSelectedComment: actions.payload });

      case LoadActions.DESTROY_SALE_ORDER_COMMENTS:
      state.saleOrderComments = [];
      state.saleOrderSelectedComment = null;
      return Object.assign({}, state, state);

    default:
      return state;
  }
}
