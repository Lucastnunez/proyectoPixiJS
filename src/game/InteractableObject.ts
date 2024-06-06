import { Container, Sprite, Texture } from "pixi.js";

export class InteractableObject extends Container{

    private interactable=true;
    public sprite=new Sprite();
    public action:string="do";
    

    constructor(sprite:Sprite, actionEvent:string){
        super()

        this.sprite=sprite;
        this.sprite.anchor.set(0.5,0.5);
        this.addChild(this.sprite);
        
        this.action=actionEvent;
    }

    interact(){
        if (this.interactable){

        }
    }
    
    isInteractable(bool:boolean){
        this.interactable=bool;
    }

    setSprite(sprite:string){
        this.sprite.texture=Texture.from(sprite);
    }
}