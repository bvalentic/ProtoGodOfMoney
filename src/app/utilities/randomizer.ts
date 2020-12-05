
export class Randomizer {

    static draw(array: any[]) {
        return array[Math.floor(array.length * Math.random())];
    }
}