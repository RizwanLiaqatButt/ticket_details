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
import { CacheStore } from '../cache-store/cache.store';
import { CommonInfoService } from './common.info.service';

import '../rxjs-operators/rxjs.operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BaseService {
    constructor(
        public http: Http,
        public _cis: CommonInfoService
    ) { }

    protected GetData(url: string, headers?: Headers): Subject<any> {
        const tokenSubject = new Subject<any>();
        if (headers == null) {
            headers = new Headers();
        }
        headers.append('Access-Control-Allow-Origin', 'true');
        headers.append('Accept', 'application/json');
        this.http.get(url, { 'headers': headers }).map((r: any) => r.json()).subscribe((response: any) => {
            tokenSubject.next(response);
        }, (error: any) => {
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

    protected PostData(url: string, body: string, headers?: Headers): Subject<any> {
        const tokenSubject = new Subject<any>();
        if (headers == null) {
            headers = new Headers();
        }
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Accept', 'application/json');
        this.http.post(url, body, { 'headers': headers }).map((r: any) => r.json()).subscribe((response: any) => {
            tokenSubject.next(response.hits.hits);
        }, (error: any) => {
            console.log(error);
        });
        return tokenSubject;
    }

    protected GetOptionArgs(): RequestOptionsArgs {
        return null;
    }
}
