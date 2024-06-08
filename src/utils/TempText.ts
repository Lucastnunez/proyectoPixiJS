import { Text, TextStyle, Ticker } from "pixi.js";

export class TempText extends Text{

    private duration:number;
    private fadeOutTime:number;
    private fadeInTime:number;
    private running:boolean=false;
    private runningTime:number=0;

    constructor(text:string, duration:number, style?:TextStyle, fadeInTime?:number,fadeOutTime?:number){

        super(text,style);
        this.visible=false;
        this.tint=0xFFFFFF
        this.duration=duration;

        if(fadeOutTime!=null){
            this.fadeOutTime=fadeOutTime;
        }else{
            this.fadeOutTime=0;
        }

        if(fadeInTime!=null){
            this.fadeInTime=fadeInTime;
        }else{
            this.fadeInTime=0;
        }
        
    }

    public playText(){
        if(this.running){
            return;
        }
        this.alpha=0.0;
        this.running=true;
        this.visible=true;
        Ticker.shared.add(this.update,this);
    }

    public update(frames:number){
        this.updateThisText(Ticker.shared.deltaMS,frames)
    }

    private updateThisText(deltaMS:number, _frames:number)
    {
        this.runningTime+=deltaMS;
        
        if(this.alpha<1){
            this.alpha+=deltaMS/this.fadeInTime;
        }
        if(this.runningTime>(this.duration-this.fadeOutTime)){
            this.alpha-=deltaMS/this.fadeOutTime;
        }
        
        if(this.runningTime>this.duration){
            console.log("stop")
            Ticker.shared.remove(this.update,this)
            this.visible=false;
            this.destroy();
        }
    }
    
}



