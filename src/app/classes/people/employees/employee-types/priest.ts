import { Employee } from '../employee';


export class Priest extends Employee {
    constructor() {
        super();
        this.cost = 2;
        this.increaseRate = 0.05;
    }
}