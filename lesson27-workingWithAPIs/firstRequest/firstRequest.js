const axios = require('axios');

// Make a request for a task with a given ID
axios.get("https://jsonplaceholder.typicode.com/todos/1")
    // "then" excutes the code that follows it if we recieve a successful response
    .then((data) => {
    console.log(data.data);
    })
    // "catch" excutes the code that follows it if we recieve an error
    .catch((error) => {
    console.log(error);
    })
    // "finally" always excutes the code that follows it regardless of the response we got
    .finally(() => {
    });