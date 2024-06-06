import { Rectangle } from "pixi.js";

export interface iHitbox{
    
    getHitbox():Rectangle;
}

export function checkCollision(objA:iHitbox, objB: iHitbox):Rectangle | null {
        

    const rectA = objA.getHitbox();
    const rectB = objB.getHitbox();

    const RMLeft= rectA.left < rectB.left ? rectB.left : rectA.left;
    const LMRight= rectA.right > rectB.right ? rectB.right : rectA.right;
    const BMTop= rectA.top < rectB.top ? rectB.top : rectA.top;
    const TMBottom= rectA.bottom > rectB.bottom ? rectB.bottom : rectA.bottom;

    if(RMLeft<LMRight && BMTop<TMBottom){
        const rectangle= new Rectangle();
        rectangle.x = RMLeft;
        rectangle.y = BMTop;
        rectangle.width = LMRight - RMLeft;
        rectangle.height = TMBottom - BMTop;
        return rectangle;
    }
    
    return null;
}