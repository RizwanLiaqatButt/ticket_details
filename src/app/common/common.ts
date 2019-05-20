import * as moment from 'moment';

export class Common{
    public static getFullName(firstName: string, lastName: string): string {
        if (firstName && firstName.trim() !== '' && lastName && lastName.trim() !== '') {
            return firstName.trim() + ' ' + lastName.trim();
        } else if (firstName && firstName.trim() !== '' && lastName && lastName.trim() === '') {
            return firstName.trim();
        } else if (firstName && firstName.trim() === '' && lastName && lastName.trim() !== '') {
            return lastName.trim();
        } else {
            return '';
        }
    }

    public static currencyFormatRenderer(params: any) {
        var usdFormate = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2
      });
      return isNaN(params.value) ? '' : usdFormate.format(params.value);
    }

    public static currencyFormatter(value: any) {
        var usdFormate = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2
      });
      return isNaN(value) ? '' : usdFormate.format(value);
    }

    public static dateFormatRenderer(params) {
        if(params.value) {
          return moment(params.value.replace("PM", " PM").replace("AM", " AM").replace("  "," ")).format('MM/DD/YYYY');
        }
        return "";
      }

      public static dateFormatter(value) {
        if(value) {
          return moment(value.replace("PM", " PM").replace("AM", " AM").replace("  "," ")).format('MM/DD/YYYY');
        }
        return "";
      }
}
