import {AssetsManifest } from "pixi.js";

export const manifest:AssetsManifest  = {
    bundles: [
        {
            name : "AssetsPJ",
            assets:
            {
                "Clampy" : "./player.png",
                "Test" : "./Map/mapBG.png" ,
                "Paper" : "./HUD/paper.png",
                "AppleTree" : "./Map/apple_tree (2).png"
            }
        },
        {
            name : "Map_1",
            assets:
            {
                "Test" : "./Map/mapBG.png" , 
            }
            
        }
    ]
}