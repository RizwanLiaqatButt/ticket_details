import { Http } from '@angular/http';
// import { Observable, Observer } from 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
//import 'rxjs/Rx';
import { Injectable } from '@angular/core';
// import {GridOptions} from 'ag-grid/main';
import { CommonInfoService } from './common.info.service';
import { BaseService } from './base.service';
import { EsBaseService } from './es.base.service';
// import {LookupDataService} from "./LookupDataService"
import {
  GlobalContent,
  ImagePath,
  RouteConstant,
  DataApiConstant
} from '../global.constant';
// import {UrlHelper} from './common/url.helper'
// import {PortfolioManagerValidation} from './PortfolioManagerValidation'

import { SO } from '../models/SO';
import { UserSearch } from '../models/user.search';
// import './RxJs Operators/rxjs-operators';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router'
import { LocationStrategy } from '@angular/common';
import { Transformation } from '../transformation/transformation';
import '../rxjs-operators/rxjs.operators';
import 'rxjs/add/operator/distinct';
@Injectable()
export class CustomerService extends EsBaseService //BaseService 
{
  //private apiUrl = GlobalContent.apiUrl;
  public userSearch: UserSearch = new UserSearch('', '', ''); //
  public searchedSaleOrders: SO[] = [];
  public distinctSearchedSaleOrders: SO[] = []; //distinct sale orders based on customer id and finalize date
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

  private prepareSearchQuery(searchCriteria: UserSearch, definiteChar: string) {
    let input: string;
    input = searchCriteria.SearchText.trim().indexOf('-') > 0 || searchCriteria.SearchText.trim().indexOf('@') > 0 ? definiteChar + searchCriteria.SearchText.trim() + definiteChar : `*${searchCriteria.SearchText.trim()}*`;
    let query = `{
            "query": {
              "bool": {
                "must": [
                  { "match": { "CO_CD":  "${searchCriteria.CompanyCode}" }},
                  {
                    "query_string" : {
                      "query":      "${input}",
                      "fields":     ["CUST_NAME","CUST_CD",
                                    "SHIP_TO_ADDR1","SHIP_TO_CITY","SHIP_TO_ST_CD",
                                    "SHIP_TO_ZIP_CD","SHIP_TO_H_PHONE","SHIP_TO_B_PHONE","SHIP_TO_H_PHONE1","SHIP_TO_B_PHONE1",
                                    "DEL_DOC_NUM", "EMAIL_ADDR"]
            }}]}} ,  "size": ${this.numberOfRecords}}
        `;
    if (searchCriteria.CompanyCode === 'All') {
      query = ` {
                "query": {
                        "query_string" : {
                          "query":      "${input}",
                          "fields":     ["CUST_NAME","CUST_CD",
                          "SHIP_TO_ADDR1","SHIP_TO_CITY","SHIP_TO_ST_CD",
                          "SHIP_TO_ZIP_CD","SHIP_TO_H_PHONE","SHIP_TO_B_PHONE","SHIP_TO_H_PHONE1","SHIP_TO_B_PHONE1",
                          "DEL_DOC_NUM", "EMAIL_ADDR"]
                }} ,  "size": ${this.numberOfRecords} }`;
    }
    return query;
  }

  public searchSaleOrders(searchCriteria: UserSearch, definiteChar: string): any {
    let query = this.prepareSearchQuery(searchCriteria, definiteChar);
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.SALE_ORDERS + '/' + DataApiConstant.SEARCH + '/', query);
  }
  public searchSaleOrdersLine(us: UserSearch): any {
    let query = (JSON.stringify({

      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "CO_CD": us.CompanyCode
              }
            },
            {
              "query_string": {
                "query": "\\\"" + us.SearchText + "\\\"",
                "default_field": "DEL_DOC_NUM"
              }
            }
          ]
        }
      },
      "size": this.numberOfRecords
    }));
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.SALE_ORDERS_LINE + '/' + DataApiConstant.SEARCH + '/', query);
  }

  public searchItemsOrdersLine(us: UserSearch): any {
    let query = `{
     
           "query":{  
      "bool":{  
         "must":[  
            {  
               "match":{  
                  "CO_CD":"${us.CompanyCode}"
               }
            },
            {  
               "query_string":{  
                  "query": "\\"${us.SearchText}\\"",
                  "default_field":"ITM_CD"
               }
            }
         ]
      }
   },
       "size":${this.numberOfRecords}
     }`;

    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.SALE_ITEMS + '/' + DataApiConstant.SEARCH + '/', query);

  }

  public SearchInvoiceDetails(us: UserSearch): any {
    let query = `{
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "CO_CD": "${us.CompanyCode}"
              }
            },
            {
              "query_string": {
                "query": "\\\" ${us.SearchText} \\\"",
                "default_field": "DEL_DOC_NUM"
              }
            }
          ]
        }
      },
      "size": ${this.numberOfRecords}
    }`;
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.SALE_ORDERS_LINE + '/' + DataApiConstant.SEARCH + '/', query);
  }
  public SearchCustomerComments(us: any): any {
    let query = (JSON.stringify({
      'query': {
        'bool': {
          'must': [

            {
              'query_string': {
                'query': "\\\"" + us.CUST_CD + "\\\"",
                'default_field': 'CUST_CD'
              }
            }
          ]
        }
      },
      'size': this.numberOfRecords
    }));
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.CUSTOMER_COMMENTS + '/' + DataApiConstant.SEARCH + '/', query);
  }

  public invoiceList(filters: any): any {
    let CO_CD = filters.CO_CD;
    let CUST_CD = filters.CUST_CD;
    let query = `{
            "query": {
              "bool": {
                "must": [
                  { "match": { "CO_CD":  "${CO_CD}" }},
                  { "query_string": { "query":  "\\"${CUST_CD}\\"",
                    "default_field" : "CUST_CD" }}
            ]}} ,  "size":${this.numberOfRecords}}`;

    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.SALE_ORDERS + '/' + DataApiConstant.SEARCH + '/', query);
  }

  public SearchCustomerInformation(filters: UserSearch): any {
    let CO_CD = filters.CompanyCode;
    let DEL_DOC_NUM = filters.SearchText;
    let query = `{
            "query": {
              "bool": {
                "must": [
                  { "match": { "CO_CD":  "${CO_CD}" }},
                  { "query_string": { "query": "\\"${DEL_DOC_NUM}\\"",
                    "default_field": "DEL_DOC_NUM"  }}
            ]}} ,  "size":${this.numberOfRecords}}`;
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.SALE_ORDERS + '/' + DataApiConstant.SEARCH + '/', query);
  }

  public SearchSaleOrderComments(filters: any): any {
    let CO_CD = filters.CO_CD;
    let SO_SEQ_NUM = filters.SO_SEQ_NUM;
    let SO_STORE_CD = filters.SO_STORE_CD;
    let query = `{
            "query": {
              "bool": {
                "must": [
                  { "match": { "CO_CD":  "${CO_CD}" }},
                  { "query_string": { "query":  "\\"${SO_SEQ_NUM}\\"",
                    "default_field": "SO_SEQ_NUM" }},
                  { "query_string": { "query":  "\\"${SO_STORE_CD}\\"",
                    "default_field": "SO_STORE_CD" }}
            ]}} ,  "size":${this.numberOfRecords}}`;
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.SALE_ORDER_COMMENTS + '/' + DataApiConstant.SEARCH + '/', query);
  }

  public SearchInvoiceDeposits(filters: any): any {
    let CO_CD = filters.CO_CD;
    let IVC_CD = filters.IVC_CD;
    let query = `{
            "query": {
              "bool": {
                "must": [
                  { "match": { "CO_CD":  "${CO_CD}" }},
                  { "query_string": { "query":  "\\"${IVC_CD}\\"",
                    "default_field": "IVC_CD" }}
            ]}} ,  "size":${this.numberOfRecords}}`;
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.AR_TRN + '/' + DataApiConstant.SEARCH + '/', query);
  }

  public SearchCustomerTransactions(filters: any): any {
    let CO_CD = filters.CO_CD;
    let CUST_CD = filters.CUST_CD;
    let query = `{
            "query": {
              "bool": {
                "must": [
                  { "match": { "CO_CD":  "${CO_CD}" }},
                  { "query_string": { "query":  "\\"${CUST_CD}\\"",
                    "default_field": "CUST_CD" }}
            ]}} ,  "size":${this.numberOfRecords}}`;
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.AR_TRN + '/' + DataApiConstant.SEARCH + '/', query);
  }

  public SearchInvoiceDepositsByTRNTP(filters: any): any {
    let CO_CD = filters.CO_CD;
    let TRN_TP_CD_LIST = filters.TRN_TP_CD_LIST;
    let query = ` {
            "query": {
              "bool": {
                "must": [
                  { "match": { "CO_CD":  "${CO_CD}" }},
                  {
                    "query_string" : {
                      "query":      "${TRN_TP_CD_LIST}",
                      "default_field":  "TRN_TP_CD"
            }}]}} ,  "size":${this.numberOfRecords}}`;
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.AR_TRN_TP + '/' + DataApiConstant.SEARCH + '/', query);
  }

  public SearchSalePerson(filters: any): any {
    let CO_CD = filters.CO_CD;
    let EMP_CD1_CD2 = "\\\"" + filters.SO_EMP_SLSP_CD1 + "\\\"" + " OR " + "\\\"" + filters.SO_EMP_SLSP_CD2 + "\\\"";

    let query = ` {
            "query": {
              "bool": {
                "must": [
                  { "match": { "CO_CD":  "${CO_CD}" }},
                  {
                    "query_string" : {
                      "query":      "${EMP_CD1_CD2}",
                      "default_field":  "EMP_CD"
            }}]}} ,  "size":${this.numberOfRecords}}`;
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.EMP + '/' + DataApiConstant.SEARCH + '/', query);
  }

  public GetItemsForInvoiceDetail(filters: any): any {
    let CO_CD = filters.CO_CD;
    let ITM_CD_LIST = filters.ITM_CD_LIST;
    let query = `{
    
          "query":{  
     "bool":{  
        "must":[  
           {  
              "match":{  
                 "CO_CD":"${CO_CD}"
              }
           },
           {  
              "query_string":{  
                 "query": "${ITM_CD_LIST}",
                 "default_field":"ITM_CD"
              }
           }
        ]
     }
  },
      "size":${this.numberOfRecords}
    }`;

    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.SALE_ITEMS + '/' + DataApiConstant.SEARCH + '/', query);

  }

  public SearchInvoiceDepositsByMop(filters: any): any {
    let CO_CD = filters.CO_CD;
    let MOP_CD_LIST = filters.MOP_CD_LIST;
    let query = ` {
      "query": {
        "bool": {
          "must": [
            { "match": { "CO_CD":  "${CO_CD}" }},
            {
              "query_string" : {
                "query":      "${MOP_CD_LIST}",
                "default_field":  "MOP_CD"
      }}]}} ,  "size":${this.numberOfRecords}}`;
    return super.PostData(GlobalContent.dataApiBaseUrl + DataApiConstant.MOP + '/' + DataApiConstant.SEARCH + '/', query);
  }
}
