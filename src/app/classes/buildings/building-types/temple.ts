import { Building } from '../building';
import { BuildingEnums } from '../building-list';

export class Temple extends Building {
    constructor() {
        super();
        this.baseCost = BuildingEnums.TEMPLE.baseCost;
        this.className = BuildingEnums.TEMPLE.name;
        this.name = "Temple of Dosh";
        this.increaseRate = BuildingEnums.TEMPLE.increaseRate;
    }
}
