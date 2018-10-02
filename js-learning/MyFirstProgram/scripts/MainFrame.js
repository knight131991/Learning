import { CPoint } from "./object3D.js";

class JButtonCreator{
    constructor(name, className){
        this._$button = jQuery('<button></button>');
        this._$button.text(name);
        this._$button.addClass(className);
    }

    registerSpecifyEventAndName(url){
        const func = ()=>{
            document.getElementById("myiframe").src = url;
        }
          this._$button.on("click", func);
    }

    get $button(){
        return this._$button;
    }

}

class JLabelCreator{
    constructor(text){
        this._$label = jQuery('<h3></h3>');
        this._$label.text(text);
    }

    get $label(){
        return this._$label;
    }
}


const label_animation = new JLabelCreator('Animation Example');
const label_experiment = new JLabelCreator('Experiments');

const button1 = new JButtonCreator('Animation Sample 1', 'mybutton');
const button2 = new JButtonCreator('Animation Sample 2', 'mybutton');
const button_magnifier = new JButtonCreator('Magnifier', 'mybutton');
const button_magnifier2 = new JButtonCreator('Magnifier for mutiple images', 'mybutton');
button1.registerSpecifyEventAndName("AnimationSimple1.html");
button2.registerSpecifyEventAndName("AnimationSimple2.html");
button_magnifier.registerSpecifyEventAndName("Magnifier.html");
button_magnifier2.registerSpecifyEventAndName("Magnifier2.html");

$('nav').append(label_animation.$label);
$('nav').append(button1.$button);
$('nav').append(button2.$button);
$('nav').append(label_experiment.$label);
$('nav').append(button_magnifier.$button);
$('nav').append(button_magnifier2.$button);



const pt = new CPoint(10, 2, 30);
console.log('pt', pt.x, pt.y, pt.z);