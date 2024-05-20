import { Sprite } from "pixi.js";
import { ContPhysics } from "./ContPhysics";


export class Player extends ContPhysics{

    private sprite: Sprite = Sprite.from("Clampy");
    
    constructor()
    {
        super();

        this.sprite.x =0;
        this.sprite.y =0;   
        this.sprite.scale.set(0.5, 0.5);
        
        this.addChild(this.sprite);
    }

    public walkUp(): void{
        this.sprite.y-=this.speed.y;
        console.log("aaa")
    }

    public walkDown(): void{
        this.sprite.y+=this.speed.y;
        console.log("aaa")
    }

    public walkRight(): void{
        this.sprite.x+=this.speed.x;
    }

    public walkLeft(): void{
        this.sprite.x-=this.speed.x;
    }

    public spawnPlayer(){
        this.x=250
        this.y=250

        this.speed.x=0
        this.speed.y=0
        
    }
}