import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { SO_CMNT } from '../../models/SO_CMNT';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as _ from 'lodash';

@Component({
  selector: 'app-comments-detail',
  templateUrl: './comments-detail.component.html',
  styleUrls: ['./comments-detail.component.css']
})
export class CommentsDetailComponent implements OnInit, OnDestroy {
public saleOrderSelectedComment: SO_CMNT = null;
private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public store: Store<any>) {
  }

  ngOnInit() {
    this.store.select('saleOrderCommentsReducer').takeUntil(this.ngUnsubscribe).subscribe(data => {
      if ( data.saleOrderComments.length > 0 && !this.saleOrderSelectedComment ) {
         let tempComments: any = _.orderBy(data.saleOrderComments, ['ID'], ['desc']);
          this.saleOrderSelectedComment = tempComments[0];
          localStorage.removeItem('saleOrderSelectedComment');
          localStorage.setItem('saleOrderSelectedComment', JSON.stringify(this.saleOrderSelectedComment));
        }

        if ( data.saleOrderSelectedComment) {
          this.saleOrderSelectedComment = data.saleOrderSelectedComment;
          localStorage.removeItem('saleOrderSelectedComment');
          localStorage.setItem('saleOrderSelectedComment', JSON.stringify(this.saleOrderSelectedComment));
        }
    });

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
