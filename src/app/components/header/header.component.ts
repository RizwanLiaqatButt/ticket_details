import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  companyCode: string ;
  currentUser: string ;
  isLoggedIn: boolean = false;  
  isFromPrint :boolean = false;
  logoUrl: string = './assets/logo.png';
  constructor(private route: ActivatedRoute,
              private router: Router,public companyService:CompanyService) { 
                
              }

  ngOnInit() {

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.isLoggedIn = localStorage.getItem('currentUser') ? true : false;
      this.currentUser = localStorage.getItem('currentUser');
      this.companyCode = localStorage.getItem('CompanyCode');
      console.log(this.companyCode)
      if(this.router.url.indexOf('customerTransactionPrint') !=-1 || 
      this.router.url.indexOf('companyCodesPrint') !=-1 
      || this.router.url.indexOf('customerInvoiceDetailPrint') !=-1
       || this.router.url.indexOf('customerItemDetailPrint') !=-1 || 
       this.router.url.indexOf('customerInvoiceListPrint') !=-1
      ){
        this.logoUrl = "./assets/" + this.companyCode+".png";
      }
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
}

}
