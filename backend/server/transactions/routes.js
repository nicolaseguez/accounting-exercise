const express = require('express');
const router = express.Router();
const { Transaction } = require('./models');
const Transactions = require('./service');

router.get('/', (req, res, next) => {
  const source$ = Transactions.getAccountBalance();
  source$.subscribe({
    next: r => res.send(r)
  });
});

router.get('/transactions', (req, res, next) => {
  const source$ = Transactions.readTransactions();
  source$.subscribe({
    next: r => res.send(r)
  });
});

router.get('/transactions/:id', (req, res, next) => {
  const source$ = Transactions.findTransaction(req.params.id);
  source$.subscribe({
    next: r => res.status(r.status).send(r.data)
  });
});

router.get('/error-log', (req, res, next) => {
  const source$ = Transactions.readErrors();
  source$.subscribe({
    next: r => res.send(r)
  });
});

router.post('/transactions', (req, res, next) => {
  const transaction = new Transaction({
    amount: req.body.amount,
    type: req.body.type.toUpperCase()
  });
  const source$ = Transactions.processTransaction(transaction);

  source$.subscribe({
    next: ({status, data}) => res.status(status).send(data),
  });
});

module.exports = router;
