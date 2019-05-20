import { SO } from '../models/SO';
import { SOLN } from '../models/SO_LN';
import { SO_CMNT } from '../models/SO_CMNT';
import { TRN } from '../models/TRN';
import { Common } from '../common/common';
import { URLHelper } from '../helpers/URLHelper';
import { RouteConstant, US_STATE_CODE_LOOKUP, GlobalContent } from '../global.constant';
import { EMP } from '../models/EMP';
import { ITM } from '../models/ITM';

export class Transformation {
    public static SOTransformation(so: SO): SO {
        if (so.CUST_NAME) {
            so.CUST_INVOICES_LINK = URLHelper.generateUrl(RouteConstant.CUST_INVOICES);
            so.CUST_INVOICE_DETAIL_LINK = URLHelper.generateUrl(RouteConstant.CUST_INVOICE_DETAIL);
        }

        if (so.CUST_CD) {
            so.CUST_TRANSACTIONS_LINK = URLHelper.generateUrl(RouteConstant.CUST_TRANSACTIONS);
        }
        if (so.SHIP_TO_ST_CD) {
            so.SHIP_TO_ST = US_STATE_CODE_LOOKUP[so.SHIP_TO_ST_CD.trim().toUpperCase()];
        }
        so.SALE_Details_LINK = URLHelper.generateUrl(RouteConstant.SALE_DETAILS);
        return so;
    }

    public static SOLNTransformation(soln: SOLN): SOLN {
        soln.NetLine = +soln.QTY * +soln.UNIT_PRC;
        soln.Type = soln.LOC_CD + '-' + soln.OUT_CD;
        soln.Quantity_Ordered = +soln.QTY;
        soln.Quantity_Shipped = +soln.QTY;
        soln.Discount_Amount = +soln.DISC_AMT;
        soln.Calculated_NetLine_Amount = soln.NetLine - soln.Discount_Amount;

        if( soln.CO_CD == 'AX' && !soln.FINAL_DT) {
            soln.Quantity_Shipped = 0;   
        }
        
        soln.SALE_Details_LINK = URLHelper.generateUrl(RouteConstant.SALE_DETAILS);
        return soln;
    }

    public static SOCMNTransformation(so_cmnt: SO_CMNT): SO_CMNT {
        return so_cmnt;
    }

    public static TrnTransformation(trn: TRN): TRN {
        trn.Credit = 0;
        trn.Debit = 0;
        trn.Amount = 0;
        trn.Total = 0;
        trn.AMT = trn.AMT == '' || trn.AMT == undefined ? '0' : trn.AMT ;
        if(trn.TRN_TP_CD) {
            trn.TRN_TP_CD = trn.TRN_TP_CD.trim().toUpperCase();
            if(trn.TRN_TP_CD != 'CRM' && trn.TRN_TP_CD != 'DBF' && trn.TRN_TP_CD != 'DTD' 
                && trn.TRN_TP_CD != 'MCR' && trn.TRN_TP_CD != 'MDB' && trn.TRN_TP_CD != 'SAL' 
                && trn.TRN_TP_CD != 'R' ) {
                    trn.Credit =  0;
                    trn.Debit =  +trn.AMT;
                    trn.Amount =  trn.Debit - trn.Credit;
            }
            else if(trn.TRN_TP_CD == 'DTD' || trn.TRN_TP_CD == 'DBF' || trn.TRN_TP_CD == 'R') {
                trn.Credit = +trn.AMT;
                trn.Debit =  0;
                trn.Amount =  trn.Debit - trn.Credit;
            }
        }
        
        return trn;
    }

    public static EmpTransformation(emp: EMP): EMP {
        emp.FullName = Common.getFullName(emp.FNAME, emp.LNAME);
        return emp;
    }

    public static ItemTransformation(itm: ITM): ITM {
        itm.Description = itm.VE_CD + itm.VSN + ' - ' + itm.DES + itm.EXT_DES;
        return itm;
    }

    public static getModelList<T>(models: T[], targetFunc: Function): T[] {
        // tslint:disable-next-line:prefer-const
        let tarsformedModels: Array<T> = [];
        models.forEach(element => {
            tarsformedModels.push(targetFunc(element));
        });
        return tarsformedModels;
    }
}