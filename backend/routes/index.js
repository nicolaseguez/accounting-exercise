const express = require('express');
const router = express.Router();
const Transactions = require('../bootstrap');

router.get('/', function(req, res, next) {
  const source$ = Transactions.readTransactions();
  source$.subscribe({
    next: r => res.send(r)
  });
});

router.get('/error-log', function(req, res, next) {
  const source$ = Transactions.readErrors();
  source$.subscribe({
    next: r => res.send(r)
  });
});

router.post('/', function(req, res, next) {
  const source$ = Transactions.processTransaction({
    amount: req.body.amount,
    type: req.body.type
  });

  source$.subscribe({
    next: ({status, data}) => res.status(status).send(data),
  });
})

module.exports = router;
