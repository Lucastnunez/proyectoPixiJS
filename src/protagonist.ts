import { Container, Sprite } from "pixi.js";

export class Protagonist extends Container{

    constructor()
    {
        super();

        const prota: Sprite = Sprite.from("Clampy");

        prota.x =0;
        prota.y =0;   
        prota.scale.set(0.5, 0.5)

        this.addChild(prota);
    }

}