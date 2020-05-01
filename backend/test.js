const axios = require('axios');

let argument = process.argv[2];
let transactions = 50;
if (argument != null && argument.indexOf('--transactions') > -1) {
  temp = parseInt(argument.split('=')[1]);
  if (!isNaN(temp)) {
    transactions = temp;
  }
}

for(let i = 0; i < transactions; i++) {
  let amount = 256;
  let type = "CREDIT";
  if (i !== 0) {
    amount = Math.ceil(Math.random() * 256);
    if (amount % 2 === 0) {
      type = "DEBIT";
    }
  }
  axios
    .post('http://localhost:3000/api', { amount, type })
    .then(response => console.log(response.data))
}
console.log("finished");
