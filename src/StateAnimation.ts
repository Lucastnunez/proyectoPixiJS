import { AnimatedSprite, Container, Texture } from "pixi.js";

export class StateAnimation extends Container{

    private states: Map<string,AnimatedSprite>=new Map;

    public playState(stateName:string){
        this.removeChildren();
        const currentState = this.states.get(stateName);

        if(currentState){
            this.addChild(currentState);
        }
    }

    public addState(stateName:string, frames: Texture[] | string [], animationSpeed:number,loop:boolean){
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
        tempAnim.animationSpeed=animationSpeed;
        tempAnim.loop=loop;
        this.states.set(stateName,tempAnim)
    }

    public update(frames:number){
        for(const state of this.states.values()){
            state.update(frames);
        }
    }

}