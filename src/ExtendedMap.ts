export class ExtendedMap<K,V> extends Map<K,V>{
    
    constructor(){
        super();
    }

    getKeys():Array<K>{
        const array:Array<K>=[];

        this.forEach((_value, key) => {
            array.push(key);
        })

        return array;
    }

}