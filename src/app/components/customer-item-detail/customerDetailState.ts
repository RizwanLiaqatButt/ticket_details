import * as SearchModel from '../../models/SO';
import * as ItemsModel from '../../models/ITM';
import * as SalesLine from '../../models/SO_LN';

export interface CustomerDetailState {
    customerItemDetails: Array<SearchModel.SO>;
    invoiceItemsDetail: Array<ItemsModel.ITM>;
    customerInvoiceDetails: Array<SalesLine.SOLN>;
}
