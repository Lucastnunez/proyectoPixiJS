import { Texture } from "pixi.js";
import { HEIGHT, WIDTH } from ".";
import { ContPhysics } from "./ContPhysics";
import { ExtendedMap } from "./ExtendedMap";
import { GameMisc } from "./GameMisc";
import { Keyboard } from "./keyboard";
import { StateAnimation } from "./StateAnimation";


export class Player extends ContPhysics{

    private sprite =new StateAnimation();
    private goals:Map<String,number>=new Map();
    public inventory:ExtendedMap<String,number>=new ExtendedMap();


    constructor()
    {
        super();

        this.sprite.addState("Idle",
        [
         Texture.from("PlayerIdle1"),   
         Texture.from("PlayerIdle2"),  
         Texture.from("PlayerIdle3"),  
         Texture.from("PlayerIdle4")  
        ],
        1,true);

        this.sprite.addState("Left",
        [
         Texture.from("PlayerLeft1"),   
         Texture.from("PlayerLeft2"),  
         Texture.from("PlayerLeft3"),  
         Texture.from("PlayerLeft4"),
         Texture.from("PlayerLeft5"), 
         Texture.from("PlayerLeft6"),
         Texture.from("PlayerLeft7")
        ],
        1,true);

        this.sprite.addState("Right",
        [
         Texture.from("PlayerRight1"),   
         Texture.from("PlayerRight2"),  
         Texture.from("PlayerRight3"),  
         Texture.from("PlayerRight4"),
         Texture.from("PlayerRight5"), 
         Texture.from("PlayerRight6"),
         Texture.from("PlayerRight7")
        ],
        1,true);

        this.sprite.addState("Back",
        [
         Texture.from("PlayerBack1"),   
         Texture.from("PlayerBack2"),  
         Texture.from("PlayerBack3"),  
         Texture.from("PlayerBack4"),
         Texture.from("PlayerBack5"), 
         Texture.from("PlayerBack6"),
         Texture.from("PlayerBack7")
        ],
        1,true);

        this.sprite.playState("Idle");

        // this.sprite.x =0;
        // this.sprite.y =0;   
        // this.sprite.scale.set(0.18, 0.18);
        // this.sprite.anchor.set(0.5,0.5);
        
        this.addChild(this.sprite);
        this.setGoals();

        this.inventory.set("Apples",0);
        this.inventory.set("Bananas",0);
        this.inventory.set("Grapes",0);
        this.inventory.set("Lemons",0);
        GameMisc.event.on("grab apples",this.grabApple,this);
        GameMisc.event.on("grab bananas",this.grabBanana,this);
        GameMisc.event.on("grab grapes",this.grabGrape,this);
        GameMisc.event.on("grab lemons",this.grabLemon,this);
    }

    public override update(deltaMS: number): void {
        super.update(deltaMS/1000);

        if (Keyboard.map.get("ArrowUp") || Keyboard.map.get("KeyW")){
            this.sprite.playState("Back");
            this.speed.y=-150
        }else{
            if (Keyboard.map.get("ArrowDown") || Keyboard.map.get("KeyS")){
                this.sprite.playState("Idle");
                this.speed.y=150
            }else{
                this.speed.y=0
            }
        }

        if (Keyboard.map.get("ArrowLeft") || Keyboard.map.get("KeyA")){
            this.sprite.playState("Left");
            this.speed.x=-150
        }else{
            if (Keyboard.map.get("ArrowRight") || Keyboard.map.get("KeyD")){
                this.sprite.playState("Right");
                this.speed.x=150
            }else{
                this.speed.x=0
            }
        }
        
        this.sprite.update(deltaMS);
    }

    public spawnPlayer(){
        
        this.x=WIDTH/2
        this.y=HEIGHT/2

        this.speed.x=0
        this.speed.y=0
        
    }

    private setGoals(){
        
        this.goals.set("Apples",GameMisc.RandomNumberInRange(0,10));
        this.goals.set("Lemons",GameMisc.RandomNumberInRange(0,10));
        this.goals.set("Bananas",GameMisc.RandomNumberInRange(0,10));
        this.goals.set("Grapes",GameMisc.RandomNumberInRange(0,10));

        while (this.goals.get("Apples")!+this.goals.get("Lemons")!+this.goals.get("Bananas")!+this.goals.get("Grapes")!<5){
            this.goals.set("Apples",GameMisc.RandomNumberInRange(0,10));
            this.goals.set("Lemons",GameMisc.RandomNumberInRange(0,10));
            this.goals.set("Bananas",GameMisc.RandomNumberInRange(0,10));
            this.goals.set("Grapes",GameMisc.RandomNumberInRange(0,10));
        }
    }
    public getGoals():Map<String,number> {
        return this.goals;
    }

    public grabApple(){
        let fruit=this.inventory.get("Apples")
        if(fruit!=undefined){
            fruit+=GameMisc.RandomNumberInRange(4,6);;
            this.inventory.set("Apples",fruit);
        }
            
        console.log("You grabbed some apples!",this.inventory.get("Apples"))
    }

    public grabBanana(){
        let fruit=this.inventory.get("Bananas")
        if(fruit!=undefined){
            fruit+=GameMisc.RandomNumberInRange(4,6);
            this.inventory.set("Bananas",fruit);
        }
            
        console.log("You grabbed some bananas!",this.inventory.get("Bananas"))
    }

    public grabGrape(){
        let fruit=this.inventory.get("Grapes")
        if(fruit!=undefined){
            fruit+=GameMisc.RandomNumberInRange(4,6);
            this.inventory.set("Grapes",fruit);
        }
            
        console.log("You grabbed some grapes!",this.inventory.get("Grapes"))
    }

    public grabLemon(){
        let fruit=this.inventory.get("Lemons")
        if(fruit!=undefined){
            fruit+=GameMisc.RandomNumberInRange(4,6);
            this.inventory.set("Lemons",fruit);
        }
            
        console.log("You grabbed some lemons!",this.inventory.get("Lemons"))
    }

}