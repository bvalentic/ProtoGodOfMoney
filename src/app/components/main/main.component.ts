import { Component, OnInit } from '@angular/core';
import { Temple } from 'src/app/classes/buildings/building-types/temple';
import { Employee } from 'src/app/classes/people/employees/employee';
import { Person } from 'src/app/classes/people/person';
import { Priest } from 'src/app/classes/people/employees/employee-types/priest';
import { Building } from 'src/app/classes/buildings/building';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  money: number = 10.0;
  moneyIncrement: number = 0;

  costs = {
    temple: 10,
    priest: 2,
  }

  buildings: {
    temples: Temple[],
  };

  people: {
    all: Person[],
    employees: Employee[],
    priests: Priest[],
  };

  constructor() {

  }

  ngOnInit(): void {
    this.setup();
    this.turnCounter();
  }

  buyTemple() {
    let newTemple = new Temple();
    if (this.money >= newTemple.cost) {
      this.money -= newTemple.cost;
      this.buildings.temples.push(newTemple);
    }
  }

  completeTurn() {
    this.setIncreaseRate();
    this.increase();
  }

  convertToPriest() {
    if (this.people.all.length > this.people.priests.length) {
      let newPriest = new Priest();
      if (this.money >= newPriest.cost) {
        this.money -= newPriest.cost;
        let recruit = this.people.all.pop();
        newPriest.name = recruit.name;
        this.people.employees.push(newPriest);
        this.people.priests.push(newPriest);
      }      
    }
  }

  getBuildingIncreaseRate(buildings: Array<Building>) {
    return (buildings.length) ? buildings.length * buildings[0].increaseRate : 0;
  }

  getEmployeeIncreaseRate(employees: Array<Employee>) {
    return (employees.length) ? employees.length * employees[0].increaseRate : 0;
  }

  setup() {
    this.buildings = {
      temples: new Array<Temple>(),
    };
    this.people = {
      all: new Array<Person>(),
      employees: new Array<Employee>(),
      priests: new Array<Priest>(),
    };
    this.people.all.push(new Person());
  }

  setIncreaseRate() {
    this.moneyIncrement = 
      this.getBuildingIncreaseRate(this.buildings.temples) + 
      this.getEmployeeIncreaseRate(this.people.priests);
  }

  increase() {
    this.money += this.moneyIncrement;
  }

  turnCounter() {    
    setInterval( () => {
      this.completeTurn();
    }, 1000);
  }

}
