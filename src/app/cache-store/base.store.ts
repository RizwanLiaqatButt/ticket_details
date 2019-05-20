import { BaseService } from '../services/base.service';
import { EsBaseService } from '../services/es.base.service';
import { CommonInfoService } from '../services/common.info.service';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

export class BaseStore<T> extends EsBaseService {
  public dataSubject: Subject<Array<T>>;
  private data: Array<T>;
  public sortFunc?: (x: T, y: T) => number;

  constructor(
    public _http: Http,
    public _cis: CommonInfoService,
    private _url: string
  ) {
    super(_http, _cis);
    this.dataSubject = new Subject<Array<T>>();
    this.data = [];
  }

  getData() {
    if (!this.data || this.data.length === 0) {
      super.GetData(this._url).subscribe(x => {
        this.data = x;
        if (this.sortFunc) {
          this.data.sort(this.sortFunc);
        }
        this.dataSubject.next(this.data);
      });
    } else {
      this.dataSubject.next(this.data);
    }
  }
}
