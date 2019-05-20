import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoBandComponent } from './components/info-band/info-band.component';
import { CustomerInvoiceDetailComponent } from './components/customer-invoice-detail/customer-invoice-detail.component';
import { CustomerInvoicesComponent } from './components/customer-invoices/customer-invoices.component';
import { CustomerItemDetailComponent } from './components/customer-item-detail/customer-item-detail.component';
import { CustomerMainComponent } from './components/customer-main/customer-main.component';
import { CustomerSaleOrderSearchComponent } from './components/customer-sale-order-search/customer-sale-order-search.component';
import { CustomerSaleOrdersComponent } from './components/customer-sale-orders/customer-sale-orders.component';
import { CustomerTransactionComponent } from './components/customer-transaction/customer-transaction.component';
import { InvoiceHeaderComponent } from './components/invoice-header/invoice-header.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { AnchorComponent } from './data.grid/grid.anchor.component';
import { AnchorTransactionComponent } from './data.grid/grid.anchorTransaction.component';
// tslint:disable-next-line:max-line-length
import { CustomerTransactionsInformationComponent } from './components/customer-transactions-information/customer-transactions-information.component';
import { CustomerTransactionsGridComponent } from './components/customer-transactions-grid/customer-transactions-grid.component';
import { CustomerTransactionsDetailComponent } from './components/customer-transactions-detail/customer-transactions-detail.component';
// tslint:disable-next-line:max-line-length
import { CustomerTransactionsCommentsComponent } from './components/customer-transactions-comments/customer-transactions-comments.component';
import { CustomerInformationComponent } from './components/customer-information/customer-information.component';
import { CustomerInvoicesItemsComponent } from './components/customer-invoice-items/customer-invoice-items.component';
import { SaleOrderCommentsComponent } from './components/sale-order-comments/sale-order-comments.component';
import { InvoiceDepositsComponent } from './components/invoice-deposits/invoice-deposits.component';

import { CustomerService } from './services/customer.service';
import { BaseService } from './services/base.service';
import { EsBaseService } from './services/es.base.service';
import { CommonInfoService } from './services/common.info.service';
import { LookupDataService } from './services/lookup.data.service';
import { CompanyService } from './services/company.service';
import { PagerService } from './services/pager.service';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { reducers } from './store/reducers/app.reducers';

import { searchEffects } from './store/Effects/searchEffect';
import { invoiceListEffects } from './components/invoice-list/invoiceListEffect';
import { customerDetailsEffect } from './components/customer-item-detail/customerDetailsEffect';
import { CompanyCodesComponent } from './components/company-codes/company-codes.component';
import { CompanyCodeDetailComponent } from './components/company-code-detail/company-code-detail.component';
import { companyCodesEffects } from './components/company-codes/companyCodesEffect';
import { CustomerInformationEffect } from './components/customer-information/customerInformationEffect';
import { SaleOrderCommentsEffect } from './components/sale-order-comments/saleOrderCommentsEffect';
import { InvoiceDepositEffect } from './components/invoice-deposits/InvoiceDepositEffect';
import { SalePersonEffect } from './components/sale-person/salePersonEffect';

import { TotalsComponent } from './components/totals/totals.component';
import { SalePersonComponent } from './components/sale-person/sale-person.component';
import { CommentsDetailComponent } from './components/comments-detail/comments-detail.component';
import { SalesDetailComponent } from './data.grid/grid.anchor.saleDetails.component';
import { AnchorInvoiceListComponent } from './data.grid/grid.anchor.invoiceList.component';
import { AnchorCommentComponent } from './data.grid/grid.anchor.comment.component';
import { customerTransactionCommentsEffect } from "./components/customer-transactions-comments/customerTrasactionCommentEffect";
import { LoginComponent } from './components/login/login.component';
import { ListViewComponent } from "./data.grid/grid-anchor.listView.component";
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CustomPinnedRowRenderer } from './data.grid/custom-pinned-row-renderer.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomerInvoiceListPrintComponent } from './components/customer-invoice-list-print/customer-invoice-list-print.component';
import { CompanyCodesPrintComponent } from './components/company-codes-print/company-codes-print.component';
import { CustomerTransactionPrintComponent } from './components/customer-transaction-print/customer-transaction-print.component';
import { CustomerItemDetailPrintComponent } from './components/customer-item-detail-print/customer-item-detail-print.component';
import { CustomerInvoiceDetailPrintComponent } from './components/customer-invoice-detail-print/customer-invoice-detail-print.component';
import { MomentDatePipe } from './pipes/moment-date.pipe';
import { GridListViewComponent } from './components/grid-listView/grid-listView.component';


var request = new XMLHttpRequest();
var baseHref = "/";
var config ;
if(window.location.href.split('/')[3] !== "login") {
 request.open("GET", "./assets/config/config.json", false);
 request.send(null);
 config = JSON.parse(request.responseText);
 baseHref = config.href == "/" ? "/": "/" + config.href + "/";
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InfoBandComponent,
    CustomerInvoiceDetailComponent,
    CustomerInvoicesComponent,
    CustomerItemDetailComponent,
    CustomerMainComponent,
    CustomerSaleOrderSearchComponent,
    CustomerSaleOrdersComponent,
    CustomerTransactionComponent,
    InvoiceHeaderComponent,
    InvoiceListComponent,
    AnchorComponent,
    AnchorTransactionComponent,
    CustomerTransactionsInformationComponent,
    CustomerTransactionsGridComponent,
    CustomerTransactionsDetailComponent,
    CustomerTransactionsCommentsComponent,
    CustomerTransactionsInformationComponent,
    CustomerTransactionsGridComponent,
    CustomerTransactionsDetailComponent,
    CustomerTransactionsCommentsComponent,
    CustomerInformationComponent,
    CustomerInvoicesItemsComponent,
    SaleOrderCommentsComponent,
    InvoiceDepositsComponent,
    CompanyCodesComponent,
    CompanyCodeDetailComponent,
    TotalsComponent,
    SalePersonComponent,
    CommentsDetailComponent,
    SalesDetailComponent,
    AnchorInvoiceListComponent,
    AnchorCommentComponent,
    ListViewComponent,
    LoginComponent,
    BreadcrumbComponent,
    CustomPinnedRowRenderer,
    CustomerInvoiceListPrintComponent,
    CompanyCodesPrintComponent,
    CustomerTransactionPrintComponent,
    CustomerItemDetailPrintComponent,
    CustomerInvoiceDetailPrintComponent,
    MomentDatePipe,
    GridListViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(
      [searchEffects, customerDetailsEffect, invoiceListEffects, companyCodesEffects,
        CustomerInformationEffect, SaleOrderCommentsEffect, InvoiceDepositEffect, SalePersonEffect, customerTransactionCommentsEffect]),
    AgGridModule.withComponents([AnchorComponent, AnchorTransactionComponent, SalesDetailComponent,
      AnchorInvoiceListComponent, AnchorCommentComponent, ListViewComponent, CustomPinnedRowRenderer])
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: baseHref },
    BaseService,
    EsBaseService,
    CustomerService,
    CommonInfoService,
    LookupDataService,
    PagerService,
    CompanyService,
    AuthenticationService,
    AlertService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
