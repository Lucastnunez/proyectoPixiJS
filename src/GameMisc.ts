import { Point, utils } from "pixi.js";
import { ExtendedMap } from "./ExtendedMap";

export abstract class GameMisc{
    public static readonly event: utils.EventEmitter = new utils.EventEmitter();
    
    static RandomNumberInRange(min:number, max:number){
        return Math.floor(Math.random()*(max-min)+min);
    }

    static GetTreePositionsFromMap(mapnumber:String):ExtendedMap<Point,boolean>{
        const positions:ExtendedMap<Point,boolean>=new ExtendedMap;
        positions.clear;
        
        if (mapnumber=="map_1"){
            
            positions.set(new Point(1680,1760),true);
            positions.set(new Point(1680,2360),true);
            positions.set(new Point(1680,2960),true);
            positions.set(new Point(1680,3560),true);
            positions.set(new Point(1680,4160),true);
            positions.set(new Point(3970,2910),true);
            positions.set(new Point(4100,1445),true);
            positions.set(new Point(4450,1445),true);

        }

        return positions;
    }
}