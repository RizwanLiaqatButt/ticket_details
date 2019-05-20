import { ActionReducerMap } from '@ngrx/store';

import { SearchState } from '../State/searchState';
import { InvoiceListState } from '../../components/invoice-list/invoiceListState';
import { CompaniesState } from '../../components/company-codes/CompanyCodesState';
import { CustomerDetailState } from '../../components/customer-item-detail/customerDetailState';
import { ParamState } from '../State/paramState';
import { CustomerInformationState } from '../../components/customer-information/customerInformationState';
import { SaleOrderCommentState } from '../../components/sale-order-comments/saleOrderCommentState';
import { InvoiceDepositState } from '../../components/invoice-deposits/invoiceDepositState';
import { SalePersonState } from '../../components/sale-person/salePersonState';
import { CustomerCommentState } from '../../components/customer-transactions-comments/customerTransactionCommentState';

import * as SearchReducer from './searchReducer';
import * as ParamsReducer from './paramsReducer';
import * as invoiceListReducer from '../../components/invoice-list/invoiceListReducer';
import * as CustomerItemsDetailsReducer from '../../components/customer-item-detail/customerDetailsReducer';
import * as CompanyCodesReducer from '../../components/company-codes/companyCodesReducer';
import * as CustomerInformationReducer from '../../components/customer-information/customerInformationReducer';
import * as SaleOrderCommentsReducer from '../../components/sale-order-comments/saleOrderCommentsReducer';
import * as InvoiceDepositReducer from '../../components/invoice-deposits/invoiceDepositReducer';
import * as SalePersonReducer from '../../components/sale-person/salePersonReducer';
import * as CustomerCommentsReducer from '../../components/customer-transactions-comments/cusotmerTransactionCommentsReducer';

export interface State {
  searchReducer: SearchState;
  customerDetailsReducer: CustomerDetailState;
  companyCodesReducer: CompaniesState;
  invoiceListReducer: InvoiceListState;
  paramsReducer: ParamState;
  customerInformationReducer: CustomerInformationState;
  saleOrderCommentsReducer: SaleOrderCommentState;
  invoiceDepositReducer: InvoiceDepositState;
  salePersonReducer: SalePersonState;
  customerCommentsReducer:CustomerCommentState
}

export const reducers: ActionReducerMap<State> = {
  searchReducer: SearchReducer.searchReducer,
  customerDetailsReducer: CustomerItemsDetailsReducer.CustomerDetailsReducer,
  companyCodesReducer: CompanyCodesReducer.companyCodesReducer,
  invoiceListReducer: invoiceListReducer.invoiceListReducer,
  paramsReducer: ParamsReducer.paramsReducer,
  customerInformationReducer: CustomerInformationReducer.CustomerInformationReducer,
  saleOrderCommentsReducer: SaleOrderCommentsReducer.SaleOrderCommentsReducer,
  invoiceDepositReducer: InvoiceDepositReducer.InvoiceDepositReducer,
  salePersonReducer: SalePersonReducer.SalePersonReducer,
  customerCommentsReducer:CustomerCommentsReducer.CustomerCommentsReducer
};
