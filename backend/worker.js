const { parentPort } = require('worker_threads');

parentPort.on('message', ([transactions, amount]) => {
  if (transactions.length === 0 && amount < 0) {
    throw Error("REJECTED");
  }

  if (transactions.length === 0 && amount > 0) {
    parentPort.postMessage({ amount: amount, type: "CREDIT" });
    parentPort.close();
    return null;
  }

  const total = transactions.reduce((acc, tr) => tr.amount + acc, 0) + amount;
  console.log("TOTAL", total);
  if (total < 0) {
    throw Error("REJECTED")
  } else {
    parentPort.postMessage({ amount: amount, type: amount > 0 ? "CREDIT" : "DEBIT" });
    parentPort.close();
    return null;
  }

  parentPort.close();
});
