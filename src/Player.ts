import { Sprite } from "pixi.js";
import { HEIGHT, WIDTH } from ".";
import { ContPhysics } from "./ContPhysics";
import { ExtendedMap } from "./ExtendedMap";
import { GameMisc } from "./GameMisc";
import { Keyboard } from "./keyboard";


export class Player extends ContPhysics{

    private sprite: Sprite = Sprite.from("PlayerIdle1");
    private goals:Map<String,number>=new Map();
    public inventory:ExtendedMap<String,number>=new ExtendedMap();


    constructor()
    {
        super();

        this.sprite.x =0;
        this.sprite.y =0;   
        this.sprite.scale.set(0.18, 0.18);
        this.sprite.anchor.set(0.5,0.5);
        
        this.addChild(this.sprite);
        this.setGoals();

        this.inventory.set("apples",0);
        this.inventory.set("bananas",0);
        this.inventory.set("grapes",0);
        this.inventory.set("lemons",0);
    }

    public override update(deltaMS: number): void {
        super.update(deltaMS/1000);

        if (Keyboard.map.get("ArrowUp") || Keyboard.map.get("KeyW")){
            this.speed.y=-150
        }else{
            if (Keyboard.map.get("ArrowDown") || Keyboard.map.get("KeyS")){
                this.speed.y=150
            }else{
                this.speed.y=0
            }
        }

        if (Keyboard.map.get("ArrowLeft") || Keyboard.map.get("KeyA")){
            this.speed.x=-150
        }else{
            if (Keyboard.map.get("ArrowRight") || Keyboard.map.get("KeyD")){
                this.speed.x=150
            }else{
                this.speed.x=0
            }
        }
        
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
}