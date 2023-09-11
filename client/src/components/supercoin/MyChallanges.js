import React,{useState,useEffect} from 'react'
import axios from '../../adapters/axios';
import { makeStyles, Modal, Grid, Link, Box, StyleRules, Typography, Button, Card, CardContent,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    component: {
        width: '60%',
        minWidth: 500,
        height: '100%',
        background: '#fff',
        margin: '80px auto',
        [theme.breakpoints.down('md')]: {
            margin: '80px 0',
        },
        padding: '20px 30px',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
      tableHeader: {
        fontWeight: 'bold',
      },
}));

const MyChallanges = () => {
    const classes = useStyles();
    const [cha, setCha] = useState([]);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get('/getChallange');
                setCha(response.data); // Update rr with the fetched data
            } catch (error) {
                console.error("Error fetching rewards:", error);
            }
        };

        fetchRewards();
    }, []); // Run the effect only once on mount

    return (
        <Box className={classes.component}>
            <Box className={classes.heading}>
                <Typography variant='h6'>
                    My Challanges Progress
                </Typography>

                <Paper className={classes.root}>
      <TableContainer>
        <Table className={classes.table} aria-label="seller challenge table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Seller Name</TableCell>
              <TableCell className={classes.tableHeader} align="center">
                Challenges Completed
              </TableCell>
              <TableCell className={classes.tableHeader} align="center">
                Remaining
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cha.Brand.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                 {row.brandName} 
                </TableCell>
                <TableCell align="center">{row.Brand.qty}</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
            </Box>
        </Box>

    )
}

export default MyChallanges
