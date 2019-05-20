import { UserSearch } from '../../models/user.search';
import { CustomerInvoice } from '../../models/customerInvoice';
import { CustomerSearch } from '../../models/customerSearch';

export interface ParamState {
    searchParams: UserSearch;
    customerInvoice: CustomerInvoice;
    customerSearch: CustomerSearch;
    customerInvoiceDetail: any;
}
