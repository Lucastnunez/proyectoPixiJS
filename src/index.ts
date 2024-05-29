
import { StartMenuScene } from './game/StartMenuScene';
import { Keyboard } from './utils/keyboard';
import { SceneManager } from './utils/SceneManager';



export const WIDTH=1920;
export const HEIGHT=1080;
//960 504 mitad

const myScene = new StartMenuScene();
Keyboard.initilize();
SceneManager.initilize();
SceneManager.changeScene(myScene);


