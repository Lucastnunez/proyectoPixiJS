import { Container } from "pixi.js";
import { Keyboard } from "./keyboard";
import { Protagonist } from "./protagonist";

export class Scene extends Container{
    
    constructor()
    {
        super();

        const prota: Protagonist = new Protagonist();

        this.addChild(prota);

        Keyboard.down.on("ArrowUp", prota.walkUp, prota);
        Keyboard.down.on("KeyW", prota.walkUp, prota);

        Keyboard.down.on("ArrowDown", prota.walkDown, prota);
        Keyboard.down.on("KeyS", prota.walkDown, prota);

        Keyboard.down.on("ArrowRight", prota.walkRight, prota);
        Keyboard.down.on("KeyD", prota.walkRight, prota);

        Keyboard.down.on("ArrowLeft", prota.walkLeft, prota);
        Keyboard.down.on("KeyA", prota.walkLeft, prota);
    }
}
