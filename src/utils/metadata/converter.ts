export class Converter {
    static cast<T>(ins: T, obj: any): T {
        if (!ins || !obj) return ins;
        for (let prop in ins){
            console.log(prop);
            ins[prop] = obj[prop];
        }
        return ins;
    } 
}