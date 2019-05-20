import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Injectable } from '@angular/core';
import { CommonInfoService } from './common.info.service';
import { BaseService } from './base.service';
import { EsBaseService } from './es.base.service';
import {
    GlobalContent,
    ImagePath,
    RouteConstant,
    DataApiConstant
} from '../global.constant';
import { SO } from '../models/SO';
import { UserSearch } from '../models/user.search';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Transformation } from '../transformation/transformation';
import '../rxjs-operators/rxjs.operators';
import 'rxjs/add/operator/distinct';

@Injectable()
export class CompanyService extends EsBaseService {
    // private apiUrl = GlobalContent.apiUrl;
    // public userSearch: UserSearch = new UserSearch('', '');
    // constructor
    //     (
    //     public _http: Http,
    //     public _cis: CommonInfoService,
    //     private route: ActivatedRoute,
    //     private _ls: LocationStrategy
    //     ) {
    //     super(_http, _cis);
    // }

    //private apiUrl = GlobalContent.apiUrl;
    public userSearch: UserSearch = new UserSearch('', '',''); //
    public searchedSaleOrders: SO[] = [];
    public distinctSearchedSaleOrders: SO[] = [];
    public searchedSaleOrdersChanged: Subject<SO[]> = new Subject<SO[]>();
    private numberOfRecords = GlobalContent.NumberOfRecords;
    constructor
        (
        public _http: Http,
        public _cis: CommonInfoService,
        private route: ActivatedRoute,
        private _ls: LocationStrategy
        ) {
        super(_http, _cis);
    }

    public searchCompanies(param: any): any {
        const query = (JSON.stringify({
            'query': {
                'match_all': {}
            },
            'size': 1000,
        }));
        return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.Companies + '/' + DataApiConstant.SEARCH + '/', query);
    }
}