export class COMPANIES {
    constructor(
        public CODE: string,
        public NAME: string,
        public ADDED_ON: string,
        public ORIGINALSYSTEM: string,
        public PROJECT_NAME: string,
        public STATUS: string,
        // view model for dropdown
        public CodeName: string) { }
}
