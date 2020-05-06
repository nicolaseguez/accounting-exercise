const { constants, validOperations } = require('./config');

function getMultiplier(transaction) {
    return transaction.type === constants.CREDIT ? 1 : -1;
}

function getValue(transaction) {
    return transaction.amount * getMultiplier(transaction)
}

function isValidTransactionType(type) {
    return validOperations.findIndex((operation) => operation === type) >= 0;
}

function calculateTotal(transactions, transaction) {
    const amount = transaction ? getValue(transaction) : 0;
    const subtotal = transactions
        .filter(({ status }) => status === constants.OK)
        .reduce((acc, { data }) => getValue(data) + acc, 0);
    console.log("Transaction", transactions.length, subtotal, amount);
    return subtotal + amount;
}

module.exports = {
    getMultiplier,
    isValidTransactionType,
    calculateTotal
}