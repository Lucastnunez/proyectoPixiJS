import { Updateable } from "./Updateable";
import { Sprite, Texture, Point, BLEND_MODES } from "pixi.js";

export class Light extends Sprite implements Updateable{

    public speed: Point=new Point();

    constructor(canvas:HTMLCanvasElement){
        
        super(Texture.from(canvas));
        this.anchor.set(0.5,0.5);
        this.blendMode=BLEND_MODES.ADD;

    }


    update(deltaSeconds:number): void {
        this.x+= this.speed.x * deltaSeconds;
        this.y+= this.speed.y * deltaSeconds;
    }

}
