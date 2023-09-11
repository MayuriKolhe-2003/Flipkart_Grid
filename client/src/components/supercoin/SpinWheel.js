import { makeStyles, Typography, Box, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import './SpinWheel.css';
import SpinningWheel from './SpinningWheel';
import { useState } from "react";
import { emptyCartUrl } from "../../constants/data";
import erc20abi from "../../pages/ERC20abi.json";
import axios from "../../adapters/axios";

const useStyle = makeStyles((theme) => ({
  component: {
    width: "80%",
    minWidth: 500,
    height: "100vh",
    background: "#fff",
    margin: "80px 140px",
    [theme.breakpoints.down("md")]: {
      margin: "80px 0px",
    },
  },
  image: {
    width: "20%",
    minWidth: 150,
  },
  container: {
    textAlign: "center",
    paddingTop: 70,
  },
  btn: {
    display: "block",
    margin: "0 auto",
    marginTop: 15,
    padding: "5px 60px",
  },
}));



const SpinWheel = () => {
  const classes = useStyle();
  const ethers = require('ethers');
  const { isAuthenticate, user } = useSelector((state) => state.userReducer);
  const sections = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const [result, setResult] = useState('Spin Me To get Coins');

  const addActivity = async(coin) => {
    try {
      await axios.post("activity/add", {
        userId:user._id,
        debited:false,
        credited:true,
        activity:"Daily Spin",
        // productname:"",
        coins:coin
      });
    }
    catch(e) {
      console.log(e);
    }
  }

  const handleSpin = async (selectedSection) => {
    setResult(`You got : ${selectedSection} coins`);

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const wallet = new ethers.Wallet("2df9be0c2d553ba046a7bfc125427079f0569ede897096f81e8bc95b675279f8", provider);
    const signer = await provider.getSigner();
    const recipient = await signer.getAddress();
    const contract = new ethers.Contract("0x8d45F1D60F998254a51E4cc1A73De7d820e67f93", erc20abi, signer);
    //const erc20 = new ethers.Contract("0xd9E634ADFB7a003cc044056abB36a53a7a74c180", erc20abi, signer)
    //await erc20.transfer("0xd6976647ce4EDBE5760629Ca4481DDE1ceD4593a", signerAddress, ethers.parseEther(selectedSection.toString()));

    const transaction = {
      to: "0x8d45F1D60F998254a51E4cc1A73De7d820e67f93",
      data: contract.interface.encodeFunctionData('transferFrom', ["0xd6976647ce4EDBE5760629Ca4481DDE1ceD4593a", recipient, ethers.parseEther(Math.abs(selectedSection).toString())]),
    };
    const tx = await wallet.sendTransaction(transaction)
      .catch((err) => {
        console.log(err);
      });
    console.log('Transaction hash:', tx.hash);

    await tx.wait();
    console.log('Transaction confirmed');


    addActivity(selectedSection).then(() => {
      console.log("Success");
      axios.get(`/activity/get?id=${user._id}`)
      .then(res => {
        console.log(res);
      })
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <Box className={classes.component}>
      <Box className={classes.container}>

        {isAuthenticate ? (
          <div className="App">
            <h1>Spinning Wheel Game</h1>
            <SpinningWheel sections={sections} onSpin={handleSpin} />
            <div className="result">{result}</div>
          </div>
        ) : (
          <>
            <img src={emptyCartUrl} className={classes.image} />
            <Typography>Want to spin to earn rewards?</Typography>
            <span>Login to gain more rewards </span>
            <br />
            <Button
              variant="contained"
              className={classes.btn}
              color="primary"
              onClick={() => window.location.replace("/login")}
              style={{ background: "#fb641b", textTransform: "capitalize" }}
            >
              Login
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SpinWheel;
