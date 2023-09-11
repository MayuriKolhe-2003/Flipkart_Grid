import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import ChartRow1 from './ChartRow1';
import TopBar from "../TopBar";
import SideBar from "../SideBar";
import axios from "../../../adapters/axios";

const BrandReq = () => {
    const { user} = useSelector((state) => state.userReducer);
    const [tableRowsData, settableRowsData] = useState([]);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get(`seller/getbrandreq?sellerid=${user._id}`);
                settableRowsData(response.data); // Update rr with the fetched data
                console.log(tableRowsData)
            } catch (error) {
                console.error("Error fetching rewards:", error);
            }
        };
        fetchRewards();
    }, []);


    return (
        <div id="wrapper" width="100%">

            <SideBar />
            <div className="divmaldito my-5">
            <div className="card shadow mb-4">
                        <div className="card-body">
                            <h2 className="font-weight-bold my-5"> My Products </h2>
                            <div className="table-responsive my-5">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                        <th>User ID</th>
                                            <th>User Wallet Address</th>
                                            <th>Coins</th>
                                            <th>Approve</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            tableRowsData.map((row, i) => {
                                                return <ChartRow1 {...row} key={i} />
                                            })
                                        }

                                    </tbody>
                                </table>


                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default BrandReq
