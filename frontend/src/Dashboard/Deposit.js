import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import { getFormatedAmount } from './utils';
import { dashboardStyles } from './styles';

export const Deposit = ({deposit}) => { 
    const classes = dashboardStyles();
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