import { Container, Sprite } from "pixi.js";

export class InteractableObject extends Container{

    private interactable=true;
    public sprite=new Sprite();
    

    constructor(sprite:Sprite){
        super()
        this.sprite=sprite;
        this.sprite.anchor.set(0.5,0.5);
        this.addChild(this.sprite);
    }

    interact(){
        if (this.interactable){

        }
    }
}