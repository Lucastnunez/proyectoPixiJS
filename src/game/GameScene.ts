import { Container, Sprite, RenderTexture, Texture, TextStyle, Text, TilingSprite, BLEND_MODES} from "pixi.js";
import { ContPhysics } from "./ContPhysics";
import { Player } from "./Player";
import { Updateable } from "../utils/Updateable";
import { WIDTH, HEIGHT} from "../index";
import { Light } from "./Light";
import { GameMap } from "./GameMap";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { WinScene } from "./WinScene";
import { Keyboard } from "../utils/keyboard";
//import { checkCollision } from "./iHitbox";

export class GameScene extends SceneBase implements Updateable{

    public prota: Player = new Player();
    private physicsProta: ContPhysics = new ContPhysics();
    
    private world:Container= new Container();

    private lightContainer = new Container();
    private lightTexture= RenderTexture.create({width:WIDTH,height:HEIGHT});
    private background!: GameMap;
    private dirtBG!: TilingSprite;
    private hud=new Container();
    private style = new TextStyle({
        fontFamily: "Times New Roman",
        fontSize: 25,
        fontWeight: "bold",
        // stroke: "#ffffff",
        // strokeThickness: 4
    });
    

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

        this.dirtBG = new TilingSprite(Texture.from("Dirt"),WIDTH*4,HEIGHT*4);
        this.dirtBG.position.set(WIDTH/2,HEIGHT/2);
        this.dirtBG.anchor.set(0.5,0.5);
        this.dirtBG.scale.set(0.3,0.3);
        this.world.addChild(this.dirtBG);
   

        this.background= new GameMap(1)
        this.background.position.set(210,210);

        this.background.generateTrees(this.prota.getGoals());
        this.background.generateBushes(this.prota.getGoals());

        this.world.addChild(this.background);
        

        this.prota.spawnPlayer();
        this.physicsProta.addChild(this.prota);
        this.world.addChild(this.physicsProta);
        this.addChild(this.world);


        this.addChild(new Sprite(this.lightTexture)).blendMode = BLEND_MODES.MULTIPLY;
        this.addChild(new Sprite(this.lightTexture)).blendMode = BLEND_MODES.MULTIPLY;
        // this.addChild(new Sprite(this.lightTexture)).blendMode = BLEND_MODES.MULTIPLY;
        
        const black = this.lightContainer.addChild(new Sprite(Texture.WHITE));
        black.tint = 0x222222;
        black.width = WIDTH;
        black.height = HEIGHT;

        const gradient = ctx.createRadialGradient(32,32,0,32,32,32);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.5, 'white');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32,32,32,0,Math.PI*2);
        ctx.fill();

        const torchLight = new Light(canvas); 
        torchLight.x=WIDTH/2;
        torchLight.y=HEIGHT/2;
        torchLight.scale.set(10);
        torchLight.tint=0xffeadd;
        torchLight.alpha=0.75;

        
    
        this.prota.addChild(torchLight);
        this.lightContainer.addChild(torchLight);

        //Add the goal list to the hud
        const paper=Sprite.from("Paper")
        paper.x=100;
        paper.y=200;
        paper.scale.set(0.2,0.2)
        paper.anchor.set(0.5,0.5);

        this.hud.addChild(paper);

        this.addInventoryToHud();
        this.addHudText();

        this.addChild(this.hud);
        
        
        console.log(this.prota.getGoals().get("Apples")+"Apples")
    }

        update(deltaMS:number, _deltaFrame:number){


            this.prota.update(deltaMS);
            this.background.update();
            //console.log(this.prota.x-this.background.x,this.prota.y-this.background.y);
            //console.log(Ticker.shared.FPS)

            this.world.x=-this.prota.x * this.worldTransform.a + WIDTH/2;
            this.world.y=-this.prota.y * this.worldTransform.d + HEIGHT/2;
            this.background.x=this.world.x*0.5;
            this.background.y=this.world.y*0.5;
            this.dirtBG.tilePosition.set(this.world.x*5,this.world.y*5);

            this.dirtBG.x=this.prota.x;
            this.dirtBG.y=this.prota.y;

            SceneManager.app.renderer.render(this.lightContainer,{renderTexture: this.lightTexture, clear:true});
            

            //Check if player already won
            if(this.ifWon()||Keyboard.map.get("KeyZ"))
            {
                const scene= new WinScene();
                SceneManager.changeScene(scene)
            }

    }
        private addHudText(){
            const auxText=new Text("Goals:",this.style);
            auxText.position.set(110,50)
            this.hud.addChild(auxText);


            let textY=90;
            const apples=this.prota.getGoals().get("Apples");
            const bananas=this.prota.getGoals().get("Bananas");
            const grapes=this.prota.getGoals().get("Grapes");
            const lemons=this.prota.getGoals().get("Lemons");
            
            if(apples&&apples>0){
                const text=new Text(apples+"x apples",this.style)
                text.position.set(90,textY);
                textY+=50
                this.hud.addChild(text)
            }

            if(bananas&&bananas>0){
                const text=new Text(bananas+"x bananas",this.style)
                text.position.set(90,textY);
                textY+=50
                this.hud.addChild(text)
            }

            if(grapes&&grapes>0){
                const text=new Text(grapes+"x grapes",this.style)
                text.position.set(90,textY);
                textY+=50
                this.hud.addChild(text)
            }

            if(lemons&&lemons>0){
                const text=new Text(lemons+"x lemons",this.style)
                text.position.set(90,textY);
                textY+=50
                this.hud.addChild(text)
            }
        }

        private addInventoryToHud()
        {

            const lemon = Sprite.from("Lemon")
            const grape = Sprite.from("Grapes")
            const banana = Sprite.from("Banana")
            const apple = Sprite.from("Apple")
            apple.scale.set(0.5,0.5)
            lemon.scale.set(0.5,0.5)
            grape.scale.set(0.5,0.5)
            banana.scale.set(0.5,0.5)
            apple.alpha=0.3;
            banana.alpha=0.3;
            grape.alpha=0.3;
            lemon.alpha=0.3;
            

            lemon.position.set(WIDTH-200,HEIGHT-200)
            this.hud.addChild(lemon)

            grape.position.set(WIDTH-300,HEIGHT-200)
            this.hud.addChild(grape)

            banana.position.set(WIDTH-400,HEIGHT-200)
            this.hud.addChild(banana)
            
            apple.position.set(WIDTH-500,HEIGHT-200)
            this.hud.addChild(apple)
        }

        private ifWon():boolean {
            if (
                this.prota.getGoals().get("Apples")!<=this.prota.inventory.get("Apples")! &&
                this.prota.getGoals().get("Bananas")!<=this.prota.inventory.get("Bananas")! &&
                this.prota.getGoals().get("Grapes")!<=this.prota.inventory.get("Grapes")! &&
                this.prota.getGoals().get("Lemons")!<=this.prota.inventory.get("Lemons")!
                )
                {  
                    return true;
                }
            return false;
        }

                    // for (const wall of this.background.hitboxes) {
                
            //     const overlap = checkCollision(this.prota,wall);
                
            //     if(overlap != null)
            //     {
            //         if(overlap.width<overlap.height){

            //             if (this.prota.x > wall.x){
            //                 this.prota.x-= overlap.width;
            //             }else{
            //                 this.prota.x+= overlap.width;
            //             }

            //         }else{

            //             if (this.prota.y > wall.y){
            //                 this.prota.y-= overlap.height;
            //             }else{
            //                 this.prota.y+= overlap.height;
            //             }
                        
            //         }

            //     }
            // }
}
    

