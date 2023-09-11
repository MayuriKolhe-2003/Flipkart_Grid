import React,{useState} from 'react';
import { makeStyles, Typography,Button,TextField } from '@material-ui/core';
import Header from './Header';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 50, // Adjust this value to ensure proper spacing
  },form: {
    display: 'flex',
    alignItems: 'center',
    margin:'2rem 0'
  },
  input: {
    marginRight: theme.spacing(5),
    width:'200px'
  },
  
}));

const Transfer = () => {
  const classes = useStyles();
  const [spender, setspender] = useState('');
  const [amount, setamount] = useState('');

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Input 1:', spender);
    console.log('Input 2:', amount);
  };

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} /> {/* Creates space for the app bar */}
        <Typography variant='h5'>
            Transfer Coins
        </Typography>

        <div className={classes.form}>
          <TextField
            className={classes.input}
            label="Spender Address"
            value={spender}
            variant='filled' size='large'
            onChange={(e) => setspender(e.target.value)}
          />
          <TextField
            className={classes.input}
            label="Coins"
            value={amount}
            variant='filled'
            onChange={(e) => setamount(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Transfer
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Transfer;
