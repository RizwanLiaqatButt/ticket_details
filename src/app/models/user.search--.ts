import { GlobalContent } from '../global.constant';

export class UserSearch {
    constructor(
        public SearchText: string,
        public CompanyCode: string,
        public RowsDisplayed: string
    ) { 
        this.RowsDisplayed = GlobalContent.DefaultRowsDisplayed;
        this.CompanyCode = GlobalContent.DefaultCompanyCode;
    }
}