class buttonCreater{
    constructor(name){
        this.name = name;
        this.element = jQuery('<button></button>');
        this.element.text(name);
        return this.element;
    };

};

let button1 = new buttonCreater('click me!!');
$('nav').append(button1);