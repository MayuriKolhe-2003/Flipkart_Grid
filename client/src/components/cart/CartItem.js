import { Card, makeStyles, Box, Typography, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { makeShortText } from "../../utils/makeShortText";
import { fassured } from "../../constants/data";

import GroupButton from "./GroupButton";
import AlertDialogBox from "../AlertDialgBox";
import { useState } from "react";
import { updateCheckboxValues } from "../../actions/cartActions"; // Import your Redux action

const useStyle = makeStyles({
  component: {
    borderTop: "1px solid #f0f0f0",
    borderRadius: 0,
    display: "flex",
    "&:hover": {
      cursor: "pointer",
      "& $itemTitle": {
        color: "#2874f0",
      },
    },
  },
  leftComponent: {
    margin: 20,
    display: "flex",
    flexDirection: "column",
  },
  itemTitle: {
    color: "#000",
  },
  image: {
    height: 110,
    width: 110,
    objectFit: "contain",
  },
  mid: {
    margin: 20,
  },
  greyTextColor: {
    color: "#878787",
  },
  smallText: {
    fontSize: 14,
  },
  price: {
    fontSize: 18,
    fontWeight: 600,
  },
  remove: {
    marginTop: 12,
    fontSize: 16,
  },
  bold: {
    color: "red",
    fontWeight: "bold"
  },
  input: {
    height: 15,
    width: 15,
    marginRight: 5
  }
});

const CartItem = ({ item}) => {
  const classes = useStyle();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const finalPrice = item.price.cost - ((item.price.cost * item.price.discount) / 100);
  //console.log(item);

  const { spCoin, isAuthenticate } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const { checkboxValues } = useSelector((state) => state.cartReducer);
  //console.log(checkboxValues)
  const isChecked = checkboxValues[item._id] || false; // Retrieve checkbox value from Redux state

  const handleCheck = () => {
    dispatch(updateCheckboxValues(item._id, !checkboxValues[item._id])); // Dispatch action to update checkbox value  // Dispatch action to update checkbox value
    console.log(checkboxValues) ;
  };

  const dialogClose = () => {
    setIsOpenDialog(false);
  };

  const dialogOpen = () => {
    setIsOpenDialog(true);
  };

  return (
    <>
      <Card className={classes.component}>
        <Box className={classes.leftComponent}>
          <img src={item.url} className={classes.image} />
          <GroupButton product={item} />
        </Box>
        <Box className={classes.mid}>
          <Link to={`/product/${item._id}`}>
            <Typography className={classes.itemTitle}>
              {item.title.longTitle && makeShortText(item.title.longTitle)}
            </Typography>

            <Typography
              className={clsx(classes.greyTextColor, classes.smallText)}
              style={{ marginTop: 10 }}
            >
              Seller:RetailNet
              <span>
                <img src={fassured} style={{ height: 18, marginLeft: 10 }} />
              </span>
            </Typography>
            <Typography style={{ margin: "20px 0", color: "#000" }}>
              <span className={classes.price}>₹{finalPrice}</span>
              &nbsp;&nbsp;&nbsp;
              <span className={classes.greyTextColor}>
                <strike>₹{item.price.cost}</strike>
              </span>
              &nbsp;&nbsp;&nbsp;
              <span style={{ color: "#388E3C" }}>
                {item.price.discount}% off
              </span>
            </Typography>

          </Link>

          {/*
          {item.price.coinsUsed && item.price.coinsUsed <= spCoin
           ?   <Typography style={{ color: '#000' }}>
            <input type="checkbox" className={classes.input} onChange={handleCheck} checked={isChecked} />
            BUY THIS IN COMBINATION OF 
            <span className={classes.bold}> {item.price.coinsUsed} </span>
            <img src="https://rukminim2.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" alt="Supercoin Icon" style={{ height: '15px' }} />
            <span className={classes.bold}>  + ₹ {finalPrice - item.price.coinsUsed} </span>
          </Typography> : ""}

          */}
          

          <Button className={classes.remove} onClick={dialogOpen}>
            Remove
          </Button>
        </Box>
      </Card>
      <AlertDialogBox
        isOpenDialog={isOpenDialog}
        handleClose={dialogClose}
        itemId={item._id}
        type="cart"
      />
    </>
  );
};

export default CartItem;
