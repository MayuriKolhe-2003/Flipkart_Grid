import { useEffect, useState } from 'react';
import { makeStyles, Modal, Grid, Link, Box, StyleRules, Typography, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock'
import { useSelector, useDispatch } from 'react-redux';
import DashboardIcon from '@material-ui/icons/Dashboard';

import erc20abi from "../../pages/ERC20abi.json";
import { setSpCoin } from "../../actions/userActions";
import axios from '../../adapters/axios';
import RewardsModal from './RewardsModal';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%',
        display: 'block',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '6px',
    },
    coins: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px 0',
        '& img': {
            marginLeft: theme.spacing(1),
        },
        '& h6': {
            margin: 0,
        },
    },
    button: {
        margin: '30px 0',
        backgroundColor: 'gray', // Gray background color
        color: '#000', // White text color
        textTransform: 'none', // Prevents uppercase text transformation
        '&:hover': {
            backgroundColor: '#AAAAAA', // Lighter gray on hover
        },
        padding: "10px 30px",
        border: "none",
        outline: "none",
    },

}))
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const Rewards = () => {
    const classes = useStyles();
    const [rr, setRr] = useState([]); // Initialize rr with an empty array
    const [open, setOpen] = useState(false);
    const { spCoin, isAuthenticate } = useSelector((state) => state.userReducer);
    const [openModalIndex, setOpenModalIndex] = useState(null);

    const handleOpen = (i) => {
        setOpenModalIndex(i);
    }
    const handleClose = (i) => {
        setOpenModalIndex(i);
    }

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get('/rewards/get-rewards');
                setRr(response.data); // Update rr with the fetched data
            } catch (error) {
                console.error("Error fetching rewards:", error);
            }
        };

        fetchRewards();
    }, []); // Run the effect only once on mount

    //console.log(rr);


    return (
        <>
            <Grid container spacing={2}>

                {rr.map((item, index) => (
                    <>
                        <Grid item xs={4} key={item._id}>
                            <button onClick={()=>handleOpen(index)} style={{ border: 'none' }}>
                                <img src={item.image} alt="img 1" className={classes.image} />
                            </button>
                        </Grid>


                    </>
                ))}

                {rr.map((item, index) => (
                    <RewardsModal
                        key={item._id}
                        item={item}
                        open={openModalIndex === index}
                        handleClose={handleClose}
                        spCoin={spCoin}
                    />
                ))}

            </Grid>


        </>

    )
}

export default Rewards
