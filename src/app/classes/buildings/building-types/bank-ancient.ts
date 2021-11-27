import { Building } from '../building';
import { BuildingEnums } from '../building-list';

export class BankAncient extends Building {
    constructor() {
        super();
        this.baseCost = BuildingEnums.BANK_ANCIENT.baseCost;
        this.className = BuildingEnums.BANK_ANCIENT.name;
        this.name = "Bank of Mesopotamia";
        this.increaseRate = BuildingEnums.BANK_ANCIENT.increaseRate;
    }
}
