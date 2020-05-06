const Rx = require('rxjs');
const { calculateTotal } = require('./util');
const { constants } = require('./config');

const transactions = [];
const operations = [];
let locked = false;

// Process Queue with buffer
const operations$ = new Rx.Subject();
operations$
  .bufferTime(200)
  .subscribe(buffer => {
    if (!locked) {
      processOperations(operations.concat(buffer));
      operations.length = 0;
    } else {
      console.log("missed");
      operations.push(...buffer);
    }
  });

const Operation = {
  [constants.READ]: ({ source$ }) => 
    sendTransactions(source$, (transaction) => transaction.status === constants.OK ),
  [constants.ERROR]: ({ source$ }) => 
    sendTransactions(source$, (transaction) => transaction.status !== constants.OK ),
  [constants.BALANCE]: ({ source$ }) => 
    source$.next({ balance: calculateTotal(transactions) }),
  [constants.FIND]: ({ source$, id}) => findTransactionById(source$, id),
  [constants.TRANSACTION]: (transactionOperations) => 
    calculateTransactions(transactionOperations),
}

const Responses = {
  [constants.OK]: success,
  [constants.REJECTED]: rejected,
}

function processOperations(operations) {
  const transactionOperations = operations.filter(op => op.type === constants.TRANSACTION);
  locked = true;
  Operation[constants.TRANSACTION](transactionOperations);
  locked = false;
  operations
    .filter(op => op.type !== constants.TRANSACTION)
    .forEach(op => Operation[op.type](op))
}

function calculateTransactions(transactionOperations) {
  transactionOperations.forEach(operation => {
    const status = evaluateTransaction(transactions, operation);
    transactions.push({ status, data: operation.transaction });
    Responses[status](operation)
  });
}

function evaluateTransaction(transactions, { transaction }) {
  const total = calculateTotal(transactions, transaction);
  return (total >= 0) ? constants.OK : constants.REJECTED;
}

function success({ source$, transaction }) {
  source$.next({ status: 200, data: transaction })
}

function rejected(operation) {
  operation.source$.next({ status: 403, data: "Operation Rejected" })
}

function sendTransactions(source$, filter) {
  const errors = transactions
    .filter(filter)
    .map(transaction => transaction.data)
    source$.next(errors);
}

function findTransactionById(source$, id) {
  const transaction = transactions.find(tr => tr.data.id === id && tr.status === constants.OK);
  const response = transaction != null ? 
    { status: 200, data: transaction } : 
    { status: 404, data: "Not Found" };
  source$.next(response);
}

function processTransaction(transaction) {
  const subject$ = new Rx.Subject();
  const source$ = subject$.catch(err => err);
  operations$.next({  
    source$,
    type: constants.TRANSACTION,
    transaction
  });

  return source$;
}

function readTransactions() {
  const subject$ = new Rx.Subject();
  const source$ = subject$.catch(err => err);
  operations$.next({ source$, type: constants.READ });

  return source$;
}

function readErrors() {
  const subject$ = new Rx.Subject();
  const source$ = subject$.catch(err => err);
  operations$.next({ source$, type: constants.ERROR });

  return source$;
}

function getAccountBalance() {
  const subject$ = new Rx.Subject();
  const source$ = subject$.catch(err => err);
  operations$.next({ source$, type: constants.BALANCE });

  return source$;
}

function findTransaction(id) {
  const subject$ = new Rx.Subject();
  const source$ = subject$.catch(err => err);
  operations$.next({ source$, type: constants.FIND, id });

  return source$;
}

module.exports = {
  readTransactions,
  readErrors,
  processTransaction,
  getAccountBalance,
  findTransaction
}
