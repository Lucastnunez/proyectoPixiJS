import { Container, Sprite } from "pixi.js";

export class InventoryObject extends Container{

    public sprite;
    public objectName;

    constructor(name:"String",sprite:Sprite){
        super()
        this.sprite=sprite;
        this.objectName=name;
    }
}