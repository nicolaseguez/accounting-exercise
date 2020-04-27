import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  red: {
    color: 'darkorange'
  },
  blue: {
    color: 'blue'
  }
}));

export default function Deposits(props) {
  const classes = useStyles();
  const {deposits, refresh} = props;

  // TODO value should be provided by API
  const calculateTotal = (deposits) =>
    deposits.reduce((acc, deposit) => deposit.amount + acc, 0);

  return (
    <React.Fragment>
      <Title>Deposits ({deposits.length})</Title>
      <Title>Total: ${calculateTotal(deposits)}</Title>
      <Button variant="contained" color="primary" onClick={refresh}>Refresh</Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deposits.reverse().slice(0, 50).map((row) => (
            <TableRow key={row.id}>
              <TableCell className={row.type === "DEBIT" ? classes.red : classes.blue}>{row.date}</TableCell>
              <TableCell className={row.type === "DEBIT" ? classes.red : classes.blue}>{row.type}</TableCell>
              <TableCell
                align="right"
                className={row.type === "DEBIT" ? classes.red : classes.blue}
              >
                {row.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
