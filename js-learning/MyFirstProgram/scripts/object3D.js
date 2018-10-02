export class CPoint {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x() { return this._x;}

    get y() { return this._y;}

    get z() { return this._z;}

}