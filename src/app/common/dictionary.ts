export class Dictionary<T> {
    _keys: string[] = [];
    _values: T[] = [];

    constructor() { }

    public add(key: string, value: T): void {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    public remove(key: string): void {
        const idx = this._keys.indexOf(key);
        if (idx > -1) {
            this._keys.splice(idx, 1);
            this._values.splice(idx, 1);
            delete this[key];
        }
    }

    public count(): number {
        return this._keys.length;
    }
}
