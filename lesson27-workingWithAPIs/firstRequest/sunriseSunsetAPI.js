const axios = require('axios');

axios.get("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400")
    .then((response) => {
    console.log(response.data.results);
    })
    .catch((error) => {
    console.log(error);
    })
    .finally(() => {
    });