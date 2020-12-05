import { Component, OnInit } from '@angular/core';
import { Temple } from 'src/app/classes/buildings/building-types/temple';
import { Job } from 'src/app/classes/people/employees/job';
import { Person } from 'src/app/classes/people/person';
import { Priest } from 'src/app/classes/people/employees/employee-types/priest';
import { Building } from 'src/app/classes/buildings/building';
import { Names } from 'src/app/classes/people/names';
import { Randomizer as rng } from 'src/app/utilities/randomizer';

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
    all: Building[],
    temples: Temple[],
  };

  people: {
    all: Person[],
    employees: Person[],
    priests: Person[],
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
      this.buildings.all.push(newTemple);
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
        let recruit = this.chooseRecruit(newPriest.jobTitle);
        recruit.occupation = newPriest;
        this.people.employees.push(recruit);
        this.people.priests.push(recruit);
        console.log(recruit.name + " is now a priest!");
      }      
    }
  }

  chooseRecruit(potentialOccupation: string) {
    let choosing = true;
    let recruit: Person;
    while (choosing) {
      recruit = rng.draw(this.people.all);
      if (recruit.occupation) {
        choosing = recruit.occupation.jobTitle === potentialOccupation
      }
      else choosing = false;
    }
    return recruit;
  }

  getBuildingIncreaseRate(buildings: Array<Building>) {
    let buildingIncreaseRate = 0;
    this.buildings.all.forEach(building => {
      buildingIncreaseRate += building.increaseRate;
    })
    
    return buildingIncreaseRate;
  }

  getEmployeeIncreaseRate() {
    let employeeIncreaseRate = 0;
    this.people.employees.forEach(employee => {
      employeeIncreaseRate += employee.occupation.increaseRate;
    });

    return employeeIncreaseRate;
  }

  setup() {
    this.buildings = {
      all: new Array<Building>(),
      temples: new Array<Building>(),
    };
    this.people = {
      all: new Array<Person>(),
      employees: new Array<Person>(),
      priests: new Array<Person>(),
    };
    this.populateWorld();
  }

  populateWorld() {
    let numOfFirstNames = Names.maleFirstNameList.length;
    let numOfLastNames = Names.maleLastNameList.length;
    for (let i = 0; i < (numOfFirstNames * numOfLastNames); i++) {
      this.people.all.push(new Person());
    }
    console.log(this.people.all);
  }

  setIncreaseRate() {
    this.moneyIncrement = 
      this.getBuildingIncreaseRate(this.buildings.temples) + 
      this.getEmployeeIncreaseRate();
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
