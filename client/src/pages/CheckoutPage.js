import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  makeStyles,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import AddIcon from "@material-ui/icons/Add";

import axios from "../adapters/axios";
import { clearCart, getCartItems } from "../actions/cartActions";
import { getAddresses } from "../actions/addressActions";
import { setOrderItems } from "../actions/orderActions";
import { resetCheckboxValues } from "../actions/cartActions";


import { shieldIcon, superCoin } from "../constants/data";
import { post } from "../utils/paytm";
import useQuery from "../hooks/useQuery";

import AddressCard from "../components/address/AddressCard";
import LoaderSpinner from "../components/LoaderSpinner";
import ToastMessageContainer from "../components/ToastMessageContainer";

import erc20abi from "./ERC20abi.json";
import TotalView from "../components/cart/TotalView";
import { coinsUsed } from "../components/cart/TotalView";

const useStyle = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 135px",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      padding: "15px 0",
    },
  },
  leftComponent: {
    // width: '67%',
    paddingRight: 15,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 15,
    },
  },
  header: {
    padding: "15px 24px",
    background: "#fff",
  },
  bottom: {
    padding: "16px 22px",
    background: "#fff",
    boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
    borderTop: "1px solid #f0f0f0",
  },
  loginComponent: {
    backgroundColor: "#fff",
    padding: "15px",
    display: "flex",
  },
  addressComponent: {
    backgroundColor: "#fff",
    paddingBottom: 15,
    margin: "20px 0px",
  },
  activeComponent: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#2874f0",
    padding: "15px 10px",
    fontWeight: 600,
    fontSize: 18,
  },
  shieldIcon: {
    width: 29,
    height: 36,
    marginRight: 20,
  },
  para: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.29,
    display: "block",
    marginLeft: 0,
    color: "#878787",
  },
  stepCount: {
    fontSize: 12,
    color: "#2874f0",
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    padding: "3px 7px",
    verticalAlign: "baseline",
    marginRight: 17,
  },
  grayText: {
    color: "#878787",
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "6px",
    textTransform: "uppercase",
  },
  loginText: {
    color: "#212121",
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 37,
    marginTop: 7,
  },
  actionBtn: {
    display: "block",
    background: "#fb641b",
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 2,
    height: 40,
    width: 170,
    marginTop: 5,
  },
  changeBtn: {
    padding: "0 32px",
    height: "40px",
    borderRadius: "2px",
    border: "1px solid #e0e0e0",
    color: "#2874f0",
    fontSize: "14px",
    fontWeight: 500,
    background: "#fff",
    marginLeft: "auto",
    cursor: "pointer",
    textTransform: "uppercase",
  },
  addBtn: {
    display: "flex",
    color: "#2874f0",
    fontWeight: 500,
    padding: "16px 16px",
    borderBottom: "1px solid #f0f0f0",
    cursor: "pointer",
  },
  addressText: {
    fontSize: 14,
    textTransform: "none",
    padding: "10px 10px 0 37px",
    color: "#212121",
  },
}));

const CheckoutPage = () => {
  const [activeComponent, setActiveComponent] = useState({
    address: true,
    payment: false,
  });
  const [selectedAddr, setSelectedAddr] = useState();
  const [paymentMode, setPaymentMode] = useState();
  const [isLoading, setIsLoading] = useState(true);

  console.log(coinsUsed);
  const [purchaseCoins, setpurchaseCoins] = useState(coinsUsed);
  const classes = useStyle();

  const { cartItems, checkboxValues } = useSelector((state) => state.cartReducer);
  const { isAuthenticate, user } = useSelector((state) => state.userReducer);
  const { addresses } = useSelector((state) => state.addressReducer);
  const { orderItems, totalAmount } = useSelector(
    (state) => state.orderReducer
  );
  const dispatch = useDispatch();

  const history = useHistory();
  const query = useQuery();
  const ethers = require('ethers');
  const transitems = cartItems.map((obj) => {
    return obj.title.shortTitle;
  })

  console.log(checkboxValues);


  useEffect(() => {
    //check if request from cart page or not
    if (query.get("init") !== "true") {
      history.replace("/cart");
    }

    if (isAuthenticate) {
      // console.log(cartItems[0].title.shortTitle);
      dispatch(getCartItems());
      dispatch(getAddresses());
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      //calcCoins();
    } else {
      history.replace("/login?ref=checkout?init=true");
    }
  }, [isAuthenticate]);

  useEffect(() => {
    dispatch(setOrderItems(cartItems));
    //calcCoins();
  }, [cartItems]);

  useEffect(() => {
    if (cartItems == "") {
      window.location.replace("/");
    }
  }, []);



  const handleChange = () => {
    setActiveComponent({
      address: true,
      payment: false,
    });
  };

  const deliverHere = (address) => {
    setActiveComponent({
      address: false,
      payment: true,
    });
    setSelectedAddr(address);
  };

  const changePaymentMode = (e) => {
    setPaymentMode(e.target.value);
  };

  const addActivity = async (coin) => {
    try {
      await axios.post("/activity/add", {
        userId: user._id,
        debited: false,
        credited: true,
        activity: `Product purchased : ${transitems}`,
        productname: "",
        coins: coin
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  const deductCoinActivity = async (coin) => {
    try {
      await axios.post("/activity/add", {
        userId: user._id,
        debited: true,
        credited: false,
        activity: `Product purchased with Coins : ${transitems}`,
        productname: "",
        coins: coin
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  const confirmOrder = async () => {
    if (paymentMode === "cash") {
      try {
        await axios.post("/orders/complete-order", {
          items: orderItems,
          userId: user._id,
          addressId: selectedAddr._id,
          totalAmount: totalAmount,
          paymentMode: paymentMode,
          paymentStatus: "Completed",
          coinsUsed: coinsUsed,
        });
        await dispatch(clearCart());
        //await dispatch(resetCheckboxValues());
        const provider = new ethers.BrowserProvider(window.ethereum);
        const wallet = new ethers.Wallet("2df9be0c2d553ba046a7bfc125427079f0569ede897096f81e8bc95b675279f8", provider);
        const walletrec = new ethers.Wallet("70166246b7a035fffd1e9e18e0da53449728d9800b63b69d120407ebe072f6f4", provider);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract("0x8d45F1D60F998254a51E4cc1A73De7d820e67f93", erc20abi, signer);
        const recipient = await signer.getAddress();

        var coin = 0;
        if (totalAmount > 2500) {
          coin = 50;
        }
        else if (totalAmount < 0) {
          coin = 0;
        }
        else {
          coin = Math.floor(totalAmount / 100) * 2;
        }
        const TransferCoins = coin - coinsUsed;
        // console.log(coinsUsed);

        if (TransferCoins > 0) {
          const transaction = {
            to: "0x8d45F1D60F998254a51E4cc1A73De7d820e67f93",
            data: contract.interface.encodeFunctionData('transferFrom', ["0xd6976647ce4EDBE5760629Ca4481DDE1ceD4593a", recipient, ethers.parseEther(Math.abs(TransferCoins).toString())]),
          };
          const tx = await wallet.sendTransaction(transaction)
            .catch((err) => {
              console.log(err);
            });
          console.log('Transaction hash:', tx.hash);

          await tx.wait();
          console.log('Transaction confirmed');
        }
        else if (TransferCoins < 0) {
          const transaction = {
            to: "0x8d45F1D60F998254a51E4cc1A73De7d820e67f93",
            data: contract.interface.encodeFunctionData('transfer', ["0xd6976647ce4EDBE5760629Ca4481DDE1ceD4593a", ethers.parseEther(Math.abs(TransferCoins).toString())]),
          };

          const tx = await walletrec.sendTransaction(transaction)
            .catch((err) => {
              console.log(err);
            });
          console.log('Transaction hash:', tx.hash);

          await tx.wait();
          console.log('Transaction confirmed');
        }

        //console.log(signerAddress);

        //await erc20.transfer("0xd6976647ce4EDBE5760629Ca4481DDE1ceD4593a",signerAddress, ethers.parseEther(TransferCoins.toString()));


        addActivity(coin).then(() => {
          console.log("Success");
          axios.get(`/activity/get?id=${user._id}`)
            .then(res => {
              console.log(res);
            })
        })
        deductCoinActivity(coinsUsed).then(() => {
          console.log("Success");
          axios.get(`/activity/get?id=${user._id}`)
            .then(res => {
              console.log(res);
            }
            )
        })
          .catch((err) => {
            console.log(err);
          });

        window.location.replace("order-success");
      } catch (error) {
        console.log(error);
        window.location.replace("order-failed");
      }
    } else if (paymentMode === "online") {
      try {
        const res = await axios.post("/orders/complete-order", {
          items: orderItems,
          userId: user._id,
          addressId: selectedAddr._id,
          totalAmount: totalAmount,
          paymentMode: paymentMode,
          paymentStatus: "Initiated",
        });

        const { data } = await axios.post("/payment/paytm", {
          fName: user.fname,
          lName: user.lname,
          phone: user.phone,
          email: user.email,
          totalAmount: totalAmount,
          orderId: res.data.orderId,
          custId: user._id,
        });
        const details = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: data,
        };
        await dispatch(clearCart());
        post(details);
      } catch (error) {
        console.log(error);
        window.location.replace("order-failed");
      }
    }
  };

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <>
      {cartItems.length ? (
        <Grid container className={classes.component}>
          <Grid
            item
            lg={8}
            md={8}
            sm={12}
            xs={12}
            className={classes.leftComponent}
          >
            <Box boxShadow={1} className={classes.loginComponent}>
              <Box>
                <span className={classes.stepCount}>1</span>
                <span className={classes.grayText}>
                  LOGIN{" "}
                  <svg
                    height="16"
                    width="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      stroke="#2974f0"
                    ></path>
                  </svg>
                </span>
                <Typography className={classes.loginText}>
                  {`${user.fname}  ${user.lname}`}
                  <span style={{ fontWeight: 500, marginLeft: 10 }}>
                    {`${user.phone} `}
                  </span>
                </Typography>
              </Box>
              <button className={classes.changeBtn}>Change</button>
            </Box>
            <Box className={classes.addressComponent}>
              {activeComponent.address ? (
                <>
                  <Box className={classes.activeComponent}>
                    <span
                      className={classes.stepCount}
                      style={{ backgroundColor: "#fff" }}
                    >
                      2
                    </span>
                    DELIVERY ADDRESS
                  </Box>
                  <Box
                    style={{
                      padding: "0px 10px",
                      maxHeight: "460px",
                      overflowY: "auto",
                    }}
                  >
                    <RadioGroup aria-label="type" name="address">
                      {addresses.length > 0 &&
                        addresses.map((address, index) => (
                          <Box style={{ display: "flex" }}>
                            <FormControlLabel
                              key={index}
                              value={address._id}
                              control={<Radio style={{ color: "#2874f0" }} />}
                            />
                            <div>
                              <AddressCard
                                address={address}
                                isCheckout={true}
                              />
                              <Button
                                variant="contained"
                                className={classes.actionBtn}
                                onClick={() => deliverHere(address)}
                                style={{ backgroundColor: "#fb641b" }}
                              >
                                Deliver Here
                              </Button>
                            </div>
                          </Box>
                        ))}
                    </RadioGroup>
                  </Box>
                </>
              ) : (
                <Box style={{ display: "flex", alignItems: "start" }}>
                  <Box
                    style={{ padding: "20px 15px 5px 15px" }}
                    className={classes.grayText}
                  >
                    <span className={classes.stepCount}>2</span>
                    DELIVERY ADDRESS{" "}
                    <svg
                      height="16"
                      width="20"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                        stroke="#2974f0"
                      ></path>
                    </svg>
                    <Typography className={classes.addressText}>
                      <b>
                        {selectedAddr?.name}
                        {"   "}
                      </b>{" "}
                      {" - "}
                      {selectedAddr?.houseAddress}, {selectedAddr?.locality},{" "}
                      {selectedAddr?.city}, {selectedAddr?.state},{" "}
                      {selectedAddr?.pincode}
                    </Typography>
                  </Box>
                  <button
                    style={{ marginTop: 15, marginRight: 15 }}
                    onClick={handleChange}
                    className={classes.changeBtn}
                  >
                    Change
                  </button>
                </Box>
              )}
            </Box>
            {activeComponent.address && (
              <Box
                className={clsx(classes.addressComponent, classes.addBtn)}
                onClick={() =>
                  history.replace("/account/addresses?ref=checkout?init=true")
                }
              >
                <AddIcon style={{ marginRight: 10 }} />
                <Typography style={{ fontSize: 16 }}>
                  Add a new address
                </Typography>
              </Box>
            )}
            <Box className={clsx(classes.addressComponent)}>
              {activeComponent.payment ? (
                <>
                  <Box className={classes.activeComponent}>
                    <span
                      className={classes.stepCount}
                      style={{ backgroundColor: "#fff" }}
                    >
                      3
                    </span>
                    PAYMENT OPTIONS
                  </Box>
                  <Box style={{ padding: "0px 20px" }}>
                    <RadioGroup
                      name="payment"
                      value={paymentMode}
                      onChange={changePaymentMode}
                    >
                      {/* <Box style={{ display: "flex" }}>
                        <FormControlLabel
                          value="online"
                          control={<Radio style={{ color: "#2874f0" }} />}
                        />
                        <div>
                          <img
                            height="60"
                            src="https://cdn.iconscout.com/icon/free/png-256/paytm-226448.png"
                            alt=""
                          />
                        </div>
                      </Box> */}
                      <FormControlLabel
                        value="cash"
                        control={<Radio style={{ color: "#2874f0" }} />}
                        label="Pay Now"

                      />
                    </RadioGroup>
                    {paymentMode && (
                      <Button
                        variant="contained"
                        className={classes.actionBtn}
                        style={{
                          backgroundColor: "#fb641b",
                          marginLeft: "auto",
                        }}
                        onClick={confirmOrder}
                      >
                        {paymentMode === "cash" ? " CONFIRM ORDER" : "CONTINUE"}
                      </Button>
                    )}
                  </Box>
                </>
              ) : (
                <Box
                  style={{ padding: "20px 15px 5px 15px" }}
                  className={classes.grayText}
                >
                  <span className={classes.stepCount}>3</span>
                  PAYMENT OPTIONS
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TotalView page="checkout" />
            <Box style={{ marginTop: 20 }}>
              <img style={{ width: "100%" }} src={superCoin} alt="Super Coin" />
            </Box>
            <Box
              style={{ marginTop: 20, display: "flex", padding: "10px 20px" }}
            >
              <img
                className={classes.shieldIcon}
                src={shieldIcon}
                alt="Secure"
              />
              <span className={classes.para}>
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </span>
            </Box>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
      <ToastMessageContainer />
    </>
  );
};

export default CheckoutPage;
