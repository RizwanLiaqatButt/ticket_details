import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';
import { CustomerInvoicesComponent } from './components/customer-invoices/customer-invoices.component';
import { CustomerInvoiceDetailComponent } from './components/customer-invoice-detail/customer-invoice-detail.component';
import { CustomerTransactionComponent } from './components/customer-transaction/customer-transaction.component';
import { CustomerTransactionsGridComponent } from './components/customer-transactions-grid/customer-transactions-grid.component';
import { CustomerItemDetailComponent } from './components/customer-item-detail/customer-item-detail.component';
import { CompanyCodesComponent } from './components/company-codes/company-codes.component';
import { CompanyCodeDetailComponent } from './components/company-code-detail/company-code-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomerInvoiceListPrintComponent } from './components/customer-invoice-list-print/customer-invoice-list-print.component';
import { CompanyCodesPrintComponent } from './components/company-codes-print/company-codes-print.component';
import { CustomerTransactionPrintComponent } from './components/customer-transaction-print/customer-transaction-print.component';
import { CustomerItemDetailPrintComponent } from './components/customer-item-detail-print/customer-item-detail-print.component';
import { CustomerInvoiceDetailPrintComponent } from './components/customer-invoice-detail-print/customer-invoice-detail-print.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {
  //     breadcrumb: "login",
  //   }
  // },
  {
    path: '',
    component: CustomerMainComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: "Customer Research",
    },
    children: [
      {
        path: 'search',
        component: CustomerMainComponent,

      }
    ]
  },
  {
    path: 'customer_invoices',
    component: CustomerInvoicesComponent,
    data: {
      breadcrumb: "Customer Invoices"
    }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'customer_invoice_detail',
    component: CustomerInvoiceDetailComponent,
    data: {
      breadcrumb: "Customer Invoice Detail by Del_doc_num"
    }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'customer_transactions',
    component: CustomerTransactionComponent,
    data: {
      breadcrumb: "Customer Transactions"
    },
    children: [
      {
        path: 'lsit',
        component: CustomerTransactionsGridComponent
      },

    ], 
    canActivate: [AuthGuard]
  },
  {
    path: 'customer_details',
    component: CustomerItemDetailComponent,
    data: {
      breadcrumb: 'SO_LN_DETAILS'
    }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'companyCodes',
    component: CompanyCodesComponent,
    data: {
      breadcrumb: "Company Codes"
    },
     canActivate: [AuthGuard]
  },
  {
    path: 'customerInvoiceDetails',
    component: CustomerInvoiceDetailComponent,
    data: {
      breadcrumb: "Customer Invoices by Del_doc_num"
    }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'customerInvoiceListPrint',
    component: CustomerInvoiceListPrintComponent,
    data: {
      breadcrumb: ""
    }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'companyCodesPrint',
    component: CompanyCodesPrintComponent,
    data: {
      breadcrumb: ""
    }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'customerTransactionPrint',
    component: CustomerTransactionPrintComponent,
    data: {
      breadcrumb: ""
    }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'customerItemDetailPrint',
    component: CustomerItemDetailPrintComponent,
    data: {
      breadcrumb: ""
    }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'customerInvoiceDetailPrint',
    component: CustomerInvoiceDetailPrintComponent,
    data: {
      breadcrumb: ""
    }, 
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }