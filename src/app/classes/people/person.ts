import { Randomizer } from 'src/app/utilities/randomizer';
import { Job } from './employees/job';
import { Names } from './names';


export class Person {
    name: string;
    firstName: string;
    lastName: string;
    occupation: Job;

    constructor() {
        this.namePerson();
    }

    private namePerson() {
        this.firstName = Randomizer.draw(Names.maleFirstNameList);
        this.lastName = Randomizer.draw(Names.maleLastNameList);
        this.name = this.firstName + " " + this.lastName;
    }
}
