import { Application, Ticker } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { SceneBase } from "./SceneBase";

export namespace SceneManager{

    let currentScene:SceneBase; 
    export let app: Application<HTMLCanvasElement>;

    export function initilize(){

        app = new Application<HTMLCanvasElement>({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x3e4347,
            width: WIDTH,
            height: HEIGHT,
        });

        window.addEventListener("resize",()=>{
            const scaleY = window.innerHeight / app.screen.height;
            const scaleX = window.innerWidth / app.screen.width;
            const scale = Math.min(scaleX,scaleY);

            const gameHeight = Math.round(app.screen.height * scale);
            const gameWidth = Math.round(app.screen.width * scale);

            const marginV = Math.floor((window.innerHeight - gameHeight)/2);
            const marginH = Math.floor((window.innerWidth - gameWidth)/2);
            
            SceneManager.app.view.style!.height = gameHeight + "px";
            app.view.style!.width = gameWidth + "px";
            
            app.view.style.marginLeft= marginH + "px"
            app.view.style.marginRight = marginH + "px"
            app.view.style.marginTop = marginV + "px"
            app.view.style.marginBottom = marginV + "px"

        });

        window.dispatchEvent(new Event("resize"));
        Ticker.shared.add(update)
    }

    export function changeScene(newScene:SceneBase){


        if (currentScene!=undefined){
            currentScene.destroy();
            console.log("destroyed.")
        }
        currentScene=newScene
        app.stage.addChild(currentScene);
   }

    function update(frames:number){
        currentScene.update(Ticker.shared.deltaMS, frames);
    }
}