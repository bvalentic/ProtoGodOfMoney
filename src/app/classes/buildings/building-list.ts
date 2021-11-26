import { Building } from "./building";
import { Temple } from "./building-types/temple"


// A list of variables for each building in the game.
export const BuildingEnums = {
    TEMPLE: {
        name: "Temple",
        baseCost: 1,
        increaseRate: 0.2
    }
}

export class BuildingList extends Array {
    baseCost: number

    // Returns the cost of the next building.
    marginalCost() {
        let cost = (this.baseCost * Math.pow(1.15, this.length))
        return Math.round(cost * 100) / 100;
    }

    // Returns the value of the next sold building.
    resellValue() {
        if (this.length <= 0) {
            return 0;
        }
        let value = this.baseCost * Math.pow(1.15, (this.length - 1)) * 0.2;
        return Math.round(value * 100) / 100;
    }
}

export class TempleList extends BuildingList {
    baseCost = BuildingEnums.TEMPLE.baseCost;
    // marginalCost() {
    //     return (BuildingEnums.TEMPLE.baseCost * Math.pow(1.15, this.length));
    // }
}

export class BuildingsOwned {
    temples: TempleList;
    

    constructor() {
        this.temples = new TempleList();
    }
}
