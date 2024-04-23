import { Application, Assets } from 'pixi.js'
import { manifest } from './assets';
import { Keyboard } from './keyboard';
import { Scene } from './Scene';


const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

Keyboard.initilize();
window.addEventListener("resize",()=>{
    const scaleY = window.innerHeight / app.screen.height;
    const scaleX = window.innerWidth / app.screen.width;
    const scale = Math.min(scaleX,scaleY);

    const gameHeight = Math.round(app.screen.height + scale);
    const gameWidth = Math.round(app.screen.width + scale);

    const marginV = Math.floor((window.innerHeight - gameHeight)/2);
    const marginH = Math.floor((window.innerWidth - gameWidth)/2);
    

    app.view.style.height = gameHeight + "px";
    app.view.style.width = gameWidth + "px";

    app.view.style.marginLeft = marginH + "px"
    app.view.style.marginRight = marginH + "px"
    app.view.style.marginTop = marginV + "px"
    app.view.style.marginBottom = marginV + "px"

});

window.dispatchEvent(new Event("resize"));

Assets.init({ manifest }).then(() =>{
    Assets.loadBundle("AssetsPJ").then(() =>{
        const myScene = new Scene();
        app.stage.addChild(myScene);
    });
});


