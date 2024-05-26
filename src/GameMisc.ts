import { Point } from "pixi.js";
import { HEIGHT, WIDTH } from ".";
import { ExtendedMap } from "./ExtendedMap";

export abstract class GameMisc{
    
    static RandomNumberInRange(min:number, max:number){
        return Math.floor(Math.random()*(max-min)+min);
    }

    static GetTreePositionsFromMap(mapnumber:String):ExtendedMap<Point,boolean>{
        const positions:ExtendedMap<Point,boolean>=new ExtendedMap;

        if (mapnumber=="map_1"){
            positions.set(new Point(190,189),true);
            positions.set(new Point(WIDTH/2+100,HEIGHT/2+50),true);
            positions.set(new Point(WIDTH/2+150,HEIGHT/2+150),true);
            positions.set(new Point(WIDTH/2+102,HEIGHT/2+250),true);
            positions.set(new Point(WIDTH/2+103,HEIGHT/2+350),true);
            positions.set(new Point(WIDTH/2+200,HEIGHT/2+50),true);
            positions.set(new Point(WIDTH/2+400,HEIGHT/2+50),true);
            positions.set(new Point(WIDTH/2+50,HEIGHT/2+450),true);

        }

        return positions;
    }
}