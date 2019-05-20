import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonInfoService {
  infoMessageSubject: Subject<Array<string>>;
  infoDataStore: { InfoMessage: Array<string> };

  constructor() {
    this.infoMessageSubject = new Subject<string[]>();
    this.infoDataStore = {
      InfoMessage: []
    };
  }

  addInfo(message: string | string[]) {
    if (typeof message === 'string') {
      this.infoDataStore.InfoMessage.push(message);
    } else {
      message.forEach(m => {
        this.infoDataStore.InfoMessage.push(m);
      });
    }
    this.infoMessageSubject.next(this.infoDataStore.InfoMessage);
  }

  clearAllInfoMessages() {
    this.infoDataStore.InfoMessage = [];
    if (this.infoMessageSubject) {
      this.infoMessageSubject.next(this.infoDataStore.InfoMessage);
    }
  }
}
