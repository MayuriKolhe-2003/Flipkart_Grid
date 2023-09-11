import { ethers } from 'ethers';
import axios from '../../../adapters/axios';
import React from 'react';
import erc20abi from '../../../pages/ERC20abi.json'


function ChartRow1(props) {
    const approveUser = async (id) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const wallet = new ethers.Wallet("2df9be0c2d553ba046a7bfc125427079f0569ede897096f81e8bc95b675279f8", provider);
        // const walletrec = new ethers.Wallet("70166246b7a035fffd1e9e18e0da53449728d9800b63b69d120407ebe072f6f4", provider);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract("0x8d45F1D60F998254a51E4cc1A73De7d820e67f93", erc20abi, signer);
        const recipient = props.userwallet;


        const transaction = {
            to: "0x8d45F1D60F998254a51E4cc1A73De7d820e67f93",
            data: contract.interface.encodeFunctionData('transferFrom', ["0xd6976647ce4EDBE5760629Ca4481DDE1ceD4593a", recipient, ethers.parseEther(Math.abs(props.coins).toString())]),
          };
          const tx = await wallet.sendTransaction(transaction)
            .catch((err) => {
              console.log(err);
            });
          console.log('Transaction hash:', tx.hash);

          await tx.wait();
          console.log('Transaction confirmed');
        await axios.delete(`/seller/delbrand/${id}`);
    }
    // console.log(props);
    return (
        <tr>
            <td>{props.userid}</td>
            <td>{props.userwallet}</td>
            <td>{props.coins}</td>
            <td>
                <button style={{ border: 'none', backgroundColor: 'red', color: 'white', padding: '5px', width: '100px' }}
                    onClick={() => approveUser(props._id)}>
                    Approve
                </button>

            </td>




        </tr>
    )
}



export default ChartRow1;