import { Container, Point, Sprite } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { ExtendedMap } from "../utils/ExtendedMap";
import { GameMisc } from "../utils/GameMisc";
import { InteractableObject } from "./InteractableObject";
import { Keyboard } from "../utils/keyboard";
import { Updateable } from "../utils/Updateable";


export class GameMap extends Container implements Updateable{

    public mapNumber: number;
    public mapSprite: Sprite;
    //hitboxes
    //lights
    public appleTrees: Array<InteractableObject>=new Array;
    public bananaTrees: Array<InteractableObject>=new Array;
    public lemonBushes: Array<InteractableObject>=new Array;
    public grapeBushes: Array<InteractableObject>=new Array;

    public treePositions:ExtendedMap<Point,Boolean>;
    public bushesPositions:ExtendedMap<Point,Boolean>;

    private interactingObject:InteractableObject|undefined = undefined;
    
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
        this.mapSprite.scale.set(1.5,1.5);
        this.addChild(this.mapSprite);
        this.treePositions=GameMisc.GetTreePositionsFromMap("map_1");
        this.bushesPositions=GameMisc.GetBushPositionsFromMap("map_1");

        // switch (this.mapNumber){

        // }

    }
    update(): void {
        //ver si se puede updatear el bg del index acá

        if (this.interactingObject!=undefined){

            if (Keyboard.map.get("KeyE")){
                GameMisc.emitEvent(this.interactingObject.action);   
                this.interactingObject.isInteractable(false);
                let index;
                this.interactingObject.sprite.alpha=1.0;

                switch(this.interactingObject.action){
                    case "grab apples":
                        index= this.appleTrees.indexOf(this.interactingObject);
                        this.interactingObject.setSprite("Tree");
                        this.appleTrees.splice(index,1);
                        
                        break;
                    case "grab bananas":
                        index= this.bananaTrees.indexOf(this.interactingObject);
                        this.bananaTrees.splice(index,1);
                        this.interactingObject.setSprite("Tree");
                        break;
                    case "grab grapes":
                        index= this.grapeBushes.indexOf(this.interactingObject);
                        this.grapeBushes.splice(index,1);
                        this.interactingObject.setSprite("bush");
                        break;
                    case "grab lemons":
                        index= this.lemonBushes.indexOf(this.interactingObject);
                        this.lemonBushes.splice(index,1);
                        this.interactingObject.setSprite("bush");
                        break;
                    
                }
                this.interactingObject=undefined
                return;
            }

            if(Math.abs((WIDTH/2)-(this.interactingObject.getGlobalPosition().x))>150||Math.abs((HEIGHT/2)-(this.interactingObject.getGlobalPosition().y))>150){
                this.interactingObject.isInteractable(false)
                this.interactingObject.sprite.alpha=1;
                this.interactingObject=undefined;
                
            }

        }else{

            for(const tree of this.appleTrees){
                if(Math.abs((WIDTH/2)-(tree.getGlobalPosition().x))<150 && Math.abs((HEIGHT/2)-(tree.getGlobalPosition().y))<150){
                    tree.isInteractable(true)
                    this.interactingObject=tree;
                    tree.sprite.alpha=0.8;
                    break;
                }
            }

            for(const tree of this.bananaTrees){
                if(Math.abs((WIDTH/2)-(tree.getGlobalPosition().x))<150 && Math.abs((HEIGHT/2)-(tree.getGlobalPosition().y))<150){
                    tree.isInteractable(true)
                    this.interactingObject=tree;
                    tree.sprite.alpha=0.8;
                    break;
                }
            }
        }
    }


    public generateTrees(goals?:Map<String,number>){

        let positions = this.treePositions.getKeys();
        let totalTrees:number=positions.length-1;
        console.log(positions,"trees");

        if (goals!=undefined){

            let minApples:number;
            let minBanana:number;

            //Se calcula el minimo de arboles que deberia haber para poder completar los objetivos.
            if (goals.get("Bananas")){
                minBanana=goals.get("Bananas")!/4;
                if (minBanana>0 && minBanana<=1) minBanana=1;
                if (minBanana>1 && minBanana<=2) minBanana=2;
                if (minBanana>2 && minBanana<=3) minBanana=3;
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
                const bananaTree = new InteractableObject(Sprite.from("BananaTree"),"grab bananas");
                let coord;
                let random=0;

                //Se obtiene una coord random de la lista de coords de arboles,
                //y se controla que no esté ya ocupado por otro arbol.
                do {                  
                    random=GameMisc.RandomNumberInRange(0,(positions.length-1));
                    coord = positions.at(random)!;
                } while(this.treePositions.get(coord)==false);
                
                //La quita del array de posiciones para que no se vuelva a usar
                positions.splice(random,1)

                if(coord!=undefined) {
                    bananaTree.position.set(coord.x,coord.y);
                    this.treePositions.set(coord,false);
                };
                
                //Lo agrega al array de arboles de bananas
                this.bananaTrees.push(bananaTree);
                this.addChild(bananaTree);
                totalTrees-=1

            }
            //Se crean los minimos arboles necesarios (de manzanas)
            for(let i=0;i<=minApples;i++){

                const appleTree = new InteractableObject(Sprite.from("AppleTree"),"grab apples");
                
                let random=0;
                let coord;

                //Se obtiene una coord random de la lista de coords de arboles,
                //y se controla que no esté ya ocupado por otro arbol.
                do{     
                    random=GameMisc.RandomNumberInRange(0,(positions.length-1));
                    coord = positions.at(random)!;
                }while(this.treePositions.get(coord)==false)

                //La quita del array de posiciones para que no se vuelva a usar
                positions.splice(random,1)

                if(coord!=undefined) {

                    appleTree.position.set(coord.x,coord.y);
                    
                    this.treePositions.set(coord,false);
                };
                
                //Lo agrega al array de arboles de manzanas
                this.appleTrees.push(appleTree);
                this.addChild(appleTree);
                
                
    
                totalTrees-=1
            }

        }

        for(let i=totalTrees; i>0; i--){

            let random=GameMisc.RandomNumberInRange(1,3);
            let coord;
            let tree;

            //Se selecciona un tipo de arbol al azar
            switch(random){
                case 2:
                    tree=new InteractableObject(Sprite.from("AppleTree"),"grab apples");
                    this.appleTrees.push(tree);
                    break;
                case 3:
                    tree=new InteractableObject(Sprite.from("BananaTree"),"grab bananas");
                    this.bananaTrees.push(tree);
                    break; 
                default:
                    tree=Sprite.from("Tree");
                    tree.anchor.set(0.5,0.5);
                    break;
            }
            
            //Selecciona una posicion libre al azar
            do{     
                random=GameMisc.RandomNumberInRange(0,(positions.length-1));
                coord = positions.at(random)!;
            }while(this.treePositions.get(coord)==false)

            //Se elimina la posicion usada
            positions.splice(random,1)

            if(coord!=undefined) {
                tree.position.set(coord.x,coord.y);
                this.treePositions.set(coord,false);
            };

            
            this.addChild(tree);
        }
    }

    public generateBushes(goals?:Map<String,number>){

        let positions = this.bushesPositions.getKeys();
        let totalBushes:number=positions.length-1;
        console.log(positions,"bushes");

        if (goals!=undefined){

            let minGrapes:number;
            let minLemons:number;

            //Se calcula el minimo de arboles que deberia haber para poder completar los objetivos.
            if (goals.get("Lemons")){
                minLemons=goals.get("Lemons")!/4;
                if (minLemons>0 && minLemons<=1) minLemons=1;
                if (minLemons>1 && minLemons<=2) minLemons=2;
                if (minLemons>2 && minLemons<=3) minLemons=3;
                if (minLemons>3 && minLemons<=4) minLemons=4;
                if (minLemons>4 && minLemons<=5) minLemons=5;
            }else{
                minLemons=0;
            }

            if (goals.get("Grapes")){
                minGrapes=goals.get("Grapes")!/4;
                if (minGrapes>0 && minGrapes<=1) minGrapes=1 ;
                if (minGrapes>1 && minGrapes<=2) minGrapes=2 ;
                if (minGrapes>2 && minGrapes<=3) minGrapes=3 ;
                if (minGrapes>3 && minGrapes<=4) minGrapes=4 ;
                if (minGrapes>4 && minGrapes<=5) minGrapes=5 ;
            }else{
                minGrapes=0
            }
            
            

            //Se crean los minimos arboles necesarios (de bananas)
            for(let i=1;i<=minLemons;i++){
                const lemonBush = new InteractableObject(Sprite.from("LemonBush"),"grab lemons");
                let coord;
                let random=0;

                //Se obtiene una coord random de la lista de coords de arboles,
                //y se controla que no esté ya ocupado por otro arbol.
                do {                  
                    random=GameMisc.RandomNumberInRange(0,(positions.length-1));
                    coord = positions.at(random)!;
                } while(this.bushesPositions.get(coord)==false);
                
                //La quita del array de posiciones para que no se vuelva a usar
                positions.splice(random,1)

                if(coord!=undefined) {
                    lemonBush.position.set(coord.x,coord.y);
                    this.bushesPositions.set(coord,false);
                };
                
                //Lo agrega al array de arboles de bananas
                this.lemonBushes.push(lemonBush);
                this.addChild(lemonBush);
                totalBushes-=1

            }
            //Se crean los minimos arboles necesarios (de manzanas)
            for(let i=0;i<=minGrapes;i++){

                const grapeBush = new InteractableObject(Sprite.from("GrapeBush"),"grab grapes");
                
                let random=0;
                let coord;

                //Se obtiene una coord random de la lista de coords de arboles,
                //y se controla que no esté ya ocupado por otro arbol.
                do{     
                    random=GameMisc.RandomNumberInRange(0,(positions.length-1));
                    coord = positions.at(random)!;
                }while(this.bushesPositions.get(coord)==false)

                //La quita del array de posiciones para que no se vuelva a usar
                positions.splice(random,1)

                if(coord!=undefined) {

                    grapeBush.position.set(coord.x,coord.y);
                    
                    this.bushesPositions.set(coord,false);
                };
                
                //Lo agrega al array de arboles de manzanas
                this.appleTrees.push(grapeBush);
                this.addChild(grapeBush);
                
                
    
                totalBushes-=1
            }

        }

        for(let i=totalBushes; i>0; i--){

            let random=GameMisc.RandomNumberInRange(1,3);
            let coord;
            let bush;

            //Se selecciona un tipo de arbol al azar
            switch(random){
                case 2:
                    bush=new InteractableObject(Sprite.from("GrapeBush"),"grab grapes");
                    this.appleTrees.push(bush);
                    break;
                case 3:
                    bush=new InteractableObject(Sprite.from("LemonBush"),"grab lemons");
                    this.bananaTrees.push(bush);
                    break; 
                default:
                    bush=Sprite.from("Bush");
                    bush.anchor.set(0.5,0.5);
                    break;
            }
            
            //Selecciona una posicion libre al azar
            do{     
                random=GameMisc.RandomNumberInRange(0,(positions.length-1));
                coord = positions.at(random)!;
            }while(this.bushesPositions.get(coord)==false)

            //Se elimina la posicion usada
            positions.splice(random,1)

            if(coord!=undefined) {
                bush.position.set(coord.x,coord.y);
                this.bushesPositions.set(coord,false);
            };

            
            this.addChild(bush);
        }
    }
}
