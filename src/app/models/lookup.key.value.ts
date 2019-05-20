export class LookupKeyValue {
    constructor(
        public Key: number,
        public Name: string,
        public IsDefault: boolean = false
    ) { }
}
export class LookupKeyValueBool {
    constructor(
        public Key: number,
        public Name: string,
        public Value: boolean
    ) { }
}

export class LookupKeyValueTreeList {
    constructor(
        public Key: number,
        public Name: string,
        public List: LookupKeyValueTreeList[]
    ) { }
}
export class LookupContactType{
    constructor(
        ContactTypeID:number,
        Name: string,
        ModifiedDate:Date
    ){}
}

export function SortByName(x:any,y:any):number{
    if(x.Name>y.Name) return 1;
    if(x.Name<y.Name) return 1;
    return 0;
}