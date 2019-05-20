import { ActionReducerMap, Action } from '@ngrx/store';
import { SearchState } from '../state/searchState';

import * as SearchActions from '../Actions/app.actions';

const search: SearchState = { searchResults: [] };

export function searchReducer(state: SearchState = search, actions: SearchActions.AppActions): any {
  switch (actions.type) {

    case SearchActions.GET_SEARCH_RESULTS:
      return state;

    case SearchActions.GET_SEARCH_RESULTS_RETRY:
    return state;
    
    case SearchActions.GET_SEARCH_RESULTS_SUCCESS:
      const searchState = {
        searchResult: actions.payload
      };
      return Object.assign({}, state, { searchState });
    
    case SearchActions.GET_SEARCH_RESULTS_FROM_STORE:
    return state;

    default:
      return state;
  }
}
