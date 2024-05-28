import { AnimatedSprite, Container, Texture } from "pixi.js";

export class StateAnimation extends Container{

    private states: Map<string,AnimatedSprite>=new Map;
    private currentPlaying:[Name:string,Animation:AnimatedSprite]|undefined;

    public playState(stateName:string){
        this.removeChildren();
        
        const currentState = this.states.get(stateName);
        
        if(currentState){
            this.currentPlaying=[stateName,currentState];
            this.addChild(currentState);
        }
    }

    public addState(stateName:string, frames: Texture[] | string [], _animationSpeed:number,loop:boolean){
        const textArray: Texture[]=[];
        for (const tex of frames){
            if (typeof tex=="string"){
                textArray.push(Texture.from(tex));
            }else
            {
                textArray.push(tex);
            }
        }

        const tempAnim:AnimatedSprite=new AnimatedSprite(textArray);
        tempAnim.animationSpeed=0.3;
        tempAnim.loop=loop;
        tempAnim.play();
        this.states.set(stateName,tempAnim)
    }

    public update(frames:number){
        for(const state of this.states.values()){
            state.update(frames);
        }
    }

    public setCurrentSpeed(animSpeed:number){
        if(this.currentPlaying!=undefined && this.currentPlaying[1]!=undefined){
            this.currentPlaying[1].animationSpeed=animSpeed;
        }
    }
    public getCurrentName():string|undefined{
        if(this.currentPlaying!=undefined && this.currentPlaying[0]!=undefined){
            return this.currentPlaying[0];
        }
        return;
    }
}