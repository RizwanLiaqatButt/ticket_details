import { Action } from '@ngrx/store';

export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const GET_SEARCH_RESULTS_SUCCESS = 'GET_SEARCH_RESULTS_SUCCESS';
export const GET_INVOICE_LIST = 'GET_INVOICE_LIST';
export const GET_INVOICE_LIST_SUCCESS = 'GET_INVOICE_LIST_SUCCESS';
export const LOAD_CUSTOMER_DETAILS = 'LOAD_CUSTOMER_DETAILS';
export const LOAD_CUSTOMER_DETAILS_SUCCESS = 'LOAD_CUSTOMER_DETAILS_SUCCESS';
export const LOAD_ITEM_DETAILS = 'LOAD_ITEM_DETAILS';
export const LOAD_ITEM_DETAILS_SUCCESS = 'LOAD_ITEM_DETAILS_SUCCESS';
export const LOAD_COMPANIES = 'LOAD_COMPANIES';
export const LOAD_COMPANIES_SUCCESS = 'LOAD_COMPANIES_SUCCESS';
export const GET_SEARCH_PARAMS = 'GET_SEARCH_PARAMS';
export const GET_CUSTOMER_SEARCH_ROW = 'GET_CUSTOMER_SEARCH_ROW';
export const GET_CUSTOMER_INVOICE_ROW = 'GET_CUSTOMER_INVOICE_ROW';
export const GET_CUSTOMER_INVOICE_DETAIL_ROW = 'GET_CUSTOMER_INVOICE_DETAIL_ROW';
export const LOAD_CUSTOMER_INFORMATION = 'LOAD_CUSTOMER_INFORMATION';
export const LOAD_CUSTOMER_INFORMATION_SUCCESS = 'LOAD_CUSTOMER_INFORMATION_SUCCESS';
export const LOAD_SALE_ORDER_COMMENTS_SUCCESS = 'LOAD_SALE_ORDER_COMMENTS_SUCCESS';
export const LOAD_SALE_ORDER_COMMENTS = 'LOAD_SALE_ORDER_COMMENTS';
export const LOAD_INVOICE_DEPOSITS = 'LOAD_INVOICE_DEPOSITS';
export const LOAD_INVOICE_DEPOSITS_SUCCESS = 'LOAD_INVOICE_DEPOSITS_SUCCESS';
export const LOAD_INVOICE_DEPOSITS_TRN_SUCCESS = 'LOAD_INVOICE_DEPOSITS_TRN_SUCCESS';
export const LOAD_INVOICE_DEPOSITS_TRN = 'LOAD_INVOICE_DEPOSITS_TRN';
export const LOAD_SALE_ORDER_SELECTED_COMMENT = 'LOAD_SALE_ORDER_SELECTED_COMMENT';
export const GET_CUSTOMER_INVOICE_DETAIL = 'GET_CUSTOMER_INVOICE_DETAIL';
export const GET_CUSTOMER_INVOICE_DETAIL_SUCCESS = 'GET_CUSTOMER_INVOICE_DETAIL_SUCCESS';
export const GET_SALE_PERSON = 'GET_SALE_PERSON';
export const GET_SALE_PERSON_SUCCESS = 'GET_SALE_PERSON_SUCCESS';
export const DESTROY_INVOICE_DEPOSITS_TRN = 'DESTROY_INVOICE_DEPOSITS_TRN';
export const DESTROY_SALE_ORDER_COMMENTS = 'DESTROY_SALE_ORDER_COMMENTS';
export const LOAD_CUSTOMER_COMMENTS = 'LOAD_CUSTOMER_COMMENTS';
export const LOAD_CUSTOMER_COMMENTS_SUCCESS = 'LOAD_CUSTOMER_COMMENTS_SUCCESS';
export const GET_ITEMS_DETAIL = 'GET_ITEMS_DETAIL';
export const GET_ITEMS_DETAIL_SUCCESS = 'GET_ITEMS_DETAIL_SUCCESS';
export const DESTROY_ITEMS_DETAIL = 'DESTROY_ITEMS_DETAIL';
export const LOAD_INVOICE_DEPOSIT_MOP_TRN = 'LOAD_INVOICE_DEPOSIT_MOP_TRN';
export const LOAD_INVOICE_DEPOSIT_MOP_TRN_SUCCESS = 'LOAD_INVOICE_DEPOSIT_MOP_TRN_SUCCESS';
export const GET_SEARCH_RESULTS_FROM_STORE = 'GET_SEARCH_RESULTS_FROM_STORE';
export const GET_CUSTOMER_ITEM_DETAILS_FROM_STORE='GET_CUSTOMER_ITEM_DETAILS_FROM_STORE';
export const LOAD_CUSTOMER_TRANSACTIONS = 'LOAD_CUSTOMER_TRANSACTIONS';
export const LOAD_CUSTOMER_TRANSACTIONS_SUCCESS = 'LOAD_CUSTOMER_TRANSACTIONS_SUCCESS';
export const GET_SEARCH_RESULTS_RETRY = 'GET_SEARCH_RESULTS_RETRY';

export class GetSearchResults implements Action {
  readonly type = GET_SEARCH_RESULTS;
  constructor(public payload: any) { }
}

export class GetSearchResultsRetry implements Action {
  readonly type = GET_SEARCH_RESULTS_RETRY;
  constructor(public payload: any) { }
}

export class GetSearchResultsSuccess implements Action {
  readonly type = GET_SEARCH_RESULTS_SUCCESS;
  constructor(public payload: any) { }
}
export class LoadCustoemrDetails implements Action {
  readonly type = LOAD_CUSTOMER_DETAILS;
  constructor(public payload: any) { }
}
export class LoadCustomerDetailsSuccess implements Action {
  readonly type = LOAD_CUSTOMER_DETAILS_SUCCESS;
  constructor(public payload: any) { }
}
export class LoadItemDetails implements Action {
  readonly type = LOAD_ITEM_DETAILS;
  constructor(public payload: any) { }
}
export class LoadItemDetailsSuccess implements Action {
  readonly type = LOAD_ITEM_DETAILS_SUCCESS;
  constructor(public payload: any) { }
}
export class LOADCOMPANIES implements Action {
  readonly type = LOAD_COMPANIES;
  constructor(public payload: any) { }
}
export class LOADCOMPANIESSUCCESS implements Action {
  readonly type = LOAD_COMPANIES_SUCCESS;
  constructor(public payload: any) { }
}
export class GetCompanyCodeslist implements Action {
  readonly type = LOAD_COMPANIES;
  constructor(public payload: any) { }
}
export class GetCompanyCodeslistSUCCESS implements Action {
  readonly type = LOAD_COMPANIES_SUCCESS;
  constructor(public payload: any) { }
}
export class GetInvoiceList implements Action {
  readonly type = GET_INVOICE_LIST;
  constructor(public payload: any) { }
}
export class GetInvoiceListSuccess implements Action {
  readonly type = GET_INVOICE_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class GetInvoiceDeposit implements Action {
  readonly type = LOAD_INVOICE_DEPOSITS;
  constructor(public payload: any) { }
}
export class GetInvoiceDepositSUCCESS implements Action {
  readonly type = LOAD_INVOICE_DEPOSITS_SUCCESS;
  constructor(public payload: any) { }
}
export class GetSearchParams implements Action {
  readonly type = GET_SEARCH_PARAMS;
  constructor(public payload: any) { }
}
export class GetCustomerSearchRow implements Action {
  readonly type = GET_CUSTOMER_SEARCH_ROW;
  constructor(public payload: any) { }
}
export class GetCustomerInvoiceRow implements Action {
  readonly type = GET_CUSTOMER_INVOICE_ROW;
  constructor(public payload: any) { }
}
export class LoadCustomerInformation implements Action {
  readonly type = LOAD_CUSTOMER_INFORMATION;
  constructor(public payload: any) { }
}
export class LoadCustomerInformationSuccess implements Action {
  readonly type = LOAD_CUSTOMER_INFORMATION_SUCCESS;
  constructor(public payload: any) { }
}
export class LoadSaleOrderComments implements Action {
  readonly type = LOAD_SALE_ORDER_COMMENTS;
  constructor(public payload: any) { }
}
export class LoadSaleOrderCommentSuccess implements Action {
  readonly type = LOAD_SALE_ORDER_COMMENTS_SUCCESS;
  constructor(public payload: any) { }
}
export class LoadInvoiceDepositTrn implements Action {
  readonly type = LOAD_INVOICE_DEPOSITS_TRN;
  constructor(public payload: any) { }
}
export class LoadInvoiceDepositTrnSuccess implements Action {
  readonly type = LOAD_INVOICE_DEPOSITS_TRN_SUCCESS;
  constructor(public payload: any) { }
}
export class GetCustomerInvoiceDetailRow implements Action {
  readonly type = GET_CUSTOMER_INVOICE_DETAIL_ROW;
  constructor(public payload: any) { }
}
export class GetSaleOrderSelectedComment implements Action {
  readonly type = LOAD_SALE_ORDER_SELECTED_COMMENT;
  constructor(public payload: any) { }
}
export class GetCustomerInvoiceDetail implements Action {
  readonly type = GET_CUSTOMER_INVOICE_DETAIL;
  constructor(public payload: any) { }
}
export class GetCustomerInvoiceDetailSuccess implements Action {
  readonly type = GET_CUSTOMER_INVOICE_DETAIL_SUCCESS;
  constructor(public payload: any) { }
}
export class GetSalePerson implements Action {
  readonly type = GET_SALE_PERSON;
  constructor(public payload: any) { }
}
export class GetSalePersonSuccess implements Action {
  readonly type = GET_SALE_PERSON_SUCCESS;
  constructor(public payload: any) { }
}
export class DestroyInvoiceDepositTrn implements Action {
  readonly type = DESTROY_INVOICE_DEPOSITS_TRN;
  constructor(public payload: any) { }
}
export class DestroySaleOrderComments implements Action {
  readonly type = DESTROY_SALE_ORDER_COMMENTS;
  constructor(public payload: any) { }
}
export class GetItemsDetail implements Action {
  readonly type = GET_ITEMS_DETAIL;
  constructor(public payload: any) { }
}
export class GetItemsDetailSuccess implements Action {
  readonly type = GET_ITEMS_DETAIL_SUCCESS;
  constructor(public payload: any) { }
}
export class DestroyItemsDetail implements Action {
  readonly type = DESTROY_ITEMS_DETAIL;
  constructor(public payload: any) { }
}
export class LoadCustomerComments implements Action {
  readonly type =LOAD_CUSTOMER_COMMENTS;
  constructor(public payload: any) { }
}
export class LoadCustomerCommentsSuccess implements Action {
  readonly type = LOAD_CUSTOMER_COMMENTS_SUCCESS;
  constructor(public payload: any) { }
}
export class LoadInvoiceDepositMopTrnSuccess implements Action {
  readonly type = LOAD_INVOICE_DEPOSIT_MOP_TRN_SUCCESS;
  constructor(public payload: any) { }
}
export class LoadInvoiceDepositMopTrn implements Action {
  readonly type = LOAD_INVOICE_DEPOSIT_MOP_TRN;
  constructor(public payload: any) { }
}
export class GetSearchResultsFromStore implements Action {
  readonly type = GET_SEARCH_RESULTS_FROM_STORE;
  constructor(public payload: any) { }
}
export class GetCustomerItemDetailsFromStore implements Action {
  readonly type = GET_CUSTOMER_ITEM_DETAILS_FROM_STORE;
  constructor(public payload: any) { }
}
export class GetCustomerTransaction implements Action {
  readonly type = LOAD_CUSTOMER_TRANSACTIONS;
  constructor(public payload: any) { }
}
export class GetCustomerTransactionSuccess implements Action {
  readonly type = LOAD_CUSTOMER_TRANSACTIONS_SUCCESS;
  constructor(public payload: any) { }
}

export type AppActions = GetSearchResults
  | GetSearchResultsSuccess | LoadCustoemrDetails| LoadCustomerDetailsSuccess | LoadItemDetails
  | LoadItemDetailsSuccess | LOADCOMPANIES | LOADCOMPANIESSUCCESS |GetCompanyCodeslist
  | GetCompanyCodeslistSUCCESS | GetInvoiceList | GetInvoiceListSuccess | GetInvoiceDeposit
  | GetInvoiceDepositSUCCESS | GetSearchParams  | GetCustomerSearchRow | GetCustomerInvoiceRow
  | LoadCustomerInformation | LoadCustomerInformationSuccess | LoadSaleOrderComments 
  | LoadSaleOrderCommentSuccess | LoadInvoiceDepositTrn | LoadInvoiceDepositTrnSuccess 
  | GetCustomerInvoiceDetailRow | GetSaleOrderSelectedComment | GetCustomerInvoiceDetail 
  | GetCustomerInvoiceDetailSuccess | GetSalePerson | GetSalePersonSuccess | DestroyInvoiceDepositTrn
  | DestroySaleOrderComments | LoadCustomerComments |LoadCustomerCommentsSuccess | DestroySaleOrderComments 
  | GetItemsDetail | GetItemsDetailSuccess | DestroyItemsDetail | LoadInvoiceDepositMopTrnSuccess 
  | LoadInvoiceDepositMopTrn | GetSearchResultsFromStore | GetCustomerItemDetailsFromStore 
  | GetCustomerTransaction | GetCustomerTransactionSuccess | GetSearchResultsRetry;
