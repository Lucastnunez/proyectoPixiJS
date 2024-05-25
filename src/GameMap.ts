import { Container, Sprite } from "pixi.js";
import { HEIGHT, WIDTH } from ".";


export class GameMap extends Container{

    mapNumber: number;
    mapSprite: Sprite;

    constructor(number:number){
        super();

        // if (number=="Random"){
            
        // }
        
        if (number!=1){
            this.mapNumber=1;
        }else{
            this.mapNumber=number;
        };

        this.mapSprite=Sprite.from("Test");
        this.mapSprite.x=WIDTH/2
        this.mapSprite.y=HEIGHT/2
        
        // switch (this.mapNumber){

        // }

    }
}
