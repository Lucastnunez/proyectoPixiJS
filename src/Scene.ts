import { Container, Sprite, BLEND_MODES, RenderTexture, Texture } from "pixi.js";
import { ContPhysics } from "./ContPhysics";
import { Keyboard } from "./keyboard";
import { Player } from "./Player";
import { Updateable } from "./Updateable";
import { WIDTH, HEIGHT, app } from "./index";
import { Light } from "./Light";

export class Scene extends Container implements Updateable{

    private physicsProta: ContPhysics = new ContPhysics();
    private prota: Player = new Player();
    private bg: Sprite= Sprite.from("Test");
    private lightContainer = new Container();
    private lightTexture= RenderTexture.create({width:WIDTH,height:HEIGHT});;

    constructor()
    {
        super();

        const canvas = document.createElement("canvas");
        canvas.width=64;
        canvas.height=64;
        const ctx = canvas.getContext("2d");
        if(ctx==null){
            return;
        }

        this.bg.position.set(0,0);
        this.addChild(this.bg);

        this.physicsProta.addChild(this.prota);
        this.prota.spawnPlayer();
        this.addChild(this.physicsProta);



        this.addChild(new Sprite(this.lightTexture)).blendMode = BLEND_MODES.MULTIPLY;
        this.addChild(new Sprite(this.lightTexture)).blendMode = BLEND_MODES.MULTIPLY;

        const black = this.lightContainer.addChild(new Sprite(Texture.WHITE));
        black.tint = 0x222222;
        black.width = app.screen.width;
        black.height = app.screen.height;

        const gradient = ctx.createRadialGradient(32,32,0,32,32,32);
        gradient.addColorStop(0,"white");
        gradient.addColorStop(0.5, 'white');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32,32,32,0,Math.PI*2);
        ctx.fill();

        const torchLight = new Light(canvas);
        torchLight.x=250
        torchLight.y=250
        torchLight.scale.set(5);
        torchLight.tint=0xffffff;
        

        this.prota.addChild(torchLight);
        this.lightContainer.addChild(torchLight);
        

        

    }

    update(deltaTime:number, deltaFrame:number){

            this.prota.update(deltaFrame);
            
            const dt=deltaTime/1000;
            this.physicsProta.update(dt);

            if (Keyboard.map.get("ArrowUp") || Keyboard.map.get("KeyW")){
                this.prota.speed.y=-1
                let torch: Light|null= this.lightContainer.getChildByName("torchLight")
                torch?.update
            }else{
                if (Keyboard.map.get("ArrowDown") || Keyboard.map.get("KeyS")){
                    this.prota.speed.y=1
                }else{
                    this.prota.speed.y=0
                }
            }

            if (Keyboard.map.get("ArrowLeft") || Keyboard.map.get("KeyA")){
                this.prota.speed.x=-1
            }else{
                if (Keyboard.map.get("ArrowRight") || Keyboard.map.get("KeyD")){
                    this.prota.speed.x=1
                }else{
                    this.prota.speed.x=0
                }
            }
            
            app.renderer.render(this.lightContainer,{renderTexture: this.lightTexture, clear:true});
    }

}
    

