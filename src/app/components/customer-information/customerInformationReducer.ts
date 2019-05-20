import { ActionReducerMap, Action } from '@ngrx/store';
import { CustomerInformationState } from './customerInformationState';

import * as LoadActions from '../../store/Actions/app.actions';

const search: CustomerInformationState = { customerInformation: [] };

export function CustomerInformationReducer(state: CustomerInformationState = search, actions: LoadActions.AppActions): any {

  switch (actions.type) {

    case LoadActions.LOAD_CUSTOMER_INFORMATION_SUCCESS:
      const customerInformation =  actions.payload;
     return Object.assign({}, state, { customerInformation } );

      case LoadActions.LOAD_CUSTOMER_INFORMATION:
      return state;

    default:
      return state;
  }
}
