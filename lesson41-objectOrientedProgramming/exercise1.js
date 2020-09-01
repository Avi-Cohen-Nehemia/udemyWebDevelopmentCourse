// Create a Vehicle class, it should have a make, model and year properties.
// Each object should have a property called "isRunning", which should be set to false.

//Every object created from the vehicle class should have a method called "turnOn" which changes the isRunning property to "true"
//Every object created from the vehicle class should have a method called "turnOff" which changes the isRunning property to "false"
//Every object created from the vehicle class should have a method called "honk" which returns the string "beep" but ONLY if the isRunning property is true;

class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.isRunning = false;
    }

    turnOn() {
        this.isRunning = true;
    }

    turnOff() {
        this.isRunning = false;
    }

    honk() {
        if (this.isRunning) {
            return "beep!";
        }
    }
}

// check solution by running "node <fileName>"
let car = new Vehicle("Kia", "Venga", "2017");

car.turnOn();
console.log(car.isRunning); // should return "true"
console.log(car.honk()); // should return "beep!"

car.turnOff();
console.log(car.isRunning); // should "return false"
console.log(car.honk()); // should return "undefined"