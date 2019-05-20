import { Injectable } from '@angular/core';
import { Dictionary } from './common/dictionary';

export class GlobalContent {
  public static Enviorment = "Development";
  public static dataApiBaseUrl = "https://vpc-qa-ticketdetail-mfrm-65ktt22x2o4nram4vlhrb6kqr4.us-west-2.es.amazonaws.com/";
  
  public static DefaultRowsDisplayed = "100";
  public static NumberOfRecords = "10000";
  public static DefaultCompanyCode = "AX";
}
export class RouteConstant {
  public static SEARCH = "search";
  public static CUST_INVOICES = "customer_invoices";
  public static CUST_TRANSACTIONS = "customer_transactions";
  public static CUST_INVOICE_DETAIL = "customer_invoice_detail";
  public static ITEM_DETAILS = "item_details";
  public static SALE_DETAILS = 'customer_details';
}

export class DataApiConstant {
  public static SEARCH = "_search";
  public static SALE_ORDERS = "so";
  public static SALE_ORDERS_LINE = "so_ln";
  public static SALE_ITEMS = "itm";
  public static Companies = 'companies';
  public static SALE_ORDER_COMMENTS = 'so_cmnt';
  public static AR_TRN = 'ar_trn';
  public static AR_TRN_TP = 'ar_trn_tp';
  public static EMP = 'emp';
  public static CUSTOMER_COMMENTS = 'cust_cmnt';
  public static MOP = 'mop';
}


export class ImagePath {
  public static tnCollapsedImg = './styles/images/arrright14x10.png';
  public static tnExpandedImg = './styles/images/arrbottom14x10.png';
  public static AllPortfolioImage = './styles/images/allport32x32.png';
  public static CorporateImage = './styles/images/cor32x32.png';
  public static TargetedImage = './styles/images/tar32x32.png';
  public static IndividualImage = './styles/images/indv32x32.png';
  public static FolderClosedImage = './styles/images/folclosed32x32.png';
  public static FolderOpenedImage = './styles/images/folopened32x32.png';
  public static ExportFileImage = './styles/images/export24x24.png';
  public static ImportFileImage = './styles/images/import24x24.png';
}




export const HTTP_CODE_LOOKUP: Dictionary<string> = new Dictionary<string>();
HTTP_CODE_LOOKUP.add("0", "No response received from server.");
HTTP_CODE_LOOKUP.add("400", "Code: 400 - Bad Request.");
HTTP_CODE_LOOKUP.add("401", "Code: 401 - Unathorized.");
HTTP_CODE_LOOKUP.add("402", "Code: 402 - Payment Required.");
HTTP_CODE_LOOKUP.add("403", "Code: 403 - Forbidden.");
HTTP_CODE_LOOKUP.add("404", "Code: 404 - Not Found.");
HTTP_CODE_LOOKUP.add("405", "Code: 405 - Method Not Allowed.");
HTTP_CODE_LOOKUP.add("406", "Code: 406 - Not Acceptable.");
HTTP_CODE_LOOKUP.add("407", "Code: 407 - Proxy Authentication Required.");
HTTP_CODE_LOOKUP.add("408", "Code: 408 - Request Timeout.");
HTTP_CODE_LOOKUP.add("409", "Code: 409 - Conflict.");
HTTP_CODE_LOOKUP.add("410", "Code: 410 - Gone.");
HTTP_CODE_LOOKUP.add("411", "Code: 411 - Lenght Required.");
HTTP_CODE_LOOKUP.add("412", "Code: 412 - Precondition Failed.");
HTTP_CODE_LOOKUP.add("413", "Code: 413 - Payload Too Large.");
HTTP_CODE_LOOKUP.add("414", "Code: 414 - URI Too Large.");
HTTP_CODE_LOOKUP.add("415", "Code: 415 - Unsupported Media Type.");
HTTP_CODE_LOOKUP.add("416", "Code: 416 - Request Range Not Satisfiable.");
HTTP_CODE_LOOKUP.add("417", "Code: 417 - I'm a teapot.");
HTTP_CODE_LOOKUP.add("421", "Code: 421 - Misdirected Request.");
HTTP_CODE_LOOKUP.add("422", "Code: 422 - Unprocessable Entity.");
HTTP_CODE_LOOKUP.add("423", "Code: 423 - Locked.");
HTTP_CODE_LOOKUP.add("424", "Code: 424 - Failed Dependency.");
HTTP_CODE_LOOKUP.add("426", "Code: 426 - Upgrade Required.");
HTTP_CODE_LOOKUP.add("428", "Code: 428 - Precondition Required.");
HTTP_CODE_LOOKUP.add("429", "Code: 429 - Too Many Requests.");
HTTP_CODE_LOOKUP.add("431", "Code: 431 - Request Header Fields Too Large.");
HTTP_CODE_LOOKUP.add("451", "Code: 451 - Unavailable For Legal Reasons.");
HTTP_CODE_LOOKUP.add("500", "Code: 500 - Internal Server Error.");
HTTP_CODE_LOOKUP.add("501", "Code: 501 - Not Implemented.");
HTTP_CODE_LOOKUP.add("502", "Code: 502 - Bad Gateway.");
HTTP_CODE_LOOKUP.add("503", "Code: 503 - Service Unavailable.");
HTTP_CODE_LOOKUP.add("504", "Code: 504 - Gateway Timeout.");
HTTP_CODE_LOOKUP.add("505", "Code: 505 - HTTP Version Not Supported.");
HTTP_CODE_LOOKUP.add("506", "Code: 506 - Variant Also Negotiates.");
HTTP_CODE_LOOKUP.add("507", "Code: 507 - Insufficient Storage.");
HTTP_CODE_LOOKUP.add("508", "Code: 508 - Loop Detected.");
HTTP_CODE_LOOKUP.add("510", "Code: 510 - Not Extended.");
HTTP_CODE_LOOKUP.add("511", "Code: 511 - Network Authentication Required.");

export const US_STATE_CODE_LOOKUP: Dictionary<string> = new Dictionary<string>();
US_STATE_CODE_LOOKUP.add("AL", "Alabama", );
US_STATE_CODE_LOOKUP.add("AK", "Alaska");
US_STATE_CODE_LOOKUP.add("AS", "American Samoa");
US_STATE_CODE_LOOKUP.add("AZ", "Arizona");
US_STATE_CODE_LOOKUP.add("AR", "Arkansas");
US_STATE_CODE_LOOKUP.add("CA", "California");
US_STATE_CODE_LOOKUP.add("CO", "Colorado");
US_STATE_CODE_LOOKUP.add("CT", "Connecticut");
US_STATE_CODE_LOOKUP.add("DE", "Delaware");
US_STATE_CODE_LOOKUP.add("DC", "District Of Columbia");
US_STATE_CODE_LOOKUP.add("FM", "Federated States Of Micronesia");
US_STATE_CODE_LOOKUP.add("FL", "Florida");
US_STATE_CODE_LOOKUP.add("GA", "Georgia");
US_STATE_CODE_LOOKUP.add("GU", "Guam");
US_STATE_CODE_LOOKUP.add("HI", "Hawaii");
US_STATE_CODE_LOOKUP.add("ID", "Idaho");
US_STATE_CODE_LOOKUP.add("IL", "Illinois");
US_STATE_CODE_LOOKUP.add("IN", "Indiana");
US_STATE_CODE_LOOKUP.add("IA", "Iowa");
US_STATE_CODE_LOOKUP.add("KS", "Kansas");
US_STATE_CODE_LOOKUP.add("KY", "Kentucky");
US_STATE_CODE_LOOKUP.add("LA", "Louisiana");
US_STATE_CODE_LOOKUP.add("ME", "Maine");
US_STATE_CODE_LOOKUP.add("MH", "Marshall Islands");
US_STATE_CODE_LOOKUP.add("MD", "Maryland");
US_STATE_CODE_LOOKUP.add("MA", "Massachusetts");
US_STATE_CODE_LOOKUP.add("MI", "Michigan");
US_STATE_CODE_LOOKUP.add("MN", "Minnesota");
US_STATE_CODE_LOOKUP.add("MS", "Mississippi");
US_STATE_CODE_LOOKUP.add("MO", "Missouri");
US_STATE_CODE_LOOKUP.add("MT", "Montana");
US_STATE_CODE_LOOKUP.add("NE", "Nebraska");
US_STATE_CODE_LOOKUP.add("NV", "Nevada");
US_STATE_CODE_LOOKUP.add("NH", "New Hampshire");
US_STATE_CODE_LOOKUP.add("NJ", "New Jersey");
US_STATE_CODE_LOOKUP.add("NM", "New Mexico");
US_STATE_CODE_LOOKUP.add("NY", "New York");
US_STATE_CODE_LOOKUP.add("NC", "North Carolina");
US_STATE_CODE_LOOKUP.add("ND", "North Dakota");
US_STATE_CODE_LOOKUP.add("MP", "Northern Mariana Islands");
US_STATE_CODE_LOOKUP.add("OH", "Ohio");
US_STATE_CODE_LOOKUP.add("OK", "Oklahoma");
US_STATE_CODE_LOOKUP.add("OR", "Oregon");
US_STATE_CODE_LOOKUP.add("PW", "Palau");
US_STATE_CODE_LOOKUP.add("PA", "Pennsylvania");
US_STATE_CODE_LOOKUP.add("PR", "Puerto Rico");
US_STATE_CODE_LOOKUP.add("RI", "Rhode Island");
US_STATE_CODE_LOOKUP.add("SC", "South Carolina");
US_STATE_CODE_LOOKUP.add("SD", "South Dakota");
US_STATE_CODE_LOOKUP.add("TN", "Tennessee");
US_STATE_CODE_LOOKUP.add("TX", "Texas");
US_STATE_CODE_LOOKUP.add("UT", "Utah");
US_STATE_CODE_LOOKUP.add("VT", "Vermont");
US_STATE_CODE_LOOKUP.add("VI", "Virgin Islands");
US_STATE_CODE_LOOKUP.add("VA", "Virginia");
US_STATE_CODE_LOOKUP.add("WA", "Washington");
US_STATE_CODE_LOOKUP.add("WV", "West Virginia");
US_STATE_CODE_LOOKUP.add("WI", "Wisconsin");
US_STATE_CODE_LOOKUP.add("WY", "Wyoming");