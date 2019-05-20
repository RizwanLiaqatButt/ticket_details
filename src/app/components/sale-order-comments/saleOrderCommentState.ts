import * as SearchModel from '../../models/SO_CMNT';

export interface SaleOrderCommentState {
    saleOrderComments: Array<SearchModel.SO_CMNT>;
    saleOrderSelectedComment: SearchModel.SO_CMNT;
}
