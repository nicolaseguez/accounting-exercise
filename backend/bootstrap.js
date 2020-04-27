const Rx = require('rxjs');
const { v4: uuidv4 } = require('uuid');
const { Worker } = require('worker_threads');

const queue = [];
const transactions = [];
const errors = [];
let locked = false;

function getMultiplier(transaction) {
  return transaction.type === "CREDIT" ? 1 : -1;
}

function calculateTransaction({source$, amount}) {
  const worker = new Worker('./worker.js');
  worker.postMessage([transactions, amount]);

  worker.on('message', (response) => {
    const transaction = {
      id: uuidv4(),
      date: new Date().toISOString(),
      ...response
    };
    transactions.push(transaction);
    source$.next(transaction);
  });

  worker.on('error', (err) => {
    const transaction = {
      id: uuidv4(),
      amount: amount,
      type: err.toString(),
      date: new Date().toISOString()
    };
    errors.push(transaction);
  });

  worker.on('exit', () => {
    locked = false;
    source$.complete();
  });
}

function processTransaction(transaction) {
  console.log("New Transaction!!", transaction.amount);
  const subject$ = new Rx.Subject();
  const source$ = subject$.catch(err => err);
  queue.push({
    source$,
    amount: Math.abs(transaction.amount) * getMultiplier(transaction)
  });

  return source$;
}

function readTransactions() {
  const subject$ = new Rx.Subject();
  const source$ = subject$.catch(err => err);
  queue.unshift({ source$, amount: "READ" });

  return source$;
}

function readErrors() {
  const subject$ = new Rx.Subject();
  const source$ = subject$.catch(err => err);
  queue.unshift({ source$, amount: "ERRORS" });

  return source$;
}

const interval$ = Rx.Observable.interval(16);

interval$
  .map(() => {
    if (locked) {
      return null;
    }
    const operation = queue.shift();
    if (operation == null) return null;

    if (operation.amount === "READ") {
      operation.source$.next(transactions);
      return null;
    }

    if (operation.amount === "ERRORS") {
      operation.source$.next(errors);
      return null;
    }

    locked = true;
    calculateTransaction(operation);
  }).subscribe();


module.exports = {
  readTransactions,
  readErrors,
  processTransaction
}
