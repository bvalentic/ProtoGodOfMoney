
export class Randomizer {

    // Grabs a random object from an array.
    static draw(array: any[]) {
        return array[Math.floor(array.length * Math.random())];
    }
}