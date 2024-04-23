import { utils } from "pixi.js";

export class Keyboard {

    public static readonly map: Map<string,boolean> =new Map();
    public static readonly down: utils.EventEmitter = new utils.EventEmitter();
    public static bool: boolean = false;

    private constructor(){};

    public static initilize(){
        if (this.bool){
            return;
        }
        
        this.bool=true;
        document.addEventListener("keydown", Keyboard.keyPressed);

    }

    public static keyPressed(event:KeyboardEvent){
        Keyboard.map.set(event.code, true);
        Keyboard.down.emit(event.code);
    }


}