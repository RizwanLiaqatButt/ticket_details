import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-customer-transactions-detail',
  templateUrl: './customer-transactions-detail.component.html',
  styleUrls: ['./customer-transactions-detail.component.css']
})
export class CustomerTransactionsDetailComponent implements OnInit, OnDestroy {
  columnDefs;
  rowData;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
    this.columnDefs = [
      {
        headerName: 'Inovice#', field: 'invoice_no', width: 150
      },
      {
        headerName: 'Refrence', field: 'refrence', width: 100
      },
      {
        headerName: 'Post Date', field: 'post_date', width: 100
      },
      {
        headerName: 'MOP', field: 'mop', width: 70
      },
      {
        headerName: 'TRN', field: 'trn', width: 70
      },
      {
        headerName: 'TRN Description', field: 'trn_desc', width: 150
      },
      {
        headerName: 'Status', field: 'status', width: 70
      },
      {
        headerName: 'Debit', field: 'debit', width: 70
      },
      {
        headerName: 'Credit', field: 'credit', width: 100
      },
      {
        headerName: 'Running Total', field: 'running_total', width: 150
      }
    ];
    this.rowData = [
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
      {
        invoice_no: '0123457NERFXA', refrence: '-' , post_date: '05/12/17', mop: 'AX', trn: 'DEP',
         trn_desc: 'Deposit', status: 'P', debit: '$0.00', credit: '$8,502.90', running_total: '-$8502.9'
      },
    ];

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}