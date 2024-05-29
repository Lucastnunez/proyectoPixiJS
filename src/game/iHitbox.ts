import { Rectangle } from "pixi.js";

export interface iHitbox{
    
    getHitbox():Rectangle;
}

export function checkCollision(objA:iHitbox, objB: iHitbox):Rectangle | null {
        

    const rectA = objA.getHitbox();
    const rectB = objB.getHitbox();

    const rightML= rectA.left < rectB.left ? rectB.left : rectA.left;
    const leftMR= rectA.right < rectB.right ? rectB.right : rectA.right;
    const bottomMT= rectA.top < rectB.top ? rectB.top : rectA.top;
    const topMB= rectA.bottom < rectB.bottom ? rectB.bottom : rectA.bottom;

    if(rightML<leftMR && bottomMT<topMB){
        const rectangle= new Rectangle();
        rectangle.x = rightML;
        rectangle.y = bottomMT;
        rectangle.width = leftMR - rightML;
        rectangle.height = topMB - bottomMT;
        return rectangle;
    }
    return null;
}