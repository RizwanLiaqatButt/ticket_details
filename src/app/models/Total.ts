export class Total {
    public DEL_CHG: number;
    public SETUP_CHG: number;
    public TAX_CHG: number;
    /**
     * Custom members
     */
    public NetValue: number; // SUM(UNIT_PRICE * QTY)
    public Taxes: number; // SUM(CUST_TAX_CHG)  
    public TotalTicket: number; // Net Value + Setup Charge + Delivery Charge + Tax Charge + Taxes    
}
