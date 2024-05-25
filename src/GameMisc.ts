import { Point } from "pixi.js";

export abstract class GameMisc{
    
    static RandomNumberInRange(min:number, max:number){
        return Math.floor(Math.random()*(max-min)+min);
    }

    static GetTreePositionsFromMap(mapnumber:String):Map<Point,boolean>{
        const positions:Map<Point,boolean>=new Map;

        if (mapnumber=="map_1"){
            positions.set(new Point(190,189),true);
        }

        return positions;
    }
}