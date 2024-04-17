import { Application, Assets, AssetsManifest, Sprite } from 'pixi.js'

const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

export const manifest:AssetsManifest  = {
    bundles: [
        {
            name : "AssetsPJ",
            assets:
            {
                "Clampy the clamp" : "./clampy.png"
            }
        },
    ]
}

async function init(): Promise<void> {
    // Assets.init must only happen once! 
    // Pack all your bundles into one manifest
    await Assets.init({ manifest: manifest });

    // Load the bundles you need
    await Assets.loadBundle("AssetsPJ")
    console.log("hola0")
}

console.log("hola1")
const clampy= new Sprite(Assets.get("Clampy the clamp"))
console.log("hola2")
clampy.anchor.set(0.5);
clampy.x
clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;

app.stage.addChild(clampy);

