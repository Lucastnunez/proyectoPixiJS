export abstract class GameMisc{
    
    static RandomNumberInRange(min:number, max:number){
        return Math.floor(Math.random()*(max-min)+min);
    }
}