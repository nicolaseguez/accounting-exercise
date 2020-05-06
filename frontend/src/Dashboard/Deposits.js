import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import Title from './Title';
import { getFormatedAmount } from './utils';

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
  const {deposits, balance, refresh} = props;

  // TODO value should be provided by API
  const calculateTotal = (deposits) =>
    deposits.reduce((acc, deposit) => deposit.amount + acc, 0);

  console.log("HERE", deposits);

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

const Deposit = ({deposit}) => { 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };


  return (
  <>         
    <ListItem button onClick={handleClick}>
      <Typography className={deposit.type === "CREDIT" ? classes.blue : classes.red }>
        Type: {deposit.type} - Amount: {getFormatedAmount(deposit.amount)}
      </Typography>
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Divider />
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
          <List>
            <ListItem>
              <ListItemText><Typography variant="h6">Id:</Typography> {deposit.id}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText><Typography variant="h6">Amount:</Typography> {deposit.amount}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText><Typography variant="h6">Type:</Typography> {deposit.type}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText><Typography variant="h6">Date:</Typography> {moment(deposit.data).format('MMMM Do YYYY, h:mm:ss a')}</ListItemText>
            </ListItem>
          </List>
        </ListItem>
      </List>
    </Collapse>
  </>);
}