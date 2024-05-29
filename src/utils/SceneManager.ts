import { Ticker } from "pixi.js";
import { app } from ".."
import { SceneBase } from "./SceneBase";

export namespace SceneManager{

    let currentScene:SceneBase; 
    export function initilize(){

        window.dispatchEvent(new Event("resize"));

        Ticker.shared.add(update)
    }

    export function changeScene(newScene:SceneBase){


        if (currentScene!=undefined){
            currentScene.destroy();
        }
        currentScene=newScene
        app.stage.addChild(currentScene);
   }

    function update(frames:number){
        currentScene.update(Ticker.shared.deltaMS, frames);
    }
}