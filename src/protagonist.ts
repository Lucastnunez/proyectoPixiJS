import { Container, Sprite } from "pixi.js";

export class Protagonist extends Container{

    public prota: Sprite = Sprite.from("Clampy");

    constructor()
    {
        super();

        

        this.prota.x =0;
        this.prota.y =0;   
        this.prota.scale.set(0.5, 0.5);

        this.addChild(this.prota);
    }

    public walkUp(): void{
        this.prota.y=this.prota.y-1;
        console.log("aaa")
    }

    public walkDown(): void{
        this.prota.y=this.prota.y+1;
        console.log("aaa")
    }

    public walkRight(): void{
        this.prota.x=this.prota.x+1;
    }

    public walkLeft(): void{
        this.prota.x=this.prota.x-1;
    }
}