import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Title from './Title';
import { getFormatedAmount } from './utils';
import { Deposit } from './Deposit';
import { dashboardStyles } from './styles';

export default function Deposits(props) {
  const classes = dashboardStyles();
  const {deposits, balance, refresh} = props;

  return (
    <React.Fragment>
      <Title>Deposits ({deposits.length})</Title>
      <Title>Total: {getFormatedAmount(balance)}</Title>
      <Button variant="contained" color="primary" onClick={refresh}>Refresh</Button>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
        className={classes.root}
      >
       { deposits.slice(0, 100).map(deposit => <Deposit key={deposit.id} deposit={deposit} />) }
      </List>
    </React.Fragment>
  );
}

