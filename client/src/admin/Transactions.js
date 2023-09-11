import React from 'react';
import { makeStyles, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
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
  },
  tableHead:{
    fontWeight:"bolder",
    background:"gray",
  }
}));

const Transactions = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} /> {/* Creates space for the app bar */}
        <Typography variant='h5'>
            Transaction History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead >
              <TableRow>
                <TableCell className={classes.tableHead}>Transaction Id</TableCell>
                <TableCell className={classes.tableHead}>Date</TableCell>
                <TableCell className={classes.tableHead}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Data 1</TableCell>
                <TableCell>Data 2</TableCell>
                <TableCell>Data 3</TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};

export default Transactions;
