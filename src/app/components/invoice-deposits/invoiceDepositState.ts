import * as SearchModel from '../../models/TRN';

export interface InvoiceDepositState {
    invoiceDeposits: Array<SearchModel.TRN>;
    invoiceTrn: Array<SearchModel.TRN>;
    mopTrn: Array<SearchModel.TRN>;
    customerTransactions: Array<SearchModel.TRN>;
}

