const { v4: uuidv4 } = require('uuid');

class Transaction {
    constructor({type, amount}) {
        this.type = type;
        this.amount = Math.abs(amount);
        this.id = uuidv4();
        this.data = new Date().toISOString();
    }
}

module.exports = {
    Transaction
}