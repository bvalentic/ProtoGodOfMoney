import { Job } from '../people/employees/job';

export class Building {
    baseCost: number;
    resellValue: number;
    className: string;
    name: string;
    increaseRate: number;
    employees: Job[];
}
