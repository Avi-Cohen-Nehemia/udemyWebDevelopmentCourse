// import faker package
let faker = require("faker");

// print 10 random products and prices
for (let i = 1; i <= 10; i += 1) {
    let product = faker.commerce.productName();
    let price = faker.commerce.price();

    console.log(product + " - $" + price);
}