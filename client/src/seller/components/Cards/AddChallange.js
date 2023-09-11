import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { useSelector } from "react-redux"; // Import useSelector
import axios from "../../../adapters/axios";
import toastMessage from "../../../utils/toastMessage";

function AddChallenge() {
    const { isAuthenticate ,user} = useSelector((state) => state.userReducer);

    const [challange, setchallange] = useState({ coinsRewarded:"" , transactionsRequired:""});

    const [pro,setPro] = useState({
        transactionsRequired:challange.transactionsRequired,
        coinsRewarded:challange.coinsRewarded,
        seller: {
            id:user._id,
            name:user.fname+user.lname
        }
    })

    const onChange = (e) => {
        const { name, value } = e.target;
        setchallange({
            ...challange,
            [name]: value,
        });
        setPro({
            ...pro,
            
            coinsRewarded: name === "coinsRewarded" ? value : pro.coinsRewarded,
            transactionsRequired: name === "transactionsRequired" ? value : pro.transactionsRequired,
            
        });
        //console.log(challange);
        //console.log(pro);
      }


    const handleSubmit = async ()=>{
        const json = JSON.stringify(pro);
       
        try {
            await axios.post('/addChallange',pro)
            .then(response => {
                // Handle the response
                //console.log(response.data);
                toastMessage("Item Added", "success");
                setchallange({ coinsRewarded:"" , transactionsRequired:""})
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <div id="wrapper" width="100%">

        <SideBar />
        <div className="divmaldito my-5">

        <div className="col-lg-12 my-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Add A challange </h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Coins Rewarded on Completing</label>
                            <input type="number" class="form-control" name="coinsRewarded" placeholder=" " onChange={onChange} value={challange.coinsRewarded}/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Number of Purchase Required</label>
                            <input type="number" class="form-control" name="transactionsRequired" placeholder=" " onChange={onChange} value={challange.transactionsRequired} required/>
                        </div>
                       

                        <div>
                            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                       

                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default AddChallenge;