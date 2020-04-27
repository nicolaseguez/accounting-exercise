const express = require('express');
const router = express.Router();
const Transactions = require('../bootstrap');

router.get('/', function(req, res, next) {
  const source$ = Transactions.readTransactions();
  source$.subscribe({
    next: r => res.send(r),
  });
});

router.get('/error-log', function(req, res, next) {
  const source$ = Transactions.readErrors();
  source$.subscribe({
    next: r => res.send(r),
  });
});

router.post('/', function(req, res, next) {
  console.log(Transactions, req.body.type, req.body.amount)
  const source$ = Transactions.processTransaction({
    amount: req.body.amount,
    type: req.body.type
  });

  source$.subscribe({
    next: (r) => res.send(r),
    error: (e) => res.status(e.status).send(e),
  });
})

module.exports = router;
