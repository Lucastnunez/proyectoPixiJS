import { Container, Sprite } from "pixi.js";
import { HEIGHT, WIDTH } from ".";
import { GameMisc } from "./GameMisc";
import { InteractableObject } from "./InteractableObject";


export class GameMap extends Container{

    public mapNumber: number;
    public mapSprite: Sprite;
    //hitboxes
    //lights
    public appleTrees:Array<InteractableObject>= [];
    public bananaTrees:Array<InteractableObject>= [];
    public lemonBushes= [];
    public grapeBushes= [];
    public treePositions;
    
    
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
        this.mapSprite.x=WIDTH/2;
        this.mapSprite.y=HEIGHT/2;

        this.treePositions=GameMisc.GetTreePositionsFromMap("map_1");
        
        // switch (this.mapNumber){

        // }

    }

    generateTrees(goals?:Map<String,number>){

        if (goals){

            let minApples:number;
            let minBanana:number;

            if (goals.get("Bananas")){
                minBanana=goals.get("Bananas")!/4;
                if (minBanana>0 && minBanana<1){ minBanana=1 };
                if (minBanana>1 && minBanana<2){ minBanana=2 };
                if (minBanana>2 && minBanana<3){ minBanana=3 };
            }else{
                minBanana=0;
            }

            if (goals.get("Apples")){
                minApples=goals.get("Apples")!/4;
                if (minApples>0 && minApples<1){ minApples=1 };
                if (minApples>1 && minApples<2){ minApples=2 };
                if (minApples>2 && minApples<3){ minApples=3 };
            }else{
                minApples=0
            }
            
            for(let i=0;i<=minBanana){
                const bananaT= new InteractableObject();
                const positions = this.treePositions.keys;
                const pos=GameMisc.RandomNumberInRange(0,(positions.length))
                //positions.
                this.bananaTrees.
                bananaT.position.set()
                this.bananaTrees.push(bananaT);

            }

        }


    }
}
