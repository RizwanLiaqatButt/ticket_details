export class URLHelper {
    public static generateUrl(...args: string[]): string {
        let url: string = "";
        args.forEach(element => {
            if (element.trim() === "") {
                return;
            }
            else{
                url += "/" + element.trim().toLowerCase();
            }
            // else {
            //     url += element.trim().toLowerCase() + "/";
            // }
        });
        return url;
    }
}