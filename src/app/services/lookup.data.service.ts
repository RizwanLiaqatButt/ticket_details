import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { CommonInfoService } from './common.info.service';
import { BaseService } from './base.service';
import { EsBaseService } from './es.base.service';
import * as Lookup from '../models/lookup.key.value';
import { BaseStore } from '../cache-store/base.store';
import { GlobalContent } from '../global.constant';
import { COMPANIES } from '../models/COMPANIES';

@Injectable()
export class LookupDataService extends EsBaseService {//extends BaseService {
    //public contactType:BaseStore<Lookup.LookupContactType>;
    public companies: BaseStore<COMPANIES>;
    public serviceParams: any;
    
    constructor(
        public _http: Http,
        public _cis: CommonInfoService
    ) {
        super(_http, _cis);
        //  this.contactType = this.getBaseStore('companies/_search'); //'/Lookup/ContactType',Lookup.SortByName);
        this.companies = this.getBaseStore<COMPANIES>('companies/_search');
    }
    private getBaseStore<T>(url: string, sortFunc?: (x: T, y: T) => number): BaseStore<T> {
        let baseStore: BaseStore<T> = new BaseStore<T>(this._http, this._cis, GlobalContent.dataApiBaseUrl + url);
        baseStore.sortFunc = sortFunc;
        return baseStore;
    }
}