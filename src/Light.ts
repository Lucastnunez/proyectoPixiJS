import { Updateable } from "./Updateable";
import { BLEND_MODES, Sprite, Texture, Point } from "pixi.js";

export class Light extends Sprite implements Updateable{

    public speed: Point=new Point();

    constructor(canvas:HTMLCanvasElement){
        
        super(Texture.from(canvas));
        this.blendMode=BLEND_MODES.ADD;

    }


    update(deltaSeconds:number): void {
        this.x+= this.speed.x * deltaSeconds;
        this.y+= this.speed.y * deltaSeconds;
    }

}
