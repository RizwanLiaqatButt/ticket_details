import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UserSearch } from '../../models/user.search';
import { COMPANIES } from '../../models/COMPANIES';
import { Subscription } from 'rxjs/Subscription';
import { LookupDataService } from '../../services/lookup.data.service';
import { CustomerService } from '../../services/customer.service';
import { Store } from '@ngrx/store';
import * as searchActions from '../../store/Actions/app.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-customer-sale-order-search',
  templateUrl: './customer-sale-order-search.component.html',
  styleUrls: ['./customer-sale-order-search.component.css']
})
export class CustomerSaleOrderSearchComponent implements OnInit, OnDestroy {
  public userSearch: UserSearch = new UserSearch('', '', '');
  public selectedCompany: string;
  public companies: COMPANIES[] = [];
  private companiesSubcription: Subscription;
  value : string;
  public isTextEmpty: boolean = false;

  @Output() public onSearchClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public store: Store<any>,
    public _cs: CustomerService,
    public _lds: LookupDataService
  ) { }

  ngOnInit() {
    this.userSearch = this._cs.userSearch;
    this.store.select('companyCodesReducer').subscribe(data => {
      if (data !== undefined && data.COMPANIES && data.COMPANIES.length > 0) {
        this.companies = data.COMPANIES;
        const item = new COMPANIES('All', '', '', '', '', '','All');
        _.remove(this.companies, function(arr) {
          return arr.CODE === 'All';
        });
        this.companies = _.orderBy(this.companies, ['CODE'], ['asc']);
        this.companies.forEach(item => {
          if(item.CODE != 'All')
          item.CodeName = item.CODE + " - " + item.NAME ;
        });
        this.companies.splice(0, 0, item);
      }
    });

    if(this.companies.length <= 0)
    this.store.dispatch(new searchActions.GetCompanyCodeslist({ 'obj1': 'v1' }));
  }

  ngOnDestroy() {
    if (this.companiesSubcription) {
      this.companiesSubcription.unsubscribe();
    }
  }

  onChange() {
    this.store.dispatch(new searchActions.GetSearchParams(this.userSearch));
  }

  onSearch() {
    if(this.userSearch.SearchText.length > 0 ) {
      this.isTextEmpty = false;
      this.store.dispatch(new searchActions.GetSearchParams(this.userSearch));
      localStorage.setItem("CompanyCode" ,this.userSearch.CompanyCode);
      this.onSearchClicked.emit(this.userSearch);
    }
    else {
      this.isTextEmpty = true;
    }
    }

}
