import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import * as appActions from '../store/Actions/app.actions';

@Component({
    selector: 'app-invoice-list-cell',
    template: `<a [routerLink]=[link] (click)="onInvoiceClick(params.data)" title="Invoice Detail">{{params.value}}`
})

export class AnchorInvoiceListComponent implements ICellRendererAngularComp, OnDestroy {
    public params: any;
    public link: any;

    constructor(public store: Store<any>) {
    }

    agInit(params: any): void {
        this.params = params;
        this.link = `${params.data.CUST_INVOICE_DETAIL_LINK}`;
    }

    public onInvoiceClick(custRowData) {
        this.store.dispatch(new appActions.GetCustomerInvoiceRow(custRowData));
    }

    ngOnDestroy() {
    }

    refresh(): boolean {
        return false;
    }
}
