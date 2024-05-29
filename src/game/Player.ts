import { Graphics, Rectangle, Texture } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { ContPhysics } from "../game/ContPhysics";
import { ExtendedMap } from "../utils/ExtendedMap";
import { GameMisc } from "../utils/GameMisc";
import { Keyboard } from "../utils/keyboard";
import { iHitbox } from "./iHitbox";
import { StateAnimation } from "./StateAnimation";


export class Player extends ContPhysics implements iHitbox{

    private sprite =new StateAnimation();

    private goals:Map<String,number>=new Map();
    public inventory:ExtendedMap<String,number>=new ExtendedMap();
    private hitbox: Graphics;


    constructor()
    {
        super();

        this.sprite.addState("Idle",
        [
            Texture.from("PlayerIdle1"),   
            Texture.from("PlayerIdle3"),  
            Texture.from("PlayerIdle2")
        ],
        0.006,true);

        this.sprite.addState("Bottom",
        [
            Texture.from("PlayerIdle1"),
            Texture.from("PlayerBottom2"),
            Texture.from("PlayerBottom3"),   
            Texture.from("PlayerBottom4"),  
            Texture.from("PlayerBottom3"),  
            Texture.from("PlayerBottom2"),
            Texture.from("PlayerIdle1"),
            Texture.from("PlayerBottom5"), 
            Texture.from("PlayerBottom6"),
            Texture.from("PlayerBottom1"),
            Texture.from("PlayerBottom6"),
            Texture.from("PlayerBottom5"),
            Texture.from("PlayerBottom6"),
        ],
        0.008,true);

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
        0.008,true);

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
        0.008,true);

        this.sprite.addState("Back",
        [
         Texture.from("PlayerBack1"),   
         Texture.from("PlayerBack2"),  
         Texture.from("PlayerBack3"),  
         Texture.from("PlayerBack4"),
         Texture.from("PlayerBack3"),  
         Texture.from("PlayerBack2"),  
         Texture.from("PlayerBack1"),  
         Texture.from("PlayerBack5"), 
         Texture.from("PlayerBack6"),
         Texture.from("PlayerBack7"),
         Texture.from("PlayerBack6"),
         Texture.from("PlayerBack5"),
         Texture.from("PlayerBack1")  
        ],
        0.008,true);

        this.sprite.playState("Idle");

        this.sprite.scale.set(0.18, 0.18);
        this.sprite.pivot.set(0.5,0.5);
    
        this.hitbox=new Graphics()
        this.hitbox.beginFill(0xFF00FF,0.3);
        this.hitbox.drawRect(-50,45,100,40);
        this.hitbox.endFill();
        this.hitbox.visible=false

        this.addChild(this.sprite);
        this.addChild(this.hitbox);
        
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
            if (this.sprite.getCurrentName()!="Back") this.sprite.playState("Back");
            console.log(this.sprite.getCurrentName())
            this.speed.y=-100
        }else{
            if (Keyboard.map.get("ArrowDown") || Keyboard.map.get("KeyS")){
                if (this.sprite.getCurrentName()!="Bottom") this.sprite.playState("Bottom");
                this.speed.y=100
            }else{
                //this.sprite.setCurrentSpeed(0)
                this.speed.y=0
            }
        }

        if (Keyboard.map.get("ArrowLeft") || Keyboard.map.get("KeyA")){
            if (this.sprite.getCurrentName()!="Left") this.sprite.playState("Left");
            this.speed.x=-100
        }else{
            if (Keyboard.map.get("ArrowRight") || Keyboard.map.get("KeyD")){
                if (this.sprite.getCurrentName()!="Right") this.sprite.playState("Right");
                this.speed.x=100
            }else{
                //this.sprite.setCurrentSpeed(0)
                this.speed.x=0
            }
        }
        if (this.speed.x==0 && this.speed.y==0){
            this.sprite.playState("Idle");
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

    public getHitbox():Rectangle{
        return this.hitbox.getBounds();
    }

}