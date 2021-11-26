import { Component, OnInit } from '@angular/core';
import { Temple } from 'src/app/classes/buildings/building-types/temple';
import { Job } from 'src/app/classes/people/employees/job';
import { Person } from 'src/app/classes/people/person';
import { Priest } from 'src/app/classes/people/employees/employee-types/priest';
import { Building } from 'src/app/classes/buildings/building';
import { Names } from 'src/app/classes/people/names';
import { Randomizer as rng } from 'src/app/utilities/randomizer';
import { BuildingEnums, BuildingList, BuildingsOwned } from 'src/app/classes/buildings/building-list';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // The amount of money in the "bank" available to the player.
  moneyBalance: number = 10.0;
  // How much money is gained per second.
  moneyPerSecond: number = 0;

  buildings: BuildingsOwned;

  // costs = {
  //   temple: 10,
  //   priest: 2,
  // }

  // buildings: {
  //   all: Building[],
  //   temples: Temple[],
  // };

  // people: {
  //   all: Person[],
  //   employees: Person[],
  //   priests: Person[],
  // };

  constructor() {

  }

  ngOnInit(): void {
    this.setup();
    this.turnCounter();
  }

  round(number) {
    return Math.round(number * 100) / 100
  }

  buyTemple() {
    console.log("Buying temple #" + (this.buildings.temples.length + 1))
    let newTemple = new Temple();
    let cost = this.buildings.temples.marginalCost();
    if (this.moneyBalance >= cost) {
      this.moneyBalance = this.round(this.moneyBalance - cost);
      this.buildings.temples.push(newTemple);
      console.log(this.moneyBalance, cost)
    }
  }

  sellTemple() {
    console.log("Selling temple #" + this.buildings.temples.length)
    let resellValue = this.buildings.temples.resellValue();
    this.buildings.temples.pop();
    this.moneyBalance += resellValue;
  }

  // convertToPriest() {
  //   if (this.people.all.length > this.people.priests.length) {
  //     let newPriest = new Priest();
  //     if (this.moneyBalance >= newPriest.cost) {
  //       this.moneyBalance -= newPriest.cost;
  //       let recruit = this.chooseRecruit(newPriest.jobTitle);
  //       recruit.occupation = newPriest;
  //       this.people.employees.push(recruit);
  //       this.people.priests.push(recruit);
  //       console.log(recruit.name + " is now a priest!");
  //     }      
  //   }
  // }

  // chooseRecruit(potentialOccupation: string) {
  //   let choosing = true;
  //   let recruit: Person;
  //   while (choosing) {
  //     recruit = rng.draw(this.people.all);
  //     if (recruit.occupation) {
  //       choosing = recruit.occupation.jobTitle === potentialOccupation
  //     }
  //     else choosing = false;
  //   }
  //   return recruit;
  // }

  getBuildingIncreaseRate() {
    let buildingIncreaseRate = 0;
    buildingIncreaseRate = 
      this.buildings.temples.length * BuildingEnums.TEMPLE.increaseRate;
    
    return buildingIncreaseRate;
  }

  // getEmployeeIncreaseRate() {
  //   let employeeIncreaseRate = 0;
  //   this.people.employees.forEach(employee => {
  //     employeeIncreaseRate += employee.occupation.increaseRate;
  //   });

  //   return employeeIncreaseRate;
  // }

  setup() {
    // this.buildings = {
    //   all: new Array<Building>(),
    //   temples: new Array<Building>(),
    // };
    // this.people = {
    //   all: new Array<Person>(),
    //   employees: new Array<Person>(),
    //   priests: new Array<Person>(),
    // };
    // this.populateWorld();
    this.buildings = new BuildingsOwned();
  }

  // populateWorld() {
  //   let numOfFirstNames = Names.maleFirstNameList.length;
  //   let numOfLastNames = Names.maleLastNameList.length;
  //   for (let i = 0; i < (numOfFirstNames * numOfLastNames); i++) {
  //     this.people.all.push(new Person());
  //   }
  //   console.log(this.people.all);
  // }

  turnCounter() {    
    setInterval( () => {
      this.completeTurn();
    }, 1000);
  }

  completeTurn() {
    this.setIncreaseRate();
    this.increase();
  }

  setIncreaseRate() {
    this.moneyPerSecond =
      this.getBuildingIncreaseRate();
    // this.getBuildingIncreaseRate() + this.getEmployeeIncreaseRate();
  }

  increase() {
    this.moneyBalance += this.moneyPerSecond;
  }

}
