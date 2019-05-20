import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import "rxjs/add/operator/filter";
import { forEach } from "@angular/router/src/utils/collection";

interface IBreadcrumb {
  label: string;
  params?: Params;
  url: any;
}
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  public allbreadcrumbs: IBreadcrumb[];
  check = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.allbreadcrumbs = [];
  }
  ngOnInit() {
    //subscribe to the NavigationEnd event
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      if (this.allbreadcrumbs.length === 0 && this.activatedRoute.root.firstChild.snapshot.data['breadcrumb'] != "login") {
        this.allbreadcrumbs.push({ label: this.activatedRoute.root.firstChild.snapshot.data['breadcrumb'], url: "/" + this.activatedRoute.firstChild.snapshot.routeConfig.path });
      }
      else if (this.allbreadcrumbs.length > 0) {
        for (let i = 0; i < this.allbreadcrumbs.length; i++) {
          if (this.allbreadcrumbs[i].label === this.activatedRoute.root.firstChild.snapshot.data['breadcrumb']) {
            this.check = false;
          }
        }
        if (this.check) {
          if(this.activatedRoute.root.firstChild.snapshot.data['breadcrumb'] != "login") {
            this.allbreadcrumbs.push({ label: this.activatedRoute.root.firstChild.snapshot.data['breadcrumb'], url: "/" + this.activatedRoute.firstChild.snapshot.routeConfig.path });
          } else {
            this.allbreadcrumbs = [];
          }
        }
        this.check = true;
      }

    });
  }

  onClick(breadcrumb: IBreadcrumb) {
    for (let i = 0; i < this.allbreadcrumbs.length; i++) {
      let len = this.allbreadcrumbs.length;
      if (this.allbreadcrumbs[i].label === breadcrumb.label) {
        this.allbreadcrumbs.splice(i + 1, len);
        break;
      }

    }
  }
}
