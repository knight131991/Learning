!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);class i{constructor(t=0,e=0,s=0){this._x=t,this._y=e,this._z=s}get x(){return this._x}get y(){return this._y}get z(){return this._z}}class r{constructor(t=0,e=0,s=0){this._x=t,this._y=e,this._z=s}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z)}set x(t){this._x=t}set y(t){this._y=t}set z(t){this._z=t}get x(){return this._x}get y(){return this._y}get z(){return this._z}}class n{constructor(){this._elem=null}drawTo(t){}resetGeometry(t){}}class h extends n{constructor(t=0,e=0,s=5,i=5,r="blue"){super(),this._x=t,this._y=e,this._width=s,this._height=i,this._colorStr=r,this._elem=document.createElementNS("http://www.w3.org/2000/svg","rect"),this._elem.setAttribute("x",`${t}px`),this._elem.setAttribute("y",`${e}px`),this._elem.setAttribute("width",`${s}px`),this._elem.setAttribute("height",`${i}px`),this._elem.setAttribute("fill",r),this._$elem=$(this._elem)}get elem(){return this._elem}get $elem(){return this._$elem}resetGeometry(t){this._width=t.x,this._height=t.y,this._elem.setAttribute("width",`${this._width}px`),this._elem.setAttribute("height",`${this._height}px`)}drawTo(t){this._$elem.appendTo(t)}}(new class{constructor(){this._elem=document.createElementNS("http://www.w3.org/2000/svg","svg"),this._elem.classList.add("SVGCanvas"),this._$elem=$(this._elem),this._items=[],this.bindMouseEvent()}draw(){this._items.forEach(t=>{t.drawTo(this._elem)})}addItem(t){this._items.push(t)}clearAllItems(){this._items=[]}bindMouseEvent(){let t;const e=e=>{t=new i(e.clientX,e.clientY);const s=new h(t.x,t.y);console.log(s),this.addItem(s),this.draw()},s=e=>{const s=new r(e.clientX-t.x,e.clientY-t.y);this._items[this._items.length-1].resetGeometry(s)};this._$elem.mousedown(t=>{e(t),this._$elem.mousemove(s)}),this._$elem.mouseup(t=>{this._$elem.unbind("mousemove",s)})}appendTo(t){this._$elem.appendTo(t)}}).appendTo(document.body)}]);