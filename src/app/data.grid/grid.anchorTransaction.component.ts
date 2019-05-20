import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import * as appActions from '../store/Actions/app.actions';

@Component({
    selector: 'app-transaction-cell',
    template: `<a [routerLink]=[params.data.CUST_TRANSACTIONS_LINK] (click)="onDelDocClick(params.data)" title="Customer Transaction" >{{params.value}}</a>`
})

export class AnchorTransactionComponent implements ICellRendererAngularComp, OnDestroy {
    public params: any;
constructor(public store: Store<any>) {
    }
    agInit(params: any): void {
        this.params = params;
    }

    public valueSquared(): number {
        return this.params.value * this.params.value;
    }
onDelDocClick(data)
{
     this.store.dispatch(new appActions.GetCustomerSearchRow(data));
}
    ngOnDestroy() {
    }

    refresh(): boolean {
        return false;
    }
}
