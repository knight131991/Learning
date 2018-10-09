import { CPoint, CVector } from "./object3D.js";

    class SVGCanvas{
        constructor(){
            this._elem = document.createElementNS("http://www.w3.org/2000/svg",'svg');
            this._elem.classList.add('SVGCanvas');
            this._$elem = $(this._elem);
            this._items = [];
            this.bindMouseEvent();
        }

        draw() {
            this._items.forEach((item)=> {
                item.drawTo(this._elem);
            })
        }

        addItem(item) {
            this._items.push(item);
        }

        clearAllItems() {
            this._items = [];
            this._$elem.empty();
        }

        bindMouseEvent() {
            let mousedownPos;
            
            const mousedownEven = (e) => {
                mousedownPos = new CPoint(e.clientX, e.clientY);
                const circle = new SVGRect(mousedownPos.x, mousedownPos.y);
                console.log(circle);
                this.addItem(circle);
                this.draw();
            }

            const mousemoveEvent = (e) => {
                const moveVec = new CVector(e.clientX - mousedownPos.x, e.clientY - mousedownPos.y);
                this._items[this._items.length -1 ].resetGeometry(moveVec);
            }

            this._$elem.mousedown((e) => {
                mousedownEven(e);
                this._$elem.mousemove(mousemoveEvent);
            });


            this._$elem.mouseup((e) => {
                this._$elem.unbind('mousemove', mousemoveEvent);
            })

        }

        appendTo(elem) {
            this._$elem.appendTo(elem);
        }
    }

    class SVGObject{
        constructor() {
            this._elem = null;
        }

        drawTo(elem) {}

        resetGeometry(vec) {}
    }

    class SVGCircle extends SVGObject{
        constructor(cx = 0, cy = 0, r = 5, colorStr = 'red') {
            super();
            this._cx = cx;
            this._cy = cy;
            this._r = r;
            this._colorStr = colorStr;
            this._elem = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this._elem.setAttribute("cx", `${cx}px`);
            this._elem.setAttribute("cy", `${cy}px`);
            this._elem.setAttribute("r", `${r}px`);
            this._elem.setAttribute("fill", colorStr);
            this._$elem = $(this._elem);
        }

        get elem() { return this._elem; }

        get $elem() { return this._$elem; }

        get cx() { return this._cx; }

        get cy() { return this._cy; }

        set cx(val) { 
            this._cx = val; 
            this._elem.setAttribute("cx", `${this._cx}px`);
        }

        set cy(val) {
            this._cy = val;
            this._elem.setAttribute("cy", `${this._cy}px`);}

        resetGeometry(vec) {
            this._r = (vec.length());
            this._elem.setAttribute("r", `${this._r}px`);
        }

        drawTo(elem) {
            this._$elem.appendTo(elem);
        }

    }

    class SVGRect extends SVGObject{
        constructor(x = 0, y = 0, width = 5, height = 5, colorStr = 'blue') {
            super();
            this._x = x;
            this._y = y;
            this._width = width;
            this._height = height;
            this._colorStr = colorStr;
            this._elem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            this._elem.setAttribute("x", `${x}px`);
            this._elem.setAttribute("y", `${y}px`);
            this._elem.setAttribute("width", `${width}px`);
            this._elem.setAttribute("height", `${height}px`);
            this._elem.setAttribute("fill", colorStr);
            this._$elem = $(this._elem);
        }

        get elem() { return this._elem; }

        get $elem() { return this._$elem; }

        resetGeometry(vec) {
            this._width = (vec.x);
            this._height = (vec.y);
            this._elem.setAttribute("width", `${this._width}px`);
            this._elem.setAttribute("height", `${this._height}px`);
        }

        drawTo(elem) {
            this._$elem.appendTo(elem);
        }
    }

    class SVGLine extends SVGObject{
        constructor(x1 = 0, y1 = 0, width = 1, colorStr = 'blue') {
            super();
            this._x1 = x1;
            this._x2 = x1;
            this._y1 = y1;
            this._y2 = y1;
            this._colorStr = colorStr;
            this._elem = document.createElementNS("http://www.w3.org/2000/svg", "line");
            this._elem.setAttribute("x1", `${x1}px`);
            this._elem.setAttribute("y1", `${y1}px`);
            this._elem.setAttribute("x2", `${x1}px`);
            this._elem.setAttribute("y2", `${y1}px`);
            this._elem.setAttribute("stroke-width", `${width}px`);
            this._elem.setAttribute("stroke", colorStr);
            this._$elem = $(this._elem);
        }

        get elem() { return this._elem; }

        get $elem() { return this._$elem; }

        get x1() { return this._x1; }

        get y1() { return this._y1; }

        get x2() { return this._x2; }

        get y2() { return this._y2; }

        set x2(val) {
            this._x2 = val;
            this._elem.setAttribute("x2", `${this._x2}px`);
        }
        
        set y2(val) {
            this._y2 = val;
            this._elem.setAttribute("y2", `${this._y2}px`);}

        resetGeometry(vec) {
            this._x2 = vec.x + this._x1;
            this._y2 = vec.y + this._y1;
            this._elem.setAttribute("x2", `${this._x2}px`);
            this._elem.setAttribute("y2", `${this._y2}px`);
        }

        drawTo(elem) {
            this._$elem.appendTo(elem);
        }
    }

    class SVGMeasureLine extends SVGObject{
        constructor(x1 = 0, y1 = 0, circleR = 5, width = 1, colorStr = 'blue') {
            super();
            this.StartCircle = new SVGCircle(x1, y1, circleR, colorStr);
            this.EndCircle = new SVGCircle(x1, y1, circleR, colorStr);
            this.line = new SVGLine(x1, y1, width, colorStr);
            this._elem = [];
            this._$elem = [];
            this._elem.push(this.StartCircle.elem);
            this._elem.push(this.line.elem);            
            this._elem.push(this.EndCircle.elem);            
            this._$elem.push(this.StartCircle.$elem);
            this._$elem.push(this.line.$elem);
            this._$elem.push(this.EndCircle.$elem);
        }

        get elem() { return this._elem; }

        resetGeometry(vec) {
            this.line.x2 = vec.x + this.line.x1;
            this.line.y2 = vec.y + this.line.y1;
            this.EndCircle.cx = vec.x + this.StartCircle.cx;
            this.EndCircle.cy = vec.y + this.StartCircle.cy;
        }

        drawTo(elem) {
            this._$elem.forEach((item) => {
                item.appendTo(elem);
            })
        }
    }

    const svgCanvas = new SVGCanvas();
    svgCanvas.appendTo(document.body);
