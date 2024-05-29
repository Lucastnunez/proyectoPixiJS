import { Assets, Text, TextStyle, Ticker } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { manifest } from "../ui/assets";
import { Keyboard } from "../utils/keyboard";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { GameScene } from "./GameScene";

export class StartMenuScene extends SceneBase{
    private textTimer: number=0;
    private playText: any;
    private style = new TextStyle({
        fontFamily: "Times New Roman",
        fontSize: 35,
        fontWeight: "bold",
        stroke: "#ffffff",
        strokeThickness: 4
    });

    constructor(){
        super()
        
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
        
        this.playText= new Text("Press Enter to play!", style2)
        this.playText.anchor.set(0.5,0.5);
        this.playText.position.set(WIDTH/2,HEIGHT/2)
        this.textTimer=0;
        this.addChild(this.playText);
        

    }

    public update(): void {
        this.textTimer+=1
        
        if(this.textTimer>50){
            this.playText.visible=!this.playText.visible;
            this.textTimer=0;
        }

        if(Keyboard.map.get("Enter")){
            Ticker.shared.stop();
            this.playText.destroy()

            const text= new Text("Loading...", this.style)
            text.position.set(100,HEIGHT-100)
            this.addChild(text);

            Assets.init({ manifest }).then(() =>{
                Assets.loadBundle(["AssetsPJ","Map_1", "Hud"]).then(() =>{
                    text.destroy();
                    const myScene = new GameScene();
                    SceneManager.initilize();
                    Ticker.shared.start;
                    SceneManager.changeScene(myScene);
                });
            });
        }
    }

}