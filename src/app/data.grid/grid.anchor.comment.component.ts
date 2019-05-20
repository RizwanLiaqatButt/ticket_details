import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import * as appActions from '../store/Actions/app.actions';

@Component({
    selector: 'app-anchor-comment-cell',
    template: `<a (click)="onCommentClick(params.data)" title="View Comment Detail" >{{params.value}}</a>`
})

export class AnchorCommentComponent implements ICellRendererAngularComp, OnDestroy {
    public params: any;

    constructor(public store: Store<any>) {
    }

    agInit(params: any): void {
        this.params = params;
    }

    public valueSquared(): number {
        return this.params.value * this.params.value;
    }

    ngOnDestroy() {
    }

    public onCommentClick(commentData) {
        this.store.dispatch(new appActions.GetSaleOrderSelectedComment(commentData));
    }

    refresh(): boolean {
        return false;
    }
}
