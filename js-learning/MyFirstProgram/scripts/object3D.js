export class CPoint {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x() { return this._x;}

    get y() { return this._y;}

    get z() { return this._z;}

    set x(val) {this._x = val;}

    set y(val) {this._y = val;}

    set z(val) {this._z = val;}

}

export class CVector {
    constructor (x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    length() {
        return Math.sqrt((this._x * this._x) + (this._y * this._y) + (this._z * this._z));
    }

    set x(value) { this._x = value; }

    set y(value) { this._y = value; }

    set z(value) { this._z = value; }

    get x() { return this._x; }

    get y() { return this._y; }

    get z() { return this._z; }
}