import { SearchState } from '../state/searchState';
import { CustomerDetailState } from '../../components/customer-item-detail/customerDetailState';
import { ParamState } from './paramState';

export interface AppState {
  searchState: SearchState;
  customerState: CustomerDetailState;
  paramState: ParamState;
}
