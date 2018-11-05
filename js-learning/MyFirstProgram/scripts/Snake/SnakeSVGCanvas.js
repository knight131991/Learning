import   SVGCanvas, { SVGObject, SVGRect }  from "../SVGCanvas_temp";
import { CPoint } from "../object3D";

class SnakeSVGCanvas extends SVGCanvas {
    constructor(unitSize) {
        super();
        this.unitSize = unitSize;
        this.snake = new SVGSnake(20, 20, unitSize);
        this.apple = new SVGRect(60, 60, unitSize, unitSize, 'blueviolet');
        this._items.push(this.snake);
        this._items.push(this.apple);
        this.draw();
    }

    prependTo(elem) {
        this._$elem.prependTo(elem);
    }

    initial(applePos) {
        this.snake.startRect.x = 20;
        this.snake.startRect.y = 20;
        for(let i = 5; i < this.snake._units.length; i += 1) {
            delete this.snake._units[i];
        }
        this.snake._units.length = 5;
        this.apple.resetPos(applePos);

        this.clearAllItems();
        this._items.push(this.snake);
        this._items.push(this.apple);
        this.draw();
    }

    SVGSnakeMove(x, y) {
        this.snake.move(x, y);
    }

    snakeHeadPos() {
        return this.snake.firstElemPos();
    }

    snakePos() {
        return this.snake.allElemPos();
    }

    resetApplePos(pos) {
        this.apple.resetPos(pos);
    }

    increaseSnake(time) {
        for(let i = 0; i < time; i += 1) {
            this.snake.addUnit();
        }
    }

    width() {
        return this._$elem.width();
    }

    height() {
        return this._$elem.height();
    }
    
    bindMouseEvent() {}

}

class SVGSnake extends SVGObject {
    constructor(x = 0, y = 0, space = 5, colorStr = 'blue') {
        super();
        this.startRect = new SVGRect(x, y, space, space, colorStr);
        this.space = space;
        this._units = [];
        this._units.push(this.startRect); 
        this._units.push(new SVGRect(x - space, y, space, space, colorStr));
        this._units.push(new SVGRect(x - space, y, space, space, colorStr));
        this._units.push(new SVGRect(x - space, y, space, space, colorStr));
        this._units.push(new SVGRect(x - space, y, space, space, colorStr));

    }

    move(x, y) {
        for(let i = this._units.length - 1; i > 0; i -= 1) {
            const previous = i - 1;
            //console.log('possss', this._units[previous].getPos());
            this._units[i].resetPos(this._units[previous].getPos());
        }

        const posX = this.startRect.x + x;
        const posY = this.startRect.y + y;
        this.startRect.resetPos(new CPoint(posX, posY));
    }

    addUnit() {
        const space = this.space;
        const lastUnit = this._units[this._units.length - 1];
        const unitX = parseInt(lastUnit.x / space, 10) * space;
        const unitY = parseInt(lastUnit.y / space, 10) * space;
        const unit = new SVGRect(unitX, unitY, space, space);
        this._units.push(unit);
    }

    drawTo(elem) {
        this._units.forEach((item) => {
            item.$elem.appendTo(elem);
        })
    }

    firstElemPos() {
        return new CPoint(this.startRect.x, this.startRect.y);
    }

    allElemPos() {
        const result = this._units.map(element => element.getPos());
        return result;
    }
}

export default SnakeSVGCanvas;