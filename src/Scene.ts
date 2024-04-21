import { Container } from "pixi.js";
import { Protagonist } from "./protagonist";

export class Scene extends Container{
    
    constructor()
    {
        super();

        const prota: Protagonist = new Protagonist();

        this.addChild(prota);
    }
}
