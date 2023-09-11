
import React, { useState } from "react";
import {
    makeStyles,
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    IconButton,
    Typography,
    Menu,CssBaseline
} from '@material-ui/core';

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CategoryIcon from '@material-ui/icons/Category';
import TableChartIcon from '@material-ui/icons/TableChart';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

const Header = () => {
    const classes = useStyles();
    const [selectedOption, setSelectedOption] = useState('dashboard'); // Default selected option


    return (
        <>
        <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img src="https://w7.pngwing.com/pngs/458/813/png-transparent-logo-flipkart-graphics-brand-snapdeal-amazon-seller-central-logo-blue-text-trademark.png" alt="Logo" style={{ maxWidth: '150px' }} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List style={{marginTop:60}}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Table" />
          </ListItem>
        </List>
      </Drawer>
        </>
    );
};

export default Header;
