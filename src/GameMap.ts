import { Container, Point, Sprite } from "pixi.js";
import { HEIGHT, WIDTH } from ".";
import { ExtendedMap } from "./ExtendedMap";
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
    public treePositions:ExtendedMap<Point,Boolean>;
    
    
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
        this.mapSprite.scale.set(3.2,3.2);
        this.addChild(this.mapSprite);
        this.treePositions=GameMisc.GetTreePositionsFromMap("map_1");
        
        // switch (this.mapNumber){

        // }

    }


    public generateTrees(goals?:Map<String,number>){

        let totalTrees:number=this.treePositions.getKeys().length-1;

        if (goals){

            let minApples:number;
            let minBanana:number;
            


            //Se calcula el minimo de arboles que deberia haber para poder completar los objetivos.
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
                if (minApples>0 && minApples<1) minApples=1 ;
                if (minApples>1 && minApples<2) minApples=2 ;
                if (minApples>2 && minApples<3) minApples=3 ;
            }else{
                minApples=0
            }
            
            //Se crean los minimos arboles necesarios (de bananas)
            for(let i=1;i<=minBanana;i++){

                let flag=true;
                let bananaTree = new InteractableObject(Sprite.from("AppleTree"));
                let positions = this.treePositions.getKeys();
                let coord;

                //se obtiene una coord random de la lista de coords de arboles,
                //y se controla que no esté ya ocupado por otro arbol.
                while(flag){
                    
                    coord = positions.at(GameMisc.RandomNumberInRange(0,(positions.length-1)))!;
                    if (this.treePositions.get(coord)==true){
                        flag=false;
                    }
                }

                if(coord!=undefined) {
                    bananaTree.position.set(coord.x,coord.y);
                    this.treePositions.set(coord,false);
                };
                
                this.bananaTrees.push(bananaTree);
                bananaTree.sprite.scale.set(0.3,0.3);
                this.addChild(bananaTree.sprite);
                totalTrees-=1

            }
            //Se crean los minimos arboles necesarios (de manzanas)
            for(let i=0;i<=minApples;i++){

                let flag=true;
                let appleTree = new InteractableObject(Sprite.from("AppleTree"));
                let positions = this.treePositions.getKeys();
                let coord;

                //se obtiene una coord random de la lista de coords de arboles,
                //y se controla que no esté ya ocupado por otro arbol.
                while(flag){
                    
                    coord = positions.at(GameMisc.RandomNumberInRange(0,(positions.length-1)))!;
                    
                    if (this.treePositions.get(coord)==true){
                        flag=false;
                    }
                }

                if(coord!=undefined) {
                    appleTree.position.set(coord.x,coord.y);
                    this.treePositions.set(coord,false);
                };
                
                
                this.appleTrees.push(appleTree);
                this.addChild(appleTree.sprite);
                appleTree.sprite.scale.set(0.3,0.3);
    
                totalTrees-=1
            }

        }

        for(let i=totalTrees; i>0; i--){
        }
    }
}
