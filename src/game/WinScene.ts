import { Text, TextStyle } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { Keyboard } from "../utils/keyboard";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameScene } from "./GameScene";

export class WinScene extends SceneBase{

    private textTimer:number=0;
    private wonText: Text;
    private tryText: Text;

    constructor(){
        super();
        const style = new TextStyle({
            dropShadow: true,
            dropShadowBlur: 18,
            dropShadowDistance: 8,
            fill: "#4694dd",
            fontFamily: "Arial Black",
            fontSize: 102,
            fontWeight: "bold",
            lineJoin: "round",
            stroke: "#383838",
            strokeThickness: 11
        });

        const style2 = new TextStyle({
            dropShadow: true,
            dropShadowBlur: 18,
            dropShadowDistance: 8,
            fill: "#e3e3e3",
            fontFamily: "Courier New",
            fontSize: 37,
            fontStyle: "italic",
            fontWeight: "bold",
            miterLimit: 5,
            stroke: "#1c1c1c",
            strokeThickness: 9
        });

        

        this.wonText=new Text("You won!",style)
        this.wonText.anchor.set(0.5,0.5);
        this.wonText.position.set(WIDTH/2,HEIGHT/2-150)

        this.tryText=new Text("Press enter to play again",style2)
        this.tryText.anchor.set(0.5,0.5);
        this.tryText.position.set(WIDTH/2,HEIGHT/2)

        this.addChild(this.wonText);
        this.addChild(this.tryText);

    }

    public update(_deltaFrame: number, _deltaTime: number): void {
        this.textTimer+=1

        if(this.textTimer>50){
            this.tryText.visible=!this.tryText.visible;
            this.textTimer=0;
        }

        if(Keyboard.map.get("Enter")){
            const scene=new GameScene();
            SceneManager.changeScene(scene);
        }
    }

}