import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import * as appActions from '../store/Actions/app.actions';

@Component({
    selector: 'app-list-view-cell',
    template: `<a (click)="onClick(params.rowIndex)" ><img src='./assets/edit.png' alt='Edit' title="List view"/> </a>`
})

export class ListViewComponent implements ICellRendererAngularComp, OnDestroy {
    public params: any;
    public link: any;

    constructor(public store: Store<any>) {
        
    }

    agInit(params: any): void {
    this.params=params;
    }

    public onClick(event:any) {
     this.params.context.gridContext.setPage(event+1);
     this.params.context.gridContext.toogleList();
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
