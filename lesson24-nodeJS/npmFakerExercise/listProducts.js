// import faker package
let faker = require("faker");

// print 10 random products and prices
for (let i = 1; i <= 10; i += 1) {
    console.log(faker.commerce.productName() + ", " + faker.commerce.price());
}