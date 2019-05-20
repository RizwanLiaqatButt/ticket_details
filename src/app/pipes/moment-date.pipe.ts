import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'momentDate'
})

export class MomentDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return this.dateformatter(value);
  }

  private dateformatter(value: any) {
    let res = "";
    if(value) {
      let momentParsedDate = moment(value.replace("PM", " PM").replace("AM", " AM").replace("  "," ")).format('MM/DD/YYYY');
      res = momentParsedDate.indexOf('Invalid') >= 0 ? value: momentParsedDate;
  }
  return res;
}

}