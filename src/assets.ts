import {AssetsManifest } from "pixi.js";

export const manifest:AssetsManifest  = {
    bundles: [
        {
            name : "AssetsPJ",
            assets:
            {
                "PlayerIdle1" : "./Player/PlayerIdle1.png",
                "PlayerIdle2" : "./Player/PlayerIdle2.png",
                "PlayerIdle3" : "./Player/PlayerIdle3.png",
                "PlayerIdle4" : "./Player/PlayerIdle4.png",
                "Test" : "./Map/mapBG.png" ,
                "Paper" : "./HUD/paper.png",
                "AppleTree" : "./Map/AppleTree.png",
                "BananaTree" : "./Map/BananaTree.png",
                "Tree" : "./Map/tree2.png"
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