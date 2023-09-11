import React, { useState, useEffect } from 'react'
import axios from '../../adapters/axios';
import { makeStyles, Modal, Grid, Link, Box, StyleRules, Typography, Button, Card, CardContent } from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';

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
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.spacing(2),
        backgroundColor: '#d6e0f1;',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    cardContent: {
        flexGrow: 1,
    },
    brandName: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
        color: "blue"
    },
    coinText: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    coinIcon: {
        marginRight: theme.spacing(1),
    },
    bold: {
        fontWeight: "bold"
    },
    button: {
        margin: '30px 0',
        backgroundColor: '#d4d3cf', // Gray background color
        color: '#000', // White text color
        textTransform: 'none', // Prevents uppercase text transformation
        '&:hover': {
            backgroundColor: '#AAAAAA', // Lighter gray on hover
        },
        padding: "10px 30px"
    },
    red: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bolder'
    },
    claimButton: {
        marginTop: 10,
        backgroundColor: '#FF0000', // Red background color
        color: '#FFFFFF', // White text color
        '&:hover': {
            backgroundColor: '#CC0000', // Lighter red on hover
        },
    }
}));

const Challanges = () => {
    const classes = useStyles();
    const { user, isAuthenticate } = useSelector((state) => state.userReducer);
    const [brandsChallenge, setbrandChallege] = useState([]);
    const [userChallenge, setuserChallege] = useState([]);

    const fetchbrands = async () => {
        try {
            const response = await axios.get('/getChallange');
            setbrandChallege(response.data);
            console.log(user._id);

        } catch (error) {
            console.error("Error fetching rewards:", error);
        }
    };

    const fetchuserbrand = async () => {
        try {

            // const uid = "64da2f56b0f58304aba7cbf0";
            const response1 = await axios.get(`/brand/getinfo?id=${user._id}`);
            const data = response1.data;
            setuserChallege(data);
            console.log(userChallenge)
        }
        catch (error) {
            console.error("Error fetching rewards:", error);
        }
    }
    const addActivity = async (coin) => {
        try {
            console.log(coin);
            await axios.post("activity/add", {
                userId: user._id,
                debited: false,
                credited: true,
                activity: "Daily Spin",
                // productname:"",
                coins: coin
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    const claimreward = async (sellerid, qty) => {
        console.log(sellerid);
        console.log(qty);

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();

        try {
            const resp = await axios.post('seller/addbrand', {
                sellerid: sellerid,
                userid: user._id,
                userwallet: signerAddress,
                coins: qty
            });

        } catch (error) {
            console.error("Error :", error);
        }
        addActivity(qty).then(() => {
            console.log("Success");
            axios.get(`/activity/get?id=${user._id}`)
                .then(res => {
                    console.log(res);
                })
        })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {

        fetchuserbrand();
        fetchbrands();
    }, []); // Run the effect only once on mount
    console.log(userChallenge);
    return (
        <Box className={classes.component}>
            <Box className={classes.heading}>
                <Typography variant='h6'>
                    Challanges You Can complete to Earn More Coins
                </Typography>


                <div className={classes.root}>
                    <Grid container spacing={2}>


                        {userChallenge && brandsChallenge && brandsChallenge.map((brand, index) => {

                            const brandIdToFind = brand.seller.id;
                            console.log(brandIdToFind)
                            const brandEntry = userChallenge.Brand.find(
                                (entry) => entry.seller === brandIdToFind
                            );
                            console.log(brandEntry)
                            return (
                                <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                                    <Card className={classes.card}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography variant="h6" className={classes.brandName}>
                                                <span className={classes.bold}>Launched by : </span> {brand.seller.name}
                                            </Typography>
                                            <div className={classes.coinText}>
                                                <Typography variant="body1">
                                                    <span className={classes.bold}>You Can Earn: </span> {brand.coinsRewarded}
                                                </Typography>
                                                <img src="https://rukminim2.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" alt="Supercoin Icon" style={{ height: 18 }} />
                                            </div>
                                            <Typography variant="body1">
                                                <span className={classes.bold}>Challange Completed : </span>
                                                <span className={classes.red}>
                                                    {brandEntry ? `${brandEntry.qty} / ` : "0 / "}
                                                    {brand.transactionsRequired}
                                                </span>
                                            </Typography>

                                            {brandEntry && brandEntry.qty >= brand.transactionsRequired ?
                                                <Button variant="contained" className={classes.claimButton} onClick={() => claimreward(brandIdToFind, brand.coinsRewarded)} >
                                                    Claim Reward
                                                </Button>
                                                : ""}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}


                    </Grid>
                </div>
            </Box>
        </Box>
    )
}

export default Challanges
