import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'underscore';

import { PagerService } from '../../services/pager.service';

@Component({

    selector: 'grid-listView',
    templateUrl: 'grid-listView.component.html'
})

export class GridListViewComponent implements OnInit {
    private sourceData:any[];
    private allItems: any[]=[];
    constructor(private http: Http, private pagerService: PagerService) {this.sourceData=  [
    {make: "Toyota", model: "Celica", price: 35000,dummy:"me"},
    {make: "Ford", model: "Mondeo", price: 32000,dummy:"me"},
    {make: "Porsche", model: "Boxter", price: 72000,dummy:"me"}
]; }
 
 
    pager: any = {};

    // paged items
    pagedItems: any[];

    ngOnInit() {
        // get dummy data
        for(var i=0;i<this.sourceData.length;i++)
{

for (var key in this.sourceData[i]) {
  //alert(' name=' + key + ' value=' + this.sourceData[i][key]);
this.allItems.push({"key":key,"value":this.sourceData[i][key]});
   // do some more stuff with obj[key]
}
 
}
       this.setPage(3); 
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page,4);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}