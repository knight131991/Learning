class JButtonCreator{
    constructor(name, className){
        this._$button = jQuery('<button></button>');
        this._$button.text(name);
        this._$button.addClass(className);
    }

    registerSpecifyEvent(url){
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

const label1 = new JLabelCreator('Animation Example');

const button1 = new JButtonCreator('Animation Sample 1', 'mybutton');
button1.registerSpecifyEvent("AnimationSimple1.html");

$('nav').append(label1.$label);
$('nav').append(button1.$button);
