import { Container, Sprite } from "pixi.js";

export class InteractableObject extends Container{

    private interactable=true;
    public sprite=new Sprite();
    public action:String="do";

    constructor(sprite:Sprite, action:String){
        super()

        this.sprite=sprite;
        this.sprite.anchor.set(0.5,0.5);
        this.addChild(this.sprite);

        this.action=action;
    }

    interact(){
        if (this.interactable){

        }
    }
    
    isInteractable(bool:boolean){
        this.interactable=bool;
    }
}