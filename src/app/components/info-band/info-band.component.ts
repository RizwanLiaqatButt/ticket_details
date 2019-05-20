import { Component, OnInit } from '@angular/core';
import { CommonInfoService } from '../../services/common.info.service';

@Component({
  selector: 'app-info-band',
  templateUrl: './info-band.component.html',
  styleUrls: ['./info-band.component.css']
})
export class InfoBandComponent implements OnInit {
  private infoMessage: Array<string> = new Array<string>();
  constructor(
      private _cis: CommonInfoService
  ) { }
  ngOnInit() {
      this._cis.infoMessageSubject.subscribe(info => {
          this.infoMessage = info;
      });
  }
  showInfo() {
      if (this.infoMessage && this.infoMessage.length > 0) {
          return true;
      }
      return false;
  }
  clearInfo() {
      this._cis.clearAllInfoMessages();
  }
}
