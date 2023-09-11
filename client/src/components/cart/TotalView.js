import React, { useState, useEffect } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";


import { setTotalAmount } from "../../actions/orderActions";

const useStyle = makeStyles({
  header: {
    padding: "15px 24px",
    background: "#fff",
  },
  greyTextColor: {
    color: "#878787",
  },
  container: {
    "& > *": {
      marginBottom: 20,
      fontSize: 14,
    },
  },
  price: {
    float: "right",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 600,
    borderTop: "1px dashed #e0e0e0",
    padding: "20px 0",
    borderBottom: "1px dashed #e0e0e0",
  },
});

export var coinsUsed = 0;

const TotalView = ({ page = "cart" }) => {
  const classes = useStyle();
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [getSuper, setGetSuper] = useState(0);

  const [isChecked, setChecked] = useState(true);
  const { spCoin, isAuthenticate } = useSelector((state) => state.userReducer);

  const { cartItems, stateChangeNotifyCounter, checkboxValues } = useSelector(
    (state) => state.cartReducer
  ); // Retrieve checkboxValues from the Redux store
  const dispatch = useDispatch();

  const handleCheck = () => {
    setChecked(prevChecked => !prevChecked); // Toggle isChecked value
    //console.log(isChecked);
  };

  useEffect(() => {
    totalAmount();
    //console.log(checkboxValues);
  }, [cartItems, stateChangeNotifyCounter, isChecked]);

  const totalAmount = () => {
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalCoinsUsed = 0;

    cartItems.forEach((item) => {
      const itemPrice = item.price.cost * item.qty;
      const itemDiscount = (itemPrice * item.price.discount) / 100;

      //console.log(item);
      //console.log(item.price.coinsUsed);
      //console.log(isChecked);
      const itemCoinsUsed = isChecked ? item.price.coinsUsed : 0;
      //console.log(itemCoinsUsed)

      totalPrice += itemPrice;
      totalDiscount += itemDiscount;
      totalCoinsUsed += itemCoinsUsed;
    });

    const getCoin = () => {
      if (totalPrice - totalDiscount - totalCoinsUsed + deliveryCharges > 2500){
        setGetSuper(50);
      }
      else if (totalPrice - totalDiscount - totalCoinsUsed + deliveryCharges < 100){
        setGetSuper(0);
      }
      else {
        setGetSuper(Math.floor((totalPrice - totalDiscount - totalCoinsUsed + deliveryCharges) / 100) * 2);
      }
    }

    setPrice(totalPrice);
    setDiscount(totalDiscount);
    coinsUsed = (totalCoinsUsed <= spCoin ? totalCoinsUsed : 0);
    console.log(coinsUsed);
    getCoin();

    setDeliveryCharges(totalPrice - totalDiscount > 500 ? 0 : 40);

    if (page === "checkout") {
      dispatch(setTotalAmount(totalPrice - totalDiscount - totalCoinsUsed + deliveryCharges));
    }
  };

  return (
    <Box>
      <Box
        className={classes.header}
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <Typography className={classes.greyTextColor}>PRICE DETAILS</Typography>
      </Box>
      <Box className={clsx(classes.header, classes.container)}>
        <Typography>
          Price ({cartItems?.length} item)
          <span className={classes.price}>₹{price}</span>
        </Typography>

          <Typography>
            Discount<span className={classes.price}>- ₹{discount}</span>
          </Typography>
      


        {spCoin >= coinsUsed ?
          <Typography>
            <input type="checkbox" className={classes.input} onChange={handleCheck} checked={isChecked} />
            Coins Discount
            <span className={classes.price}> - {coinsUsed} <img src="https://rukminim2.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" style={{ width: 15, height: 15 }} /></span>
          </Typography>
          : ""
        }

        <Typography>
          Delivery Charges
          <span className={classes.price}>
            {deliveryCharges > 0 ? "₹40" : "FREE"}{" "}
          </span>
        </Typography>
        <Typography className={classes.totalAmount}>
          {page === "checkout" ? "Total Payable" : "Total Amount"}
          <span className={classes.price}>
            ₹{price - discount - coinsUsed + deliveryCharges}
          </span>
        </Typography>
        <Typography style={{ fontSize: 14, color: "green" }}>
          You get <img src="https://rukminim2.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" style={{ width: 15, height: 15 }} alt="img"/> {getSuper} on this order
        </Typography>
      </Box>
    </Box>
  );
};

export default TotalView;

