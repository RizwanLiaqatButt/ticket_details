/**
* Provides a hook for centralized exception handling.
*
* The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
* intercept error handling,
* write a custom exception handler that replaces this default as appropriate for your app.
*/

import { Http, Headers, RequestOptionsArgs, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { GlobalContent, HTTP_CODE_LOOKUP } from '../global.constant';
// import {TokenService} from './tokenService';
import { CacheStore } from '../cache-store/cache.store';
import { CommonInfoService } from './common.info.service';

import '../rxjs-operators/rxjs.operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EsBaseService {
    private static reqCount = 0;

    constructor(
        public http: Http,
        public _cis: CommonInfoService
    ) { }

    private onOffLoader(show) {

        var load = document.getElementById('loader-overlay');
        if (show)
            load.style.display = 'block';
        else
            load.style.display = 'none';
    }

    protected GetData(url: string, headers?: Headers, hideLoader = false): Subject<any> {
        const tokenSubject = new Subject<any>();
        if (headers == null) {
            headers = new Headers();
        }

        if (!hideLoader) {
            EsBaseService.reqCount++;
            this.onOffLoader(true);
        }
      //  headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Accept', 'application/json');
        this.http.get(url, { 'headers': headers }).map((r: any) => r.json()).subscribe((response: any) => {
            const transRes: any[] = [];
            if (response && response.hits && response.hits.hits && response.hits.hits.length > 0) {
                for (let idx = 0; idx < response.hits.hits.length; idx++) {
                    transRes.push(response.hits.hits[idx]._source);
                }
            }
            tokenSubject.next(transRes);
            if (!hideLoader)
                EsBaseService.reqCount--;
            
            if (EsBaseService.reqCount == 0) 
            this.onOffLoader(false);

        }, (error: any) => {
            if (!hideLoader)
            EsBaseService.reqCount--;
            
            if (EsBaseService.reqCount == 0) 
            this.onOffLoader(false);
            if (error) {
                const message = HTTP_CODE_LOOKUP[error.status.toString()];
                if (message) {
                    this._cis.addInfo(message);
                } else {
                    this._cis.addInfo('An Error has occurred, please contact Administrator.');
                }
            }
        });
        return tokenSubject;
    }

    protected PostData(url: string, body: string, headers?: Headers, hideLoader = false): Subject<any> {
        const tokenSubject = new Subject<any>();
        if (headers == null) {
            headers = new Headers();
        }

        if (!hideLoader) {
            EsBaseService.reqCount++;
            this.onOffLoader(true);
        }
      //  headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Accept', 'application/json');
        this.http.post(url, body, { 'headers': headers })
            .map((r: any) => r.json()).subscribe((response: any) => {
                const transRes: any[] = [];
                if (response && response.hits && response.hits.hits && response.hits.hits.length > 0) {
                    for (let idx = 0; idx < response.hits.hits.length; idx++) {
                        transRes.push(response.hits.hits[idx]._source);
                    }
                }
                tokenSubject.next(transRes);

                if (!hideLoader)
                    EsBaseService.reqCount--;
                if (EsBaseService.reqCount == 0) 
                    this.onOffLoader(false);

            }, (error: any) => {
                if (!hideLoader)
                    EsBaseService.reqCount--;
                if (EsBaseService.reqCount == 0) 
                    this.onOffLoader(false);
                if (error) {
                    const message = HTTP_CODE_LOOKUP[error.status.toString()];
                    if (message) {
                        this._cis.addInfo(message);
                    } else {
                        this._cis.addInfo('An Error has occurred, please contact Administrator.');
                    }
                }
            });
        return tokenSubject;
    }

    protected GetOptionArgs(): RequestOptionsArgs {
        return null;
    }
}
