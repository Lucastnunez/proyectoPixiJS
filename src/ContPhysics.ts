import { Container, Point } from "pixi.js";
import { Updateable } from "./Updateable"

export class ContPhysics extends Container implements Updateable{

    public speed: Point=new Point();

    public update(deltaSeconds: number): void{
        this.x+= this.speed.x * deltaSeconds;
        this.y+= this.speed.y * deltaSeconds;
        
    }
}