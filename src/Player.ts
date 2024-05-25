import { Sprite } from "pixi.js";
import { HEIGHT, WIDTH } from ".";
import { ContPhysics } from "./ContPhysics";
import { GameMisc } from "./GameMisc";
import { Keyboard } from "./keyboard";


export class Player extends ContPhysics{

    private sprite: Sprite = Sprite.from("Clampy");
    private goals:Map<String,number>=new Map();


    constructor()
    {
        super();

        this.sprite.x =0;
        this.sprite.y =0;   
        this.sprite.scale.set(0.5, 0.5);
        this.sprite.anchor.set(0.5,0.5);
        
        this.addChild(this.sprite);
        this.setGoals();
    }

    public override update(deltaMS: number): void {
        super.update(deltaMS/1000);

        if (Keyboard.map.get("ArrowUp") || Keyboard.map.get("KeyW")){
            this.speed.y=-20
        }else{
            if (Keyboard.map.get("ArrowDown") || Keyboard.map.get("KeyS")){
                this.speed.y=20
            }else{
                this.speed.y=0
            }
        }

        if (Keyboard.map.get("ArrowLeft") || Keyboard.map.get("KeyA")){
            this.speed.x=-20
        }else{
            if (Keyboard.map.get("ArrowRight") || Keyboard.map.get("KeyD")){
                this.speed.x=20
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
        
        this.goals.set("Apples",Math.floor(GameMisc.RandomNumberInRange(0,10)));
        this.goals.set("Lemons",Math.floor(GameMisc.RandomNumberInRange(0,10)));
        this.goals.set("Bananas",Math.floor(GameMisc.RandomNumberInRange(0,10)));
        this.goals.set("Grapes",Math.floor(GameMisc.RandomNumberInRange(0,10)));

        while (this.goals.get("Apples")!+this.goals.get("Lemons")!+this.goals.get("Bananas")!+this.goals.get("Grapes")!<5){
            this.goals.set("Apples",Math.floor(GameMisc.RandomNumberInRange(0,10)));
            this.goals.set("Lemons",Math.floor(GameMisc.RandomNumberInRange(0,10)));
            this.goals.set("Bananas",Math.floor(GameMisc.RandomNumberInRange(0,10)));
            this.goals.set("Grapes",Math.floor(GameMisc.RandomNumberInRange(0,10)));
        }
1    }
    getGoals() {
        return this.goals;
    }
}