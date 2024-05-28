import { Point, utils } from "pixi.js";
import { ExtendedMap } from "./ExtendedMap";

export abstract class GameMisc{
    public static readonly event: utils.EventEmitter = new utils.EventEmitter();
    public static readonly map: Map<string,boolean> =new Map();
    
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
            positions.set(new Point(5170,3500),true);
            positions.set(new Point(5310,1110),true);
            positions.set(new Point(5910,1110),true);
            positions.set(new Point(8340,1110),true);
            positions.set(new Point(0,0),true);

        }

        return positions;
    }

    static GetBushPositionsFromMap(mapnumber:String):ExtendedMap<Point,boolean>{
        const positions:ExtendedMap<Point,boolean>=new ExtendedMap;
        positions.clear;
        
        if (mapnumber=="map_1"){
            
            positions.set(new Point(7700,970),true);
            positions.set(new Point(7900,970),true);
            positions.set(new Point(8100,970),true);
            positions.set(new Point(8300,970),true);
            positions.set(new Point(8355,2330),true);
            positions.set(new Point(8335,2210),true);
            positions.set(new Point(8335,1990),true);
            positions.set(new Point(3200,1645),true);
            positions.set(new Point(3200,1845),true);
            positions.set(new Point(3200,2045),true);
            positions.set(new Point(3200,2245),true);
            positions.set(new Point(3200,2445),true);
            positions.set(new Point(3200,3100),true);
            positions.set(new Point(3200,3300),true);
            positions.set(new Point(3200,3500),true);
            positions.set(new Point(3200,3700),true);
            positions.set(new Point(3200,3900),true);
            positions.set(new Point(3200,4100),true);
            positions.set(new Point(0,0),true);

        }

        return positions;
    }

    static emitEvent(event:string){
        GameMisc.event.emit(event);
    }
}