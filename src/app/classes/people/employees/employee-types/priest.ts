import { Job } from '../job';

export class Priest extends Job {
    constructor() {
        super();
        this.cost = 2;
        this.increaseRate = 0.05;
        this.jobTitle = "Priest";
    }
}
