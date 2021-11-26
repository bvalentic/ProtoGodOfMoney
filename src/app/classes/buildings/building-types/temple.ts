import { Building } from '../building';

export class Temple extends Building {
    constructor() {
        super();
        this.baseCost = 10;
        this.className = "temple";
        this.name = "Temple of Dosh";
        this.resellValue = 2;
        this.increaseRate = 0.1;
    }
}
