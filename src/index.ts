import { Application, Assets, Text, TextStyle } from 'pixi.js'
import { GameScene } from './game/GameScene';
import { manifest } from './ui/assets';
import { Keyboard } from './utils/keyboard';
import { SceneManager } from './utils/SceneManager';



export const WIDTH=1920;
export const HEIGHT= 1080;
//960 504 mitad

export const app = new Application<HTMLCanvasElement>({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x3e4347,
    width: WIDTH,
    height: HEIGHT,
});


//document.body.appendChild(app.canvas);
Keyboard.initilize();
window.addEventListener("resize",()=>{
    const scaleY = window.innerHeight / app.screen.height;
    const scaleX = window.innerWidth / app.screen.width;
    const scale = Math.min(scaleX,scaleY);

    const gameHeight = Math.round(app.screen.height * scale);
    const gameWidth = Math.round(app.screen.width * scale);

    const marginV = Math.floor((window.innerHeight - gameHeight)/2);
    const marginH = Math.floor((window.innerWidth - gameWidth)/2);
    
    app.view.style!.height = gameHeight + "px";
    app.view.style!.width = gameWidth + "px";
    
    app.view.style.marginLeft= marginH + "px"
    app.view.style.marginRight = marginH + "px"
    app.view.style.marginTop = marginV + "px"
    app.view.style.marginBottom = marginV + "px"

});

window.dispatchEvent(new Event("resize"));

const style = new TextStyle({
    fontFamily: "Times New Roman",
    fontSize: 35,
    fontWeight: "bold",
    stroke: "#ffffff",
    strokeThickness: 4
});
// const style2 = new TextStyle({
//     dropShadow: true,
//     dropShadowBlur: 18,
//     dropShadowDistance: 8,
//     fill: "#e3e3e3",
//     fontFamily: "Courier New",
//     fontSize: 37,
//     fontStyle: "italic",
//     fontWeight: "bold",
//     miterLimit: 5,
//     stroke: "#1c1c1c",
//     strokeThickness: 9
// });

// const playText= new Text("Press Enter to play!", style2)
// playText.anchor.set(0.5,0.5);
// playText.position.set(WIDTH/2,HEIGHT/2)
// let textTimer=0;
// app.stage.addChild(playText);

// while(!Keyboard.map.get("Enter")){
//     textTimer+=1
//         if(textTimer>50){
//             playText.visible=playText.visible;
//             textTimer=0;
//         }
// }


const text= new Text("Loading...", style)
text.position.set(100,HEIGHT-100)
app.stage.addChild(text)

Assets.init({ manifest }).then(() =>{
    Assets.loadBundle(["AssetsPJ","Map_1", "Hud"]).then(() =>{
        text.destroy();
        const myScene = new GameScene();
        SceneManager.initilize();
        SceneManager.changeScene(myScene);
    });
});


