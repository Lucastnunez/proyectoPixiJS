import { Container, Graphics, Rectangle } from "pixi.js";
import { iHitbox } from "./iHitbox";

export class Wall extends Container implements iHitbox{
    private hitbox:Graphics;

    constructor(x:number, y:number, width:number, height:number ){
        super();
        this.hitbox=new Graphics
        this.hitbox.beginFill(0xFF00FF,0.3)
        this.hitbox.drawRect(x,y,width,height);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
        
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

}