import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import * as appActions from '../store/Actions/app.actions';

@Component({
    selector: 'app-sale-detail-cell',
    template: `<a [routerLink]=[link] (click)="onInvoiceClick(params)" title="Detail sale order line">{{params.value}}</a>`
})

export class SalesDetailComponent implements ICellRendererAngularComp, OnDestroy {
    public params: any;
    public link: any;

    constructor(public store: Store<any>) {
        
    }

    agInit(params: any): void {
        this.params = params;
        this.link = `${this.params.data.SALE_Details_LINK}`;
    }

    public onInvoiceClick(params) {
      params.data.rowNumber=params.rowIndex+1;
        this.store.dispatch(new appActions.GetCustomerInvoiceDetailRow(params.data));
    }

    public valueSquared(): number {
        return this.params.value * this.params.value;
    }

    ngOnDestroy() {
    }

    refresh(): boolean {
        return false;
    }
}
