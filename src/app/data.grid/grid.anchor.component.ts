import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import * as appActions from '../store/Actions/app.actions';

@Component({
    selector: 'app-anchor-cell',
    template: `<a [routerLink]=[params.data.CUST_INVOICES_LINK] (click)="onCustClick(params.data)" title="Customer Invoices" >{{params.value}}</a>`
})

export class AnchorComponent implements ICellRendererAngularComp, OnDestroy {
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

    public onCustClick(custRowData) {
        this.store.dispatch(new appActions.GetCustomerSearchRow(custRowData));
    }

    refresh(): boolean {
        return false;
    }
}
